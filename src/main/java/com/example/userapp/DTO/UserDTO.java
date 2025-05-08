package com.example.userapp.DTO;

import java.time.LocalDate;

public class UserDTO {
    private String name;
    private String surname;
    private String gender;
    private LocalDate birthdate;
    private AddressDTO homeAddress;
    private AddressDTO workAddress;


    //    Getters.
    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getGender() {
        return gender;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public AddressDTO getHomeAddress() {
        return homeAddress;
    }

    public Long getHomeAddressId() {
        return homeAddress.getId();
    }

    public String getHomeFullAddress() {
        return homeAddress.getFullAddress();
    }

    public AddressDTO getWorkAddress() {
        return workAddress;
    }

    public Long getWorkAddressId() {
        return workAddress.getId();
    }

    public String getWorkFullAddress() {
        return workAddress.getFullAddress();
    }
}
