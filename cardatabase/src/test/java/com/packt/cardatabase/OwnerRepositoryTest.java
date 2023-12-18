package com.packt.cardatabase;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.packt.cardatabase.domain.Owner;
import com.packt.cardatabase.domain.OwnerRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class OwnerRepositoryTest {
	
	@Autowired
	private OwnerRepository repository;
	
	@Test
	void saveOwner() {
		repository.save(new Owner("Lucy", "Smith"));
		assertThat(repository.findByFirstname("Lucy").isPresent()).isTrue();
	}
	
	@Test
	void deleteOwner() {
		repository.save(new Owner("Lisa", "Morrison"));
		repository.deleteAll();
		assertThat(repository.count()).isEqualTo(0);
	}
}
