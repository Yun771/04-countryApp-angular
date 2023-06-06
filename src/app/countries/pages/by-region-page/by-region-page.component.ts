import {Component, OnInit} from '@angular/core';
import {Country} from "../../interfaces/country";
import {CountriesService} from "../../services/countries.service";
import {Region} from "../../interfaces/region.type";


@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: []
})
export class ByRegionPageComponent implements  OnInit{
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania',];
  public selectRegion?: Region;

  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit() {
    this.selectRegion = this.countriesService.cacheStore.byRegion.region;
    this.countries = this.countriesService.cacheStore.byRegion.countries;
  }


  public searchByValue(term: Region): void {
    this.isLoading = true;
    this.selectRegion = term;

    this.countriesService.searchByRegion(term).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;

    })
  }


}

