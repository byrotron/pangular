import { 
  trigger, 
  state, 
  style, 
  animate,
  transition
} from '@angular/core';

export const SidenavToggle = trigger("sidenavtoggle", [

  state('hideleft',
    style({
      'max-width': '0%',
      'transform': 'translate(-100%)',
      'display': 'none'
    })
  ),
  state('showleft',
    style({
      'max-width': '12%',
      'transform': 'translate(0%)',
      'display': 'initial'
    })
  ),
  transition('hideleft=>showleft', [
    animate('300ms ease-in', style({
      'max-width': '12%',
      'transform': 'translate(0%)',
    }))
  ]),
  transition('showleft=>hideleft', [
    animate('300ms ease-out', style({
      'max-width':'0%',
      'transform': 'translate(-100%)'
    }))
  ]),

  state('hideright',
    style({
        'max-width': '0%',
        'transform': 'translate(-100%)',
        'display': 'none'
      })
    ),
    state('showright',
      style({
        'max-width': '12%',
        'transform': 'translate(0%)',
        'display': 'initial'
      })
    ),
    transition('hideright=>showright', [
      animate('300ms ease-in', style({
        'max-width': '12%',
        'transform': 'translate(0%)'
      }))
    ]),
    transition('showright=>hideright', [
      animate('300ms ease-out', style({
        'max-width':'0%',
        'transform': 'translate(-100%)'
      }))
  ])
])