package com.unidev.universe.authentication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*
* The Roles enumerator consists of all the roles
* a user can possibly have.
*/

@Getter
public enum Roles {
    ADMIN,
    TEACHER,
    STUDENT,
    STAFF,
    GUEST
}
