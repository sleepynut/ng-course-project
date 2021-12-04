import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {  
  // option#1 -- my own
  // toggle = false;

  // constructor(
  //   private elementRef:ElementRef,
  //   private renderer:Renderer2) {}

  // @HostListener('click')
  // onClick(){
  //   this.toggle = !this.toggle;
    
  //   if(this.toggle) this.addClass();
  //   else this.removeClass();
  // }

  
  
  // addClass(){
  //   this.renderer.addClass(this.elementRef.nativeElement,'open');
  // }

  // removeClass(){
  //   this.renderer.removeClass(this.elementRef.nativeElement,'open');
  // }

  // option#2 -- answer --> doesnt work on bootstrap5 !
  constructor(private elRef:ElementRef,private renderer:Renderer2){}

  @HostBinding('class.show')
  toggle = false;

  @HostListener('click')
  onToggle(){
    this.toggle = !this.toggle;
    // this.renderer.setProperty(this.elRef.nativeElement,'aria-expanded','true');
    // this.elRef.nativeElement.setAttribute('aria-expanded',this.toggle);
    // if(this.toggle){
    //   this.elRef.nativeElement.parentElement.children[1].setAttribute('style','position:absolute; insert: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 40px, 0px);');
    //   this.elRef.nativeElement.parentElement.children[1].setAttribute('data-popper-placement','bottom-start');
    // }else{
    //   this.elRef.nativeElement.parentElement.children[1].setAttribute('style',null);
    //   this.elRef.nativeElement.parentElement.children[1].setAttribute('data-popper-placement',null); 
    // }
  }
}
