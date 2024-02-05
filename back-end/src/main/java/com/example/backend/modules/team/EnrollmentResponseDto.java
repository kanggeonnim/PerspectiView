package com.example.backend.modules.team;

import com.example.backend.modules.account.User;
import com.example.backend.modules.account.UserResponseDto;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Builder
public class EnrollmentResponseDto {
    private Long id;

    private UserResponseDto user;

    private LocalDateTime enrolledAt;

    public static EnrollmentResponseDto of(Enrollment enrollment){
        return EnrollmentResponseDto.builder()
                .user(UserResponseDto.of(enrollment.getUser()))
                .enrolledAt(enrollment.getEnrolledAt())
                .build();
    }
}
