import { InjectionToken, Type } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
export const ELEMENT_MODULE_LOAD_CALLBACKS_AS_ROUTES = [
  {
    selector: 'code-view',
    loadChildren: () => import('./lazy-test/code-view/code-view.module').then(mod => mod.CodeViewModule)
  }
]

/**
 * Interface expected to be implemented by all modules that declare a component that can be used as
 * a custom element.
 */
export interface WithCustomElementComponent {
  customElementComponent: Type<any>;
}

/** Injection token to provide the element path modules. */
export const ELEMENT_MODULE_LOAD_CALLBACKS_TOKEN = new InjectionToken<Map<string, LoadChildrenCallback>>('Angular/codeView');

/** Map of possible custom element selectors to their lazy-loadable module paths. */
export const ELEMENT_MODULE_LOAD_CALLBACKS = new Map<string, LoadChildrenCallback>();
ELEMENT_MODULE_LOAD_CALLBACKS_AS_ROUTES.forEach(route => {
  ELEMENT_MODULE_LOAD_CALLBACKS.set(route.selector, route.loadChildren);
});