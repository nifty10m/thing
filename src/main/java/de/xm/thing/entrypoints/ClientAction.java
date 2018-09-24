package de.xm.thing.entrypoints;

import lombok.Data;
import lombok.NonNull;

@Data
public class ClientAction<T> {

    @NonNull
    private final String type;
    private final T payload;
}
