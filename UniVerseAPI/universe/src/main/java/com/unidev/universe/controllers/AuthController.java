//package com.unidev.universe.controllers;
//
//import com.unidev.universe.authentication.JwtUtil;
//import com.unidev.universe.entities.User;
//import com.unidev.universe.repository.UserRepository;
//import com.unidev.universe.requests.LoginRequest;
//import com.unidev.universe.requests.RegisterRequest;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.HttpStatusCode;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//    private final AuthenticationManager authenticationManager;
//    private final JwtUtil jwtUtil;
//    private final PasswordEncoder passwordEncoder;
//    private final UserRepository userRepository;
//
//    public AuthController() {
//        this(null, null, null, null);
//    }
//
//    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, PasswordEncoder passwordEncoder, UserRepository userRepository) {
//        this.authenticationManager = authenticationManager;
//        this.jwtUtil = jwtUtil;
//        this.passwordEncoder = passwordEncoder;
//        this.userRepository = userRepository;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){
//        try{
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
//            );
//
////            return new ResponseEntity<>(jwtUtil.generateToken(
////                    loginRequest.getEmail(),
////                    userRepository.findByEmail(loginRequest.getEmail()).getId(),
////                    userRepository.findByEmail(loginRequest.getEmail()).getName() +
////                            " " + userRepository.findByEmail(loginRequest.getEmail()).getLastName()
////            ), HttpStatus.OK);
//            return new ResponseEntity<>("Hello", HttpStatus.OK);
//        }catch (Exception e){
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest){
//        if(userRepository.findByEmail(registerRequest.getEmail()) != null){
//            return new ResponseEntity<>("Email already exists!", HttpStatus.BAD_REQUEST);
//        }
//
//        User user = new User();
//        user.setEmail(registerRequest.getEmail());
//        user.setName(registerRequest.getName());
//        user.setLastName(registerRequest.getLastName());
//        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
//        userRepository.save(user);
//        authenticationManager.authenticate(
//            new UsernamePasswordAuthenticationToken(registerRequest.getEmail(), registerRequest.getPassword())
//        );
//
//        return new ResponseEntity<>(jwtUtil.generateToken(
//                registerRequest.getEmail(),
//                userRepository.findByEmail(registerRequest.getEmail()).getId(),
//                registerRequest.getName() + " " + registerRequest.getLastName()
//        ), HttpStatus.OK);
//    }
//}
