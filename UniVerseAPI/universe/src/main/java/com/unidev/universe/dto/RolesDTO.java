package com.unidev.universe.dto;

import com.unidev.universe.entities.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RolesDTO {
    @NotNull
    @UniqueElements
    private String name;

    private List<User> roles;
}
