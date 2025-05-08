package com.example.userapp.service;

import com.example.userapp.DTO.AddressDTO;
import com.example.userapp.DTO.UserDTO;
import com.example.userapp.model.Address;
import com.example.userapp.model.User;
import com.example.userapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final AddressService addressService;

    public UserService(UserRepository userRepository, AddressService addressService) {
        this.userRepository = userRepository;
        this.addressService = addressService;
    }

    public User createUser(UserDTO userDTO) {
        User user = new User();

        // Set user fields, except addresses, based on the values passed from the form.
        user.setName(userDTO.getName());
        user.setSurname(userDTO.getSurname());
        user.setGender(userDTO.getGender());
        user.setBirthdate(userDTO.getBirthdate());

        // If address fields aren't empty, create Address objects.
        if (userDTO.getHomeFullAddress() != null && !userDTO.getHomeFullAddress().isEmpty()) {
            Address homeAddress = new Address();

            homeAddress.setFullAddress(userDTO.getHomeFullAddress());
            user.setHomeAddress(homeAddress);
        }

        if (userDTO.getWorkFullAddress() != null && !userDTO.getWorkFullAddress().isEmpty()) {
            Address workAddress = new Address();
            workAddress.setFullAddress(userDTO.getWorkFullAddress());
            user.setWorkAddress(workAddress);
        }

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User updateUser(Long id, UserDTO updatedUserDTO) {
        // Find existing user, if any, by id.
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(updatedUserDTO.getName());
        existingUser.setSurname(updatedUserDTO.getSurname());
        existingUser.setGender(updatedUserDTO.getGender());
        existingUser.setBirthdate(updatedUserDTO.getBirthdate());

        // Find and update home address, or else create new.
        if(updatedUserDTO.getHomeAddress() != null) {
            AddressDTO homeDTO = updatedUserDTO.getHomeAddress();

            Address homeAddress;
            if(homeDTO.getId() != null) {
                homeAddress = addressService.findById(homeDTO.getId())
                        .orElseThrow(() -> new RuntimeException("HomeAddress not found"));
            }
            else {
                homeAddress = new Address();
            }

            homeAddress.setFullAddress(updatedUserDTO.getHomeFullAddress());
            addressService.save(homeAddress);
            existingUser.setHomeAddress(homeAddress);
        }

        // Find and update work address, or else create new.
        if(updatedUserDTO.getWorkAddress() != null) {
            AddressDTO workDTO = updatedUserDTO.getWorkAddress();

            Address workAddress;
            if(workDTO.getId() != null) {
                workAddress = addressService.findById(workDTO.getId())
                        .orElseThrow(() -> new RuntimeException("WorkAddress not found"));
            }
            else {
                workAddress = new Address();
            }

            workAddress.setFullAddress(updatedUserDTO.getWorkFullAddress());
            addressService.save(workAddress);
            existingUser.setWorkAddress(workAddress);
        }

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
