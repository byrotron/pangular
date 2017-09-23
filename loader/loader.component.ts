import { 
  Component, 
  Input, 
  ElementRef, 
  trigger, 
  state, 
  style, 
  transition, 
  animate 
} from '@angular/core';

@Component({
  selector: 'sktn-loader',
  templateUrl: './loader.component.html',
  styleUrls: [
    './loader.component.scss'
  ],
  animations: [
    trigger("fadetoggle", [
      state('hide',
        style({
          opacity: 0,
          transform: 'translate(-9999px)'
        })
      ),
      state('show',
        style({
          opacity: 1,
          transform: 'translate(0)'
        })
      ),
      transition( 'show => hide', animate( '800ms ease-out', style({ opacity: 0 } ) ) ),
      transition( 'hide => show', animate( '10ms', style({ opacity: 1 } ) ) )
    ])
  ]
})
export class SktnLoaderComponent {

  @Input()
  show: 'show' | 'hide';

  @Input()
  message: string;

  top: string = '0px';

  constructor(
    protected element: ElementRef
  ) { }

  ngOnChanges() {
    console.log("ngOnChanges");
    console.log(this.show);
    if(this.show === 'show') {

      var html: HTMLElement = this.element.nativeElement;
      var parent = html.parentElement;
      var scroll = parent.scrollTop;
      this.top = scroll + 'px';

    }
  }


}
