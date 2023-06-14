import { Renderer2 } from "@angular/core";
import { Observable } from "rxjs";
/**
 * Load the hCaptcha script by appending a script element to the head element.
 * The script won't be loaded again if it has already been loaded.
 * Async and defer are set to prevent blocking the renderer while loading hCaptcha.
 */
export declare function loadHCaptcha(languageCode?: string, renderer?: Renderer2): Observable<void>;
