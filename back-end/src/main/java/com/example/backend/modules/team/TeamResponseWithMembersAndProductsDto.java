package com.example.backend.modules.team;

import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductResponseOnlyDto;
import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Data
@Builder
public class TeamResponseWithMembersAndProductsDto {
    private Long id;
    private String title;
    private List<UserResponseDto> userResponseDtos;
    private List<ProductResponseOnlyDto> productResponseDtos;
    private String info;
    private boolean personal;


    public static TeamResponseWithMembersAndProductsDto of(Team team) {

        List<UserResponseDto> users = new ArrayList<>();
        Iterator<User> iterator = team.getManagers().iterator();
        while(iterator.hasNext()){
            users.add(UserResponseDto.of(iterator.next()));
        }
        iterator = team.getMembers().iterator();
        while(iterator.hasNext()){
            users.add(UserResponseDto.of(iterator.next()));
        }

        List<ProductResponseOnlyDto> products = new ArrayList<>();
        Iterator<Product> productIterator = team.getProducts().iterator();
        while(productIterator.hasNext()){
            products.add(ProductResponseOnlyDto.of(productIterator.next()));
        }

        return TeamResponseWithMembersAndProductsDto.builder()
                .id(team.getId())
                .title(team.getTitle())
                .info(team.getInfo())
                .personal(team.isPersonal())
                .productResponseDtos(products)
                .userResponseDtos(users)
                .build();
    }
}
