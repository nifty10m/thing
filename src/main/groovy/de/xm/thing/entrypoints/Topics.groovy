package de.xm.thing.entrypoints

import org.springframework.stereotype.Component

@Component
class Topics {

  private List<String> list = new ArrayList<>();

  List<String> getList() {
    return list
  }
}
