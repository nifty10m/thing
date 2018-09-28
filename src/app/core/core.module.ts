import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { LabelComponent } from './components/label/label.component';
import { FieldsetComponent } from './components/fieldset/fieldset.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ButtonComponent,
        InputComponent,
        SelectComponent,
        TextareaComponent,
        LabelComponent,
        FieldsetComponent,
    ],
    exports: [
        ButtonComponent,
        InputComponent,
        SelectComponent,
        TextareaComponent,
        LabelComponent,
        FieldsetComponent,
    ]
})
export class CoreModule {
}
