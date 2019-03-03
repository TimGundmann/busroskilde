import { trigger, transition, style, animateChild, group, animate, query, state, stagger } from '@angular/animations';

export const fadeInAndOutForPlan =
    trigger('fadeInAndOutForPlan', [
        state('open', style({ opacity: 1 })),
        state('close', style({ opacity: 0 })),
        transition('open => close', animate('.3s', style({ opacity: 0 }))),
        transition('close => open', animate('.5s', style({ opacity: 1 }))),
    ]);

export const fadeInAndOutForRoute =
    trigger('fadeInAndOutForRoute', [
        transition('* => *', [
            query(':enter', style({ opacity: 0 }), { optional: true }),
            query(':leave', [
                style({ opacity: 1 }),
                animate('.5s', style({ opacity: 0 }))
            ],  { optional: true }),
            query(':enter', [
                style({ opacity: 0 }),
                animate('.5s', style({ opacity: 1 }))
            ],  { optional: true }),
        ])
    ]);
