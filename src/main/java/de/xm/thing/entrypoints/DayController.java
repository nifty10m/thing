package de.xm.thing.entrypoints;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@Slf4j
public class DayController {

    @Autowired
    private ClientActionService actionService;

    @MessageMapping("/days")
    @SendTo("/days/queue")
    ClientAction broadcastDayAction(@Payload ClientAction action) {
        actionService.dispatch(action);
        log.info("days action: {}", action);
        return action;
    }

    @SubscribeMapping("/days/initial")
    List<ClientAction> clientSubsribed() {
        return actionService.getActions()
            .filter(action -> action.getType().contains("Day"))
            .collect(Collectors.toList());
    }

}
