import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { PlanningPageComponent } from './pages/planning-page/planning-page.component';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';

const routes: Routes = [
    {
        path: '',
        component: FrontPageComponent,
    },
    {
        path: 'setup',
        component: SetupPageComponent,
    },
    {
        path: 'configure',
        component: ConfigurationPageComponent,
    },
    {
        path: 'planning',
        component: PlanningPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
