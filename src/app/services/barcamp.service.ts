import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Barcamp } from '../models/barcamp';

@Injectable()
export class BarcampService implements Resolve<Barcamp[]> {

    dummyData = [
        { id: 'A3C39BB3-CC0E-46A4-BEA2-B0D5DAB1B2AE', title: 'Thing Q1 2018', organizer: 'REA' },
        { id: '81F6A36F-FF6E-471F-B3AB-21E7917693CF', title: 'Thing Q2 2018', organizer: 'JHI' },
        { id: 'B19FF196-824F-45BD-ADE4-C940381D31F6', title: 'Thing Q3 2018', organizer: 'SRO' },
    ];

    constructor() {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Barcamp[]> {
        return this.getBarcamps();
    }

    // TODO: caching
    getBarcamps(): Observable<Barcamp[]> {
        return of(this.dummyData)
            .pipe(
                delay(750),
                catchError(error => {
                    console.error('Error fetching barcamps', error);
                    return of(error);
                })
            );
    }

    createBarcamp() {
        // TODO: implement
    }

    deleteBarcamp() {
        // TODO: implement
    }
}
