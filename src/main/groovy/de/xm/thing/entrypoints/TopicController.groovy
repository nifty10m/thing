package de.xm.thing.entrypoints

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller

@Controller
class TopicController {

  @MessageMapping("/topics")
  @SendTo("/topic/stream")
  String topics(@Payload String newTopic) {
    println 'new Topic: ' + newTopic
    return newTopic
  }
}
