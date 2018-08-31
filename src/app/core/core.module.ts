import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ButtonComponent,
        InputComponent,
        SelectComponent,
    ],
    exports: [
        ButtonComponent,
        InputComponent,
        SelectComponent,
    ]
})
export class CoreModule {
}
