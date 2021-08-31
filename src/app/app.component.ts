import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Scroll } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { MatIconRegistry } from '@angular/material/icon';

const log = new Logger('App');

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private domSanitizer: DomSanitizer,
        private matIconRegistry: MatIconRegistry
    ) {
        this.matIconRegistry.addSvgIcon(`amazon_logo`, domSanitizer.bypassSecurityTrustResourceUrl('./../assets/amazon_logo.svg'));

        this.router.events.subscribe((event: any) => {
            if (event instanceof Scroll && event.anchor) {
                setTimeout(() => {
                    this.scroll('#' + event.anchor);
                }, 100);
            }
        });
    }

    ngOnInit() {
        // Setup logger
        if (environment.production) {
            Logger.enableProductionMode();
        }

        log.debug('init');

        const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

        // Change page title on navigation or language change, based on route data
        merge(onNavigationEnd)
            .pipe(
                map(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                switchMap((route) => route.data),
                untilDestroyed(this)
            )
            .subscribe((event) => {
                const title = event.title;
                if (title) {
                    this.titleService.setTitle(title);
                }
            });
    }

    ngOnDestroy() {}

    // https://github.com/angular/angular/issues/30139
    private scroll(query: string) {
        const targetElement = document.querySelector(query);
        if (!targetElement) {
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth',
            });
        } else if (!this.isInViewport(targetElement)) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    private isInViewport = (elem: any) => {
        const bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
}
