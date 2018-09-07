import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { StompRService } from '@stomp/ng2-stompjs';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurerComponent } from './components/configurer/configurer.component';
import { NavDrawerComponent } from './components/nav-drawer/nav-drawer.component';
import { CoreModule } from './core/core.module';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { PlanningPageComponent } from './pages/planning-page/planning-page.component';
import { BarcampService } from './services/barcamp.service';
import { PlanningState } from './state/planning/planning.state';
import { NgxsStompPluginModule } from './state/stomp/stomp.plugin';
import { StompState } from './state/stomp/stomp.state';

@NgModule({
    declarations: [
        AppComponent,
        FrontPageComponent,
        PlanningPageComponent,
        NavDrawerComponent,
        ConfigurerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxsModule.forRoot([PlanningState, StompState]),
        NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
        NgxsStompPluginModule.forRoot(),
        CoreModule,
        ReactiveFormsModule,
    ],
    providers: [
        BarcampService,
        StompRService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
