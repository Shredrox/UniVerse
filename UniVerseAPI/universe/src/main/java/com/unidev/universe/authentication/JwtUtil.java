package com.unidev.universe.authentication;

import com.unidev.universe.responses.user.UserJwtResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;




public class JwtUtil {
    @Value("${jwt.secret}")
    private String secretKey;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function <Claims, T> claimResolver){
        final Claims claim = extractAllClaims(token);
        return claimResolver.apply(claim);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String username, int userId, String fullName){
        Map<String, Object> claims = new HashMap<>();
        UserJwtResponse userJwtResponse = new UserJwtResponse();
        userJwtResponse.setEmail(username);
        userJwtResponse.setId(userId);
        userJwtResponse.setFullName(fullName);
        claims.put("user", userJwtResponse);
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, secretKey).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}