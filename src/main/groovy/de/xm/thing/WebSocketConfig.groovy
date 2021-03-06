package de.xm.thing

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer

@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.enableSimpleBroker("/topic")
  }

  @Override
  void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/websocket")
      .setAllowedOrigins("*")
  }
}
