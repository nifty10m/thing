import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PlanningPageComponent } from './pages/planning-page/planning-page.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { BarcampService } from './services/barcamp.service';
import { PlanningState } from './state/planning.state';
import { NavDrawerComponent } from './components/nav-drawer/nav-drawer.component';
import { ConfigurerComponent } from './components/configurer/configurer.component';

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
        NgxsModule.forRoot([PlanningState]),
        NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
        CoreModule,
        ReactiveFormsModule,
    ],
    providers: [
        BarcampService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
