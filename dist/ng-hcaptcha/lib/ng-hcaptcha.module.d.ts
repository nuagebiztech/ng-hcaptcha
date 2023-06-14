import { ModuleWithProviders } from '@angular/core';
import { CaptchaConfig } from './ng-hcaptcha-config';
import * as i0 from "@angular/core";
import * as i1 from "./ng-hcaptcha.component";
import * as i2 from "./ng-hcaptcha-invisible-button.directive";
export declare class NgHcaptchaModule {
    static forRoot(config?: CaptchaConfig): ModuleWithProviders<NgHcaptchaModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgHcaptchaModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgHcaptchaModule, [typeof i1.NgHcaptchaComponent, typeof i2.NgHcaptchaInvisibleButtonDirective], never, [typeof i1.NgHcaptchaComponent, typeof i2.NgHcaptchaInvisibleButtonDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgHcaptchaModule>;
}
