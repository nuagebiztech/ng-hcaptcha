import { Observable } from "rxjs";
import { CaptchaConfig } from "./ng-hcaptcha-config";
import * as i0 from "@angular/core";
export declare class NgHcaptchaService {
    private captchaConfig;
    private hCaptchaElement;
    private hCaptchaWidgetId;
    constructor(captchaConfig: CaptchaConfig);
    verify(): Observable<any>;
    private resetHcaptcha;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgHcaptchaService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgHcaptchaService>;
}
