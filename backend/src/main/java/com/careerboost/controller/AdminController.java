package com.careerboost.controller;

import com.careerboost.model.Payment;
import com.careerboost.model.User;
import com.careerboost.repository.PaymentRepository;
import com.careerboost.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    public AdminController(UserRepository userRepository, PaymentRepository paymentRepository) {
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalUsers = userRepository.count();
        long totalPayments = paymentRepository.count();
        double totalRevenue = paymentRepository.findAll().stream()
                .filter(p -> "SUCCESS".equals(p.getStatus()))
                .mapToDouble(Payment::getAmount)
                .sum();

        stats.put("totalUsers", totalUsers);
        stats.put("totalPayments", totalPayments);
        stats.put("totalRevenue", totalRevenue);
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/payments")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentRepository.findAll());
    }
}
