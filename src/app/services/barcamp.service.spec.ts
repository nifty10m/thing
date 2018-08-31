import { inject, TestBed } from '@angular/core/testing';

import { BarcampService } from './barcamp.service';

describe('BarcampService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BarcampService]
        });
    });

    it('should be created', inject([BarcampService], (service: BarcampService) => {
        expect(service).toBeTruthy();
    }));
});
