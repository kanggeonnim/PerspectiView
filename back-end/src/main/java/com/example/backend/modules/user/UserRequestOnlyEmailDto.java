package com.example.backend.modules.user;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRequestOnlyEmailDto {

    private String email;

    public UserRequestOnlyEmailDto(String email) {
        this.email = email;
    }
}
