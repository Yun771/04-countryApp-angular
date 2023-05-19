import { Component, Input } from '@angular/core';
import { CountriesService } from "../../services/countries.service";
import { Country }          from "../../interfaces/country";

@Component( {
    selector: 'countries-by-capital-page',
    templateUrl: './by-capital-page.component.html',
    styles: [],
} )
export class ByCapitalPageComponent {

    constructor( private countriesService: CountriesService ) {
    }

    public coutries: Country[] = [];

    searchByValue( term: string ) {
        this.countriesService.searchCapital( term ).subscribe( countries => {
            this.coutries = countries;
        } );
        console.log( 'desde capital page' );
    }
}
