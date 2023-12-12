package com.unidev.universe.requests;

import lombok.*;

/* *
* RegistrationRequest class represents a single
* request to the registration service.
* */
@Getter
@EqualsAndHashCode
@ToString
@AllArgsConstructor
public class RegistrationRequest {
    private final String firstName;
    private final String lastName;
    private final String password;
    private final String username;


}
