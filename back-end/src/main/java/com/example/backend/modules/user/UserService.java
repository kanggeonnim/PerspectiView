package com.example.backend.modules.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final UserAuthorityRepository userAuthorityRepository;

    public User createUser(User user, UserAuthority auth) {
        User newUser = userRepository.save(user);
        newUser.addAuthority(auth);
        return newUser;
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException());
    }

    public User updateUser(String username, User user) {
        User findUser = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException());
        findUser.changeUser(user);
        return findUser;
    }

    public void deleteUser(String username) {
        User findUser = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException());
        userRepository.delete(findUser);
    }
}
