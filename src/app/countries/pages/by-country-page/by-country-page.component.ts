import { Component }        from '@angular/core';
import { CountriesService } from "../../services/countries.service";
import { Country }          from "../../interfaces/country";

@Component( {
    selector: 'countries-by-country-page',
    templateUrl: './by-country-page.component.html',
    styles: [],
} )
export class ByCountryPageComponent {
    constructor( private countriesService: CountriesService ) {
    }

    public countries: Country[] = [];

    searchByValue( term: string ): void {
        this.countriesService.searhCountry(term).subscribe(countries => {
            this.countries = countries;
        })
    }

}