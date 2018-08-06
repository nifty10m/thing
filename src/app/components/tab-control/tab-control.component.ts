import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'th-tab-control',
    templateUrl: './tab-control.component.html',
    styleUrls: ['./tab-control.component.scss']
})
export class TabControlComponent {

    @Input()
    labels: string[];

    @Output()
    tabSelect = new EventEmitter<string>();

    private _activeTab = 0;

    constructor() {
    }

    selectTab(index: number) {
        this.activeTab = index;
        this.tabSelect.emit(this.labels[index]);
    }

    set activeTab(index: number) {
        this._activeTab = index;
    }

    get activeTab() {
        return this._activeTab;
    }

}
