import {
  Renderer2,
  ɵbypassSanitizationTrustUrl,
  ɵɵtrustConstantResourceUrl,
} from "@angular/core";
import { Observable, Subscriber } from "rxjs";

declare const window: any;

/**
 * Load the hCaptcha script by appending a script element to the head element.
 * The script won't be loaded again if it has already been loaded.
 * Async and defer are set to prevent blocking the renderer while loading hCaptcha.
 */
export function loadHCaptcha(
  languageCode?: string,
  renderer?: Renderer2
): Observable<void> {
  return new Observable<void>((observer: Subscriber<void>) => {
    // No window object (ssr)
    if (!window) {
      return;
    }

    // The hCaptcha script has already been loaded
    if (typeof window.hcaptcha !== "undefined") {
      observer.next();
      observer.complete();
      return;
    }

    let src = "https://hcaptcha.com/1/api.js?render=explicit";

    // Set language code
    if (languageCode) {
      src += `&hl=${languageCode}`;
    }

    // Setup mock TemplateArray
    const stringArray = [src] as any;
    stringArray.raw = [src];

    // Create a trusted URL from your script URL
    const trustedScriptURL = ɵɵtrustConstantResourceUrl(stringArray);

    // Create a script element
    const scriptElement = renderer.createElement("script");

    // Set the 'src' attribute of the script element to the trusted URL
    scriptElement.src = trustedScriptURL;
    scriptElement.defer = true;
    scriptElement.async = true;
    scriptElement.onerror = (e) => observer.error(e);
    scriptElement.onload = () => {
      observer.next();
      observer.complete();
    };

    // Append the script element to the document head
    renderer.appendChild(document.head, scriptElement);
  });
}
