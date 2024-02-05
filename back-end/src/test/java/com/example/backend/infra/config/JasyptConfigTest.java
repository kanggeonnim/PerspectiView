package com.example.backend.infra.config;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.iv.RandomIvGenerator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JasyptConfigTest {

    @Test
    void stringEncryptor() {
        String url = "P@ssw0rd";
        System.out.println(jasyptEncoding(url));
    }

    public String jasyptEncoding(String value) {
        String key = "something";
        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
        pbeEnc.setAlgorithm("PBEWITHHMACSHA512ANDAES_256");
        pbeEnc.setPassword(key);
        pbeEnc.setIvGenerator(new RandomIvGenerator());
        return pbeEnc.encrypt(value);
    }

}