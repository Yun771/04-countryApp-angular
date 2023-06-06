import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, delay, map, Observable, of, tap} from "rxjs";
import {Country} from "../interfaces/country";
import {CacheStore} from "../interfaces/cache-store.interface";
import {Region} from "../interfaces/region.type";

@Injectable({providedIn: 'root'})
export class CountriesService  {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private capitalEnpoint: string = '/capital/';
  private nameEndpoint: string = '/name/';
  private regionEndpoint: string = '/region/';
  private alphaCode: string = '/alpha/';

  private cacheStorageName: string = 'cacheStore';

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.cacheStorageName, JSON.stringify(this.cacheStore))

  }

  private loadFromLocalStorage() {
    const cacheStoreString = localStorage.getItem(this.cacheStorageName);
    if (!cacheStoreString) return;
    this.cacheStore = JSON.parse(cacheStoreString);
  }


  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountry: {
      term: '',
      countries: []
    },
    byRegion: {
      region: '',
      countries: []

    }
  };


  public searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}${this.capitalEnpoint}${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => this.cacheStore.byCapital = {term, countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searhCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}${this.nameEndpoint}${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => this.cacheStore.byCountry = {countries, term}),
    tap(() => this.saveToLocalStorage())

    );
  }

  public searchByRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}${this.regionEndpoint}${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => this.cacheStore.byRegion = {region, countries}),
      tap(() => this.saveToLocalStorage())

    );
  }

  searchByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}${this.alphaCode}${code}`;
    return this.getCountriesRequest(url).pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(() => of(null))
    );
  }


  private getCountriesRequest(url: string) {
    return this.http.get<Country[]>(url).pipe(
      // delay(2000),
      catchError(err => of([]))
    );
  }
}
