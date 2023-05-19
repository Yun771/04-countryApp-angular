import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @ViewChild('textInput')
  public  textInput!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  emitValue() : void {
    const value : string = this.textInput.nativeElement.value;

    this.onValue.emit(value);
  }
}
