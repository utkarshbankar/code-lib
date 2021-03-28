import { Compiler,
  Inject,
  Injectable,
  NgModuleFactory,
  NgModuleRef,
  Type,
 } from '@angular/core';


import { from, Observable, of } from 'rxjs';
import { createCustomElement } from '@angular/elements';
import { LoadChildrenCallback } from '@angular/router';
import { ELEMENT_MODULE_LOAD_CALLBACKS_TOKEN, WithCustomElementComponent} from './elm-registry';

@Injectable({
  providedIn: 'root'
})
export class ElmLoaderService {
/**
 * Refrence for The Lazy loading module and Compnent
 * https://indepth.dev/lazy-loading-angular-modules-with-ivy/
 * https://indepth.dev/here-is-what-you-need-to-know-about-dynamic-components-in-angular/
 * https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine/
 * 
 * for Angular <= v7
 * https://morioh.com/p/ae073a96d663
*/
  /** Map of unregistered custom elements and their respective module paths to load. */
  private elementsToLoad: Map<string, LoadChildrenCallback>;
  /** Map of custom elements that are in the process of being loaded and registered. */
  private elementsLoading = new Map<string, Promise<void>>();

  constructor(private moduleRef: NgModuleRef<any>,
              @Inject(ELEMENT_MODULE_LOAD_CALLBACKS_TOKEN) elementModulePaths: Map<string, LoadChildrenCallback>,
              private compiler: Compiler) {
    this.elementsToLoad = new Map(elementModulePaths);
  }

  loadContainedCustomElements(element: HTMLElement): Observable<any> {
    const unregisteredSelectors = Array.from(this.elementsToLoad.keys())
        .filter(s => element.querySelector(s));

    if (!unregisteredSelectors.length) { return of(undefined); }

    // Returns observable that completes when all discovered elements have been registered.
    const allRegistered = Promise.all(unregisteredSelectors.map(s => this.loadCustomElement(s)));
    return from(allRegistered.then(() => undefined));
  }

  loadCustomElement(selector: string): Promise<any> {
    if (this.elementsLoading.has(selector)) {
      // The custom element is in the process of being loaded and registered.
      return this.elementsLoading.get(selector)!;
    }

    if (this.elementsToLoad.has(selector)) {
      // Load and register the custom element (for the first time).
      const modulePathLoader = this.elementsToLoad.get(selector)!;
      const loadedAndRegistered =
          (modulePathLoader() as Promise<NgModuleFactory<any> | Type<any>>)
          .then(elementModuleOrFactory => {
            /**
             * With View Engine, the NgModule factory is created and provided when loaded.
             * With Ivy, only the NgModule class is provided loaded and must be compiled.
             * This uses the same mechanism as the deprecated `SystemJsNgModuleLoader` in
             * in `packages/core/src/linker/system_js_ng_module_factory_loader.ts`
             * to pass on the NgModuleFactory, or compile the NgModule and return its NgModuleFactory.
             */
            if (elementModuleOrFactory instanceof NgModuleFactory) {
              return elementModuleOrFactory;
            } else {
              return this.compiler.compileModuleAsync(elementModuleOrFactory);
            }
          })
          .then(elementModuleFactory => {
            const elementModuleRef = elementModuleFactory.create(this.moduleRef.injector);
            const injector = elementModuleRef.injector;
            console.log(elementModuleRef.instance);            
            const CustomElementComponent = elementModuleRef.instance.customElementComponent;
            const CustomElement = createCustomElement(CustomElementComponent, {injector});

            customElements!.define(selector, CustomElement);
            return customElements.whenDefined(selector);
          })
          .then(() => {
            // The custom element has been successfully loaded and registered.
            // Remove from `elementsLoading` and `elementsToLoad`.
            this.elementsLoading.delete(selector);
            this.elementsToLoad.delete(selector);
          })
          .catch(err => {
            // The custom element has failed to load and register.
            // Remove from `elementsLoading`.
            // (Do not remove from `elementsToLoad` in case it was a temporary error.)
            this.elementsLoading.delete(selector);
            return Promise.reject(err);
          });

      this.elementsLoading.set(selector, loadedAndRegistered);
      return loadedAndRegistered;
    }

    // The custom element has already been loaded and registered.
    return Promise.resolve();
  }

}
