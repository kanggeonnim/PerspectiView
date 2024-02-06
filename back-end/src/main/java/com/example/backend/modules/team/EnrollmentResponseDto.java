package com.example.backend.modules.team;

import com.example.backend.modules.user.UserResponseDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class EnrollmentResponseDto {
    private Long id;

    private UserResponseDto user;

    private LocalDateTime enrolledAt;

    public static EnrollmentResponseDto of(Enrollment enrollment) {
        return EnrollmentResponseDto.builder()
                .user(UserResponseDto.of(enrollment.getUser()))
                .enrolledAt(enrollment.getEnrolledAt())
                .build();
    }
}
