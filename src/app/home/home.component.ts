import { Component, OnInit } from '@angular/core';
import * as confetti from 'canvas-confetti';
import { MediaObserver } from '@angular/flex-layout';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    date = 'Saturday, June 25th, 2022';
    locationShort = '828 The Turn, Newport, KY';
    locationFull = '828 The Turn, 828 Monmouth St, Newport, KY 41071';

    constructor(private media: MediaObserver) {}

    ngOnInit() {
        const myCanvas = document.getElementById('canvas');
        confetti.create(myCanvas, { resize: true })({
            particleCount: this.media.isActive('gt-sm') ? 150 : 75,
            spread: this.media.isActive('gt-sm') ? 90 : 45,
        });
    }
}
