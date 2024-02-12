package com.example.backend.modules.user;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRequestOnlyEmailDto {

    @NotNull
    private String email;

    public UserRequestOnlyEmailDto(String email) {
        this.email = email;
    }
}
