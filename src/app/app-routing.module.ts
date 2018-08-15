import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { BarcampService } from './services/barcamp.service';

const routes: Routes = [
    {
        path: '',
        component: FrontPageComponent,
        resolve: {
            barcamps: BarcampService,
        }
    },
    {
        path: 'configure',
        component: ConfigurationPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
