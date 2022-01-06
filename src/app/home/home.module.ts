import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
    imports: [CommonModule, SharedModule, FlexLayoutModule, MaterialModule, IvyCarouselModule, HomeRoutingModule],
    declarations: [HomeComponent],
})
export class HomeModule {}
