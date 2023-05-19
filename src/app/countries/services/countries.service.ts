import { Injectable } from '@angular/core';
import { HttpClient }                      from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Country }                         from "../interfaces/country";

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';
    private capitalEnpoint = '/capital/';
    private nameEndpoint: string = '/name/';
    private regionEndpoint: string = '/region/';
    private alphaCode: string = '/alpha/';



    constructor(private http : HttpClient) {
    }

    public searchCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}${this.capitalEnpoint}${term}`;
        return this.peticion(url);
    }

    public searhCountry(term: string ): Observable<Country[]> {
        const url = `${this.apiUrl}${this.nameEndpoint}${term}`;
        return this.peticion(url);
    }

    public searchByRegion(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}${this.regionEndpoint}${term}`;
        return this.peticion(url);
    }

    searchByAlphaCode(code: string): Observable<Country | null> {
        const url = `${this.apiUrl}${this.alphaCode}${code}`;
        return this.peticion(url).pipe(
            map(countries => countries.length >  0 ? countries[0]: null),
            catchError(() => of(null))
        );
    }



    private peticion(url: string) {
        return this.http.get<Country[]>(url).pipe(
            catchError(err => of([]))
        );
    }
}
