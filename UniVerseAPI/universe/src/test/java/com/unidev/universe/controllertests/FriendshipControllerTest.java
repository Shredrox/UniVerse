package com.unidev.universe.controllertests;

import com.unidev.universe.controllers.FriendshipController;
import com.unidev.universe.entities.Friendship;
import com.unidev.universe.entities.FriendshipStatus;
import com.unidev.universe.entities.User;
import com.unidev.universe.requests.FriendRequest;
import com.unidev.universe.responses.FriendRequestResponse;
import com.unidev.universe.services.FriendshipService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@AutoConfigureMockMvc(addFilters = false)
class FriendshipControllerTest {

    @Mock
    private FriendshipService friendshipService;

    @Mock
    private SimpMessagingTemplate simpMessagingTemplate;

    @InjectMocks
    private FriendshipController friendshipController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUserOnlineFriends() {
        String username = "testUser";
        List<String> onlineFriends = Arrays.asList("friend1", "friend2");
        when(friendshipService.getOnlineFriends(username)).thenReturn(Arrays.asList(
                new User("friend1"),
                new User("friend2")
        ));

        ResponseEntity<List<String>> response = friendshipController.getUserOnlineFriends(username);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(onlineFriends, response.getBody());
    }

    @Test
    void testAddNewOnlineUser() {
        String username = "testUser";
        List<String> userFriends = Arrays.asList("friend1", "friend2");
        when(friendshipService.getFriendUsernames(username)).thenReturn(userFriends);

        friendshipController.addNewOnlineUser(username);

        verify(simpMessagingTemplate, times(2)).convertAndSendToUser(anyString(), anyString(), anyString());
    }

    @Test
    void testGetUserFriendsCount() {
        String username = "testUser";
        int expectedCount = 3;
        when(friendshipService.getFriendUsernames(username)).thenReturn(Arrays.asList("friend1", "friend2", "friend3"));

        ResponseEntity<Integer> response = friendshipController.getUserFriendsCount(username);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(expectedCount, response.getBody());
    }

    @Test
    void testGetFriendRequests() {
        String username = "testUser";
        List<FriendRequestResponse> friendRequests = Arrays.asList(
                new FriendRequestResponse(1L, "sender1"),
                new FriendRequestResponse(2L, "sender2")
        );
        when(friendshipService.getFriendRequests(username)).thenReturn(friendRequests);

        ResponseEntity<List<FriendRequestResponse>> response = friendshipController.getFriendRequests(username);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(friendRequests, response.getBody());
    }

    @Test
    void testCheckFriendship() {
        String username1 = "user1";
        String username2 = "user2";
        FriendshipStatus friendshipStatus = FriendshipStatus.ACCEPTED;
        when(friendshipService.areUsersFriends(username1, username2)).thenReturn(friendshipStatus);

        ResponseEntity<FriendshipStatus> response = friendshipController.checkFriendship(username1, username2);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(friendshipStatus, response.getBody());
    }

    @Test
    void testAcceptFriendRequest() {
        Long friendRequestId = 1L;
        friendshipController.acceptFriendRequest(friendRequestId);

        verify(friendshipService, times(1)).acceptFriendRequest(friendRequestId);
    }

    @Test
    void testRejectFriendRequest() {
        Long friendRequestId = 1L;
        friendshipController.rejectFriendRequest(friendRequestId);

        verify(friendshipService, times(1)).rejectFriendRequest(friendRequestId);
    }

    @Test
    void testRemoveFriend() {
        String usernameUser1 = "user1";
        String usernameUser2 = "user2";
        friendshipController.removeFriend(usernameUser1, usernameUser2);

        verify(friendshipService, times(1)).removeFriend(usernameUser1, usernameUser2);
    }
}