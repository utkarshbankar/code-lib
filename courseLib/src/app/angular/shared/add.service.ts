import { Injectable } from '@angular/core';
import { Location, PlatformLocation } from '@angular/common';

import { ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AddService {

  public fetchId:any;
  private readonly urlParser = document.createElement('a');
  private urlSubject = new ReplaySubject<string>(1);

   currentUrl = this.urlSubject
    .pipe(map(url => this.stripSlashes(url)));

  currentPath = 
  this.currentUrl.pipe(
    map(url => (url.match(/[^?#]*/) || [])[0]),  // strip query and hash
    tap(path => locationChanged(path)),
  );

  constructor(
    private location: Location,
     private platformLocation: PlatformLocation,
  ) { 
     this.urlSubject.next(location.path(true));
    let idToBe = location.path(true);
    this.fetchId = idToBe.split('/')[(idToBe.split('/').length)-1];
    this.location.subscribe(state => {
      return this.urlSubject.next(state.url || '');
    });
  }

  // TODO: ignore if url-without-hash-or-search matches current location?
  go(url: string|null|undefined) {
    if (!url) { return; }
    url = this.stripSlashes(url);
    if (/^http/.test(url)) {
      // Has http protocol so leave the site
    //   this.goExternal(url);
    // } else if (this.swUpdateActivated) {
      // (Do a "full page navigation" if a ServiceWorker update has been activated)
      // We need to remove stored Position in order to be sure to scroll to the Top position
     // this.scrollService.removeStoredScrollPosition();
      this.goExternal(url);
    } else {
      this.location.go(url);
      this.urlSubject.next(url);
    }
  }

   goExternal(url: string) {
    window.location.assign(url);
  }

  replace(url: string) {
    window.location.replace(url);
  }

  private stripSlashes(url: string) {
    return url.replace(/^\/+/, '').replace(/\/+(\?|#|$)/, '$1');
  }

  fetchDoc(docId){
    this.location.path
    this.fetchId = docId;
  }

}

function locationChanged(url: string) {
    this.sendPage(url);
  }

  function sendPage(url: string) {
    // Won't re-send if the url hasn't changed.
    if (url === this.previousUrl) { return; }
    this.previousUrl = './assects/doc.md';
  }
