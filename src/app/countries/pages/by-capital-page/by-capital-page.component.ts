import {Component, Input, OnInit} from '@angular/core';
import { CountriesService } from "../../services/countries.service";
import { Country }          from "../../interfaces/country";

@Component( {
    selector: 'countries-by-capital-page',
    templateUrl: './by-capital-page.component.html',
    styles: [],
} )
export class ByCapitalPageComponent implements OnInit{


    constructor( private countriesService: CountriesService ) {
    }

    ngOnInit(): void {
      this.coutries = this.countriesService.cacheStore.byCapital.countries;
      this.term = this.countriesService.cacheStore.byCapital.term;
    }

    public term: string = '';

  public coutries: Country[] = [];
    public isLoading = false;

    searchByValue( term: string ) {
      this.isLoading = true;
        this.countriesService.searchCapital( term ).subscribe( countries => {
            this.coutries = countries;
            this.isLoading = false;
        } );
    }
}
