import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanningHeaderComponent } from './components/planning-header/planning-header.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { PlanningPageComponent } from './pages/planning-page/planning-page.component';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';
import { TabControlComponent } from './components/tab-control/tab-control.component';
import { TimetableLabelComponent } from './components/timetable-label/timetable-label.component';
import { TimetableTopicComponent } from './components/timetable-topic/timetable-topic.component';
import { TimetableEntryComponent } from './components/timetable-entry/timetable-entry.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';

@NgModule({
    declarations: [
        AppComponent,
        FrontPageComponent,
        SetupPageComponent,
        ConfigurationPageComponent,
        PlanningPageComponent,
        PlanningHeaderComponent,
        TabControlComponent,
        TimetableLabelComponent,
        TimetableTopicComponent,
        TimetableEntryComponent,
        TopicListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
