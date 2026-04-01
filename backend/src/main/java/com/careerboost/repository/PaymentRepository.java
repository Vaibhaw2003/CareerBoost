package com.careerboost.repository;

import com.careerboost.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findByUserId(String userId);
    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);
}
