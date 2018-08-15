import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { BarcampService } from './services/barcamp.service';

@NgModule({
    declarations: [
        AppComponent,
        FrontPageComponent,
        ConfigurationPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxsModule.forRoot([]),
        NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    ],
    providers: [
        BarcampService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
