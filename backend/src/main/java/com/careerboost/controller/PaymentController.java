package com.careerboost.controller;

import com.careerboost.model.User;
import com.careerboost.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(@RequestBody(required = false) Map<String, Object> payload, @AuthenticationPrincipal User user) {
        double amount = 999.0;
        if (payload != null && payload.containsKey("amount")) {
            amount = Double.parseDouble(payload.get("amount").toString());
        }
        String orderJson = paymentService.createOrder(user, amount);
        return ResponseEntity.ok(orderJson);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> payload, @AuthenticationPrincipal User user) {
        boolean isValid = paymentService.verifySignature(payload, user);
        if (isValid) {
            return ResponseEntity.ok("{\"status\":\"success\"}");
        } else {
            return ResponseEntity.badRequest().body("{\"status\":\"failed\"}");
        }
    }
}
