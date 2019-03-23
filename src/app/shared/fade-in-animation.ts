import { trigger, transition, style, animateChild, group, animate, query, state, stagger } from '@angular/animations';

export const fadeInAndOut =
    trigger('fadeInAndOutForPlan', [
        state('open', style({ opacity: 1 })),
        state('close', style({ opacity: 0 })),
        transition('open => close', animate('.3s', style({ opacity: 0 }))),
        transition('close => open', animate('.5s', style({ opacity: 1 }))),
    ]);

export const scrollInAndOut =
    trigger('scrollInAndOut', [
        state('open', style({ height: '*', opacity: 1 })),
        state('close', style({ height: '0', opacity: 0 })),
        transition('open => close', animate('.5s ease-in-out')),
        transition('close => open', animate('.5s ease-in-out')),
    ]);

export const fadeInAndOutForRoute =
    trigger('fadeInAndOutForRoute', [
        transition('* => *', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    paddingRight: '15px',
                    paddingLeft: '15px'
                })
            ], { optional: true }),
            query(':enter', style({ opacity: 0 }), { optional: true }),
            query(':leave', [
                style({ opacity: 1 }),
                animate('.5s', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 0 }),
                animate('.5s', style({ opacity: 1 }))
            ], { optional: true }),
        ])
    ]);
