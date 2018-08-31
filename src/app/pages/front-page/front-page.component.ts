import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Barcamp } from '../../models/barcamp';

@Component({
    selector: 'th-front-page',
    templateUrl: './front-page.component.html',
    styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {

    barcamps: Barcamp[];

    constructor(private route: ActivatedRoute) {
        this.barcamps = route.snapshot.data.barcamps;
    }

}
