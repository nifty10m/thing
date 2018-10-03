import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { StompConnect, StompDisconnect } from './state/stomp/stomp.actions';

@Component({
  selector: 'th-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'thing';

  constructor(private store: Store) {
    this.store.dispatch(
      new StompConnect({ url: 'ws://localhost:8080/websocket' })
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new StompDisconnect());
  }
}
