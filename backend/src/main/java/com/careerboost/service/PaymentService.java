package com.careerboost.service;

import com.careerboost.enums.Plan;
import com.careerboost.model.Payment;
import com.careerboost.model.User;
import com.careerboost.repository.PaymentRepository;
import com.careerboost.repository.UserRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;

    public PaymentService(PaymentRepository paymentRepository, UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
    }

    public String createOrder(User user, double amount) {
        try {
            RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", (int)(amount * 100)); // amount in the smallest currency unit
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "order_rcptid_" + System.currentTimeMillis());

            Order order = razorpay.orders.create(orderRequest);

            Payment payment = new Payment();
            payment.setUserId(user.getId());
            payment.setAmount(amount);
            payment.setStatus("CREATED");
            payment.setRazorpayOrderId(order.get("id"));
            paymentRepository.save(payment);

            return order.toString();
        } catch (RazorpayException e) {
            throw new RuntimeException("Error creating Razorpay Order", e);
        }
    }

    public boolean verifySignature(Map<String, String> payload, User user) {
        String orderId = payload.get("razorpay_order_id");
        String paymentId = payload.get("razorpay_payment_id");
        String signature = payload.get("razorpay_signature");

        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", orderId);
            options.put("razorpay_payment_id", paymentId);
            options.put("razorpay_signature", signature);

            boolean status = Utils.verifyPaymentSignature(options, keySecret);
            if (status) {
                Payment payment = paymentRepository.findByRazorpayOrderId(orderId).orElseThrow();
                payment.setStatus("SUCCESS");
                payment.setRazorpayPaymentId(paymentId);
                payment.setRazorpaySignature(signature);
                paymentRepository.save(payment);

                user.setPlan(Plan.PRO);
                userRepository.save(user);
            }
            return status;
        } catch (RazorpayException e) {
            System.err.println("Error verifying signature: " + e.getMessage());
            return false;
        }
    }
}
