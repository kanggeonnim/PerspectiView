package com.example.backend.modules.account;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

// ORM - Object Relation Mapping


@Entity
@NoArgsConstructor
@Getter
@EqualsAndHashCode(of = "id")
@Table(name = "users")
public class User {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String username;

	@Column(nullable = true)
	private String userImage;

	@Column(nullable = false)
	private String userNickname;

	@Column(nullable = true)
	private String email;

	@Column(nullable = true)
	private String userPhone;

	@Column(nullable = true)
	private String userInfo;

	@CreationTimestamp
	private Timestamp createAt;

	@Column(nullable = false)
	private String provider;

	@Column(nullable = false)
	private String providerId;

	@JsonManagedReference
	@OneToMany(mappedBy = "user")
	private List<UserAuthority> authorities = new ArrayList<>();

	public void addAuthority(UserAuthority userAuthority) {authorities.add(userAuthority); }
	@Builder
	public User(String username, String userNickname, String email, String provider, String providerId, List<UserAuthority> roles) {
		this.username = username;
		this.userNickname = userNickname;
		this.email = email;
		this.provider = provider;
		this.providerId = providerId;
	}
}
