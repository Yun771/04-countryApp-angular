import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, Subject, Subscription} from "rxjs";

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit , OnDestroy{



  private debouncer: Subject<string>  = new Subject<string>();
  private debouncerSubscription?: Subscription

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @ViewChild('textInput')
  public  textInput!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {


   this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(400, )
      )
      .subscribe(value => {
      this.onDebounce.emit(value)
    })


  }

  ngOnDestroy() {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue() : void {
    const value : string = this.textInput.nativeElement.value;

    this.onValue.emit(value);
  }
  public onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
