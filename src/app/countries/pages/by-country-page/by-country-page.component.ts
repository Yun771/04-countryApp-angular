import {Component, OnInit} from '@angular/core';
import { CountriesService } from "../../services/countries.service";
import { Country }          from "../../interfaces/country";

@Component( {
    selector: 'countries-by-country-page',
    templateUrl: './by-country-page.component.html',
    styles: [],
} )
export class ByCountryPageComponent implements OnInit{
    constructor( private countriesService: CountriesService ) {
    }


    ngOnInit() {
     this.countries = this.countriesService.cacheStore.byCountry.countries;
     this.initialValue = this.countriesService.cacheStore.byCountry.term;
    }

  public countries: Country[] = [];
  public isLoading = false;
  public initialValue: string = '';

    searchByValue( term: string ): void {
      this.isLoading = true;
        this.countriesService.searhCountry(term).subscribe(countries => {
            this.countries = countries;
          this.isLoading = false;

        })
    }

}
