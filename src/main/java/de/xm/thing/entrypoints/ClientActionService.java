package de.xm.thing.entrypoints;

import org.springframework.stereotype.Service;

import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.stream.Stream;

@Service
public class ClientActionService {

    private Queue<ClientAction> actionQueue = new LinkedBlockingQueue<>();

    public void dispatch(ClientAction action) {
        this.actionQueue.add(action);
    }

    public Stream<ClientAction> getActions() {
        return actionQueue.stream();
    }

}
