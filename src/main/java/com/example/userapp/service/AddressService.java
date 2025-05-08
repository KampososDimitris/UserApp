package com.example.userapp.service;

import com.example.userapp.model.Address;
import com.example.userapp.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address save(Address address) {
        return addressRepository.save(address);
    }

    public Optional<Address> findById(Long id) {
        return addressRepository.findById(id);
    }
}
