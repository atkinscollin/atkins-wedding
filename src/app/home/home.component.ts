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

    imagesForSlider = [
        {
            path: 'assets/banner-photos/Kelsey-Collin_Engagement-Session_Glenwood-Gardens_Anna-Ray-Photography-123.jpg',
        },
        {
            path: 'assets/banner-photos/Kelsey-Collin_Engagement-Session_Glenwood-Gardens_Anna-Ray-Photography-124.jpg',
        },
        {
            path: 'assets/banner-photos/Kelsey-Collin_Engagement-Session_Glenwood-Gardens_Anna-Ray-Photography-125.jpg',
        },
        {
            path: 'assets/banner-photos/Kelsey-Collin_Engagement-Session_Glenwood-Gardens_Anna-Ray-Photography-126.jpg',
        },
        {
            path: 'assets/banner-photos/Kelsey-Collin_Engagement-Session_Glenwood-Gardens_Anna-Ray-Photography-127.jpg',
        },
        {
            path: 'assets/banner-photos/Kelsey-Collin_Engagement-Session_Glenwood-Gardens_Anna-Ray-Photography-128.jpg',
        },
        {
            path: 'assets/banner-photos/Kelsey-Collin_Engagement-Session_Glenwood-Gardens_Anna-Ray-Photography-129.jpg',
        },
    ];

    constructor(public media: MediaObserver) {}

    ngOnInit() {
        const myCanvas = document.getElementById('canvas');
        confetti.create(myCanvas, { resize: true })({
            particleCount: this.media.isActive('gt-sm') ? 150 : 75,
            spread: this.media.isActive('gt-sm') ? 90 : 45,
        });
    }
}
