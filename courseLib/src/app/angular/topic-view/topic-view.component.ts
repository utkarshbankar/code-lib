import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { asapScheduler, Observable, of, timer } from 'rxjs';
import { catchError, observeOn, switchMap, takeUntil, tap } from 'rxjs/operators';

import { DocService } from '../shared/doc.service';
//import { DocumentContents } from '../shared/document-contents';
import { DocumentContents, FILE_NOT_FOUND_ID, FETCHING_ERROR_ID } from '../shared/doc.service';
import { ElmLoaderService } from '../code-temp/elm-loader.service';
// Initialization prevents flicker once pre-rendering is on
const initialDocViewerElement = document.querySelector('app-topic-view');
const initialDocViewerContent = initialDocViewerElement ? initialDocViewerElement.innerHTML : '';


@Component({
  selector: 'app-topic-view',
  template:``
  // ,
  // styleUrls: ['./topic-view.component.css']
})
export class TopicViewComponent {



  private hostElement: HTMLElement;

  private void$ = of<void>(undefined);
  private onDestroy$ = new EventEmitter<void>();
  private docContents$ = new EventEmitter<DocumentContents>();

  protected currViewContainer: HTMLElement = document.createElement('div');
  protected nextViewContainer: HTMLElement = document.createElement('div');
  
  @Input()
  set doc(newDoc: DocumentContents) {
    if (newDoc) {
      //if(!document.querySelector('app-topic-view')){
        /*At the moment this is working as expected. but, 
        This is might be wrong since we may not able to load content after changing the topic so look into this properly aftert chage url issue solved*/
          this.docContents$.emit(newDoc);
      //}      
    }
  }

// The new document is ready to be inserted into the viewer.
  // (Embedded components have been loaded and instantiated, if necessary.)
  @Output() docReady = new EventEmitter<void>();

  // The previous document has been removed from the viewer.
  // (The leaving animation (if any) has been completed and the node has been removed from the DOM.)
  @Output() docRemoved = new EventEmitter<void>();

  // The new document has been inserted into the viewer.
  // (The node has been inserted into the DOM, but the entering animation may still be in progress.)
  @Output() docInserted = new EventEmitter<void>();

  // The new document has been fully rendered into the viewer.
  // (The entering animation has been completed.)
  @Output() docRendered = new EventEmitter<void>();

  constructor(
    elementRef: ElementRef, 
    private docSrv: DocService, 
    private elementsLoader:ElmLoaderService ) { 
 this.hostElement = elementRef.nativeElement;

 if( initialDocViewerContent ){
this.hostElement.innerHTML = initialDocViewerContent;
 } else{
   this.docSrv.currentDocument.subscribe(doc => this.hostElement.innerHTML =  doc.contents); ;
 }
  

  if (this.hostElement.firstElementChild) {
      this.currViewContainer = this.hostElement.firstElementChild as HTMLElement;
    }

     this.docContents$
        .pipe(
            observeOn(asapScheduler),
            switchMap(newDoc => this.render(newDoc)),
            takeUntil(this.onDestroy$),
        )
        .subscribe();
       
  }

  /**
   * Add doc content to host element and build it out with embedded components.
   */
  protected render(doc: DocumentContents): Observable<any> {
    let addTitleAndToc: () => void;

   // this.setNoIndex(doc.id === FILE_NOT_FOUND_ID || doc.id === FETCHING_ERROR_ID);

    return this.void$.pipe(
        // Security: `doc.contents` is always authored by the documentation team
        //           and is considered to be safe.
       tap(() => this.nextViewContainer.innerHTML = doc.contents || ''),
       //tap(() => addTitleAndToc = this.prepareTitleAndToc(this.nextViewContainer, doc.id)),
        switchMap(() => this.elementsLoader.loadContainedCustomElements(this.nextViewContainer)),
        tap(() => this.docReady.emit()),
        switchMap(() => this.swapViews(addTitleAndToc)),
        tap(() => this.docRendered.emit()),
        catchError(err => {
          const errorMessage = (err instanceof Error) ? err.stack : err;
         // this.logger.error(new Error(`[DocViewer] Error preparing document '${doc.id}': ${errorMessage}`));
         // this.nextViewContainer.innerHTML = '';
        //  this.setNoIndex(true);
          return this.void$;
        }),
    );
  }

  protected swapViews(onInsertedCb = () => {}): Observable<void> {
    const raf$ = new Observable<void>(subscriber => {
      const rafId = requestAnimationFrame(() => {
        subscriber.next();
        subscriber.complete();
      });
      return () => cancelAnimationFrame(rafId);
    });

    // Get the actual transition duration (taking global styles into account).
    // According to the [CSSOM spec](https://drafts.csswg.org/cssom/#serializing-css-values),
    // `time` values should be returned in seconds.
    const getActualDuration = (elem: HTMLElement) => {
      const cssValue = getComputedStyle(elem).transitionDuration || '';
      const seconds = Number(cssValue.replace(/s$/, ''));
      return 1000 * seconds;
    };
    // const animateProp =
    //     (elem: HTMLElement, prop: keyof CSSStyleDeclaration, from: string, to: string, duration = 200) => {
    //       const animationsDisabled = !DocViewerComponent.animationsEnabled
    //                                  || this.hostElement.classList.contains(NO_ANIMATIONS);
    //       if (prop === 'length' || prop === 'parentRule') {
    //         // We cannot animate length or parentRule properties because they are readonly
    //         return this.void$;
    //       }
    //       elem.style.transition = '';
    //       return animationsDisabled
    //           ? this.void$.pipe(tap(() => elem.style[prop] = to))
    //           : this.void$.pipe(
    //                 // In order to ensure that the `from` value will be applied immediately (i.e.
    //                 // without transition) and that the `to` value will be affected by the
    //                 // `transition` style, we need to ensure an animation frame has passed between
    //                 // setting each style.
    //                 switchMap(() => raf$), tap(() => elem.style[prop] = from),
    //                 switchMap(() => raf$), tap(() => elem.style.transition = `all ${duration}ms ease-in-out`),
    //                 switchMap(() => raf$), tap(() => elem.style[prop] = to),
    //                 switchMap(() => timer(getActualDuration(elem))), switchMap(() => this.void$),
    //             );
    //     };

    // const animateLeave = (elem: HTMLElement) => animateProp(elem, 'opacity', '1', '0.1');
    // const animateEnter = (elem: HTMLElement) => animateProp(elem, 'opacity', '0.1', '1');

    let done$ = this.void$;

    if (this.currViewContainer.parentElement || document.querySelector('app-topic-view').firstElementChild) {
      done$ = done$.pipe(
          // Remove the current view from the viewer.
          //switchMap(() => animateLeave(this.currViewContainer)),
          //tap(() => this.currViewContainer.parentElement!.removeChild(this.currViewContainer)),
          tap(() => this.currViewContainer.parentElement.innerHTML = ''),
          tap(() => this.docRemoved.emit()),
      );
    }

return done$.pipe(
        // Insert the next view into the viewer.
        tap(() => this.hostElement.appendChild(this.nextViewContainer)),
        tap(() => onInsertedCb()),
        tap(() => this.docInserted.emit()),
        //switchMap(() => animateEnter(this.nextViewContainer)),
        // Update the view references and clean up unused nodes.
        tap(() => {
          const prevViewContainer = this.currViewContainer;
          this.currViewContainer = this.nextViewContainer;
          this.nextViewContainer = prevViewContainer;
          this.nextViewContainer.innerHTML = '';  // Empty to release memory.
        }),
    );
  }

}
