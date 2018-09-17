package de.xm.thing.entrypoints

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.annotation.SubscribeMapping
import org.springframework.stereotype.Controller

@Controller
class TopicController {

  @Autowired
  private Topics topics;

  @MessageMapping("/topics")
  @SendTo("/topics/stream")
  String readTopics(@Payload String newTopic) {
    topics.getList().add(newTopic)
    println 'reading topics: ' + topics.getList()
    return newTopic
  }

  @SubscribeMapping("/topics/initial")
  List<String> clientSubsribed() {
    println 'initial topics: ' + topics.getList()
    return topics.getList();
  }
}
