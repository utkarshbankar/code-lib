import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';/
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Template } from './Template';

@Injectable({
  providedIn: 'root'
})
export class DocTempService {

  private postURL = 'http://localhost:2131/api/addTemplate/';
  private getURL  = 'http://localhost:2131/api/allTemplate/'; 
  constructor(private http:HttpClient) { }

  saveDocTemplate(obj){
    return this.http.post(this.postURL, obj).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.error(
          //   `Backend returned code ${error.status}, ` +
          //   `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          error.message + error.status
          //'Something bad happened; please try again later.'
        );
      };
  
  getAllTemplateTitle():Observable<any> {
      return this.http.get<Template[]>(this.getURL).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }    

}