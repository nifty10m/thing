package de.xm.thing.entrypoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
class RoomController {

    @Autowired
    private ClientActionService actionService;

    @MessageMapping("/rooms")
    @SendTo("/rooms/queue")
    ClientAction roomsMessage(@Payload ClientAction action) {
        actionService.dispatch(action);
        return action;
    }

    @SubscribeMapping("/rooms/initial")
    List<ClientAction> clientSubsribed() {
        return actionService.getActions()
            .filter(action -> action.getType().contains("Room"))
            .collect(Collectors.toList());
    }
}
