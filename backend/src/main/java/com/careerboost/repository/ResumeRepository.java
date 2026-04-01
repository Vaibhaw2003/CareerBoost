package com.careerboost.repository;

import com.careerboost.model.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ResumeRepository extends MongoRepository<Resume, String> {
    List<Resume> findByUserId(String userId);
    List<Resume> findByUserIdOrderByCreatedAtDesc(String userId);
}
