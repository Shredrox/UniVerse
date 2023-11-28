package com.unidev.universe.repository;

import com.unidev.universe.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, Long> {
    Roles findByName(String name);
}
