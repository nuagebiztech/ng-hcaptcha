import * as i0 from '@angular/core';
import { InjectionToken, ɵɵtrustConstantResourceUrl, EventEmitter, PLATFORM_ID, forwardRef, Component, Inject, Input, ViewChild, Output, Directive, HostListener, Injectable, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

const CAPTCHA_CONFIG = new InjectionToken('CAPTCHA_CONFIG');

/**
 * Load the hCaptcha script by appending a script element to the head element.
 * The script won't be loaded again if it has already been loaded.
 * Async and defer are set to prevent blocking the renderer while loading hCaptcha.
 */
function loadHCaptcha(languageCode, renderer) {
    return new Observable((observer) => {
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
        const stringArray = [src];
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

class NgHcaptchaComponent {
    constructor(config, zone, platformId, renderer) {
        this.config = config;
        this.zone = zone;
        this.platformId = platformId;
        this.renderer = renderer;
        this.verify = new EventEmitter();
        this.expired = new EventEmitter();
        this.error = new EventEmitter();
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    // Initialization
    ngOnInit() {
        // Use language code from module config when input parameter is not set
        if (!this.languageCode) {
            this.languageCode = this.config.languageCode;
        }
        // Do not load hCaptcha if platform is server
        if (isPlatformServer(this.platformId)) {
            return;
        }
        this.captcha$ = loadHCaptcha(this.languageCode, this.renderer).subscribe(() => {
            setTimeout((context) => {
                // Configure hCaptcha
                const options = {
                    sitekey: context.siteKey || context.config.siteKey,
                    theme: context.theme,
                    size: context.size,
                    tabindex: context.tabIndex,
                    callback: (res) => {
                        context.zone.run(() => context.onVerify(res));
                    },
                    "expired-callback": (res) => {
                        context.zone.run(() => context.onExpired(res));
                    },
                    "error-callback": (err) => {
                        context.zone.run(() => context.onError(err));
                    },
                };
                // Render hCaptcha using the defined options
                context.widgetId = window.hcaptcha.render(context.captcha.nativeElement, options);
            }, 50, this);
        }, (error) => {
            console.error("Failed to load hCaptcha script", error);
        });
    }
    ngOnDestroy() {
        this.captcha$.unsubscribe();
    }
    // ControlValueAccessor implementation
    writeValue(value) {
        // Needs to be implemented to make the FormGroup's reset function work
        this.value = value;
        // Reset hCaptcha.
        // We need to check whether window.hcaptcha is defined because
        // writeValue(value: any) can be called before hCaptcha has been intialized.
        if (isPlatformBrowser(this.platformId) && !this.value && window.hcaptcha) {
            window.hcaptcha.reset(this.widgetId);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    reset() {
        window.hcaptcha.reset(this.widgetId);
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.onChange(value);
        this.onTouched();
    }
    // Internal functions
    /**
     * Is called when the verification was successful
     * @param response The verification token
     */
    onVerify(response) {
        this.value = response;
        this.verify.emit(response);
    }
    /**
     * Is called when the verification has expired
     * @param response The verification response
     */
    onExpired(response) {
        this.expired.emit(response);
    }
    /**
     * Is called when an error occurs during the verification process
     * @param error The error returned by hCaptcha
     */
    onError(error) {
        this.error.emit(error);
    }
}
NgHcaptchaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaComponent, deps: [{ token: CAPTCHA_CONFIG }, { token: i0.NgZone }, { token: PLATFORM_ID }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NgHcaptchaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.4", type: NgHcaptchaComponent, selector: "ng-hcaptcha", inputs: { siteKey: "siteKey", theme: "theme", size: "size", tabIndex: "tabIndex", languageCode: "languageCode" }, outputs: { verify: "verify", expired: "expired", error: "error" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgHcaptchaComponent),
            multi: true,
        },
    ], viewQueries: [{ propertyName: "captcha", first: true, predicate: ["captcha"], descendants: true, static: true }], ngImport: i0, template: '<div #captcha class="h-captcha"></div>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaComponent, decorators: [{
            type: Component,
            args: [{ selector: "ng-hcaptcha", template: '<div #captcha class="h-captcha"></div>', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgHcaptchaComponent),
                            multi: true,
                        },
                    ] }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [CAPTCHA_CONFIG]
                    }] }, { type: i0.NgZone }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [PLATFORM_ID]
                    }] }, { type: i0.Renderer2 }];
    }, propDecorators: { siteKey: [{
                type: Input
            }], theme: [{
                type: Input
            }], size: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], languageCode: [{
                type: Input
            }], captcha: [{
                type: ViewChild,
                args: ["captcha", { static: true }]
            }], verify: [{
                type: Output
            }], expired: [{
                type: Output
            }], error: [{
                type: Output
            }] } });

class NgHcaptchaInvisibleButtonDirective {
    constructor(elRef, config, zone, platformId) {
        this.elRef = elRef;
        this.config = config;
        this.zone = zone;
        this.platformId = platformId;
        this.verify = new EventEmitter();
        this.expired = new EventEmitter();
        this.error = new EventEmitter();
        this.click = new EventEmitter();
    }
    ngOnInit() {
        // Use language code from module config when input parameter is not set
        if (!this.languageCode) {
            this.languageCode = this.config.languageCode;
        }
        // Do not load hCaptcha if platform is server
        if (isPlatformServer(this.platformId)) {
            return;
        }
        // Load the hCaptcha script
        this.captcha$ = loadHCaptcha(this.languageCode).subscribe(() => {
            setTimeout((context) => {
                // Configure hCaptcha
                const options = {
                    sitekey: (context.siteKey || context.config.siteKey),
                    size: 'invisible',
                    callback: (res) => { context.zone.run(() => context.onVerify(res)); },
                    'expired-callback': (res) => { context.zone.run(() => context.onExpired(res)); },
                    'error-callback': (err) => { context.zone.run(() => context.onError(err)); }
                };
                // Render hCaptcha using the defined options
                context.widgetId = window.hcaptcha.render(context.elRef.nativeElement, options);
            }, 50, this);
        });
    }
    ngOnDestroy() {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        this.captcha$.unsubscribe();
    }
    onClick(event) {
        if (event.hCaptchaToken) {
            return;
        }
        this.lastClickEvent = event;
        event.stopPropagation();
        event.preventDefault();
        event.cancelBubble = true;
        event.stopImmediatePropagation();
        // Only execute hCaptcha if platform is browser
        if (isPlatformBrowser(this.platformId)) {
            window.hcaptcha.execute(this.widgetId);
        }
        return false;
    }
    reset() {
        window.hcaptcha.reset(this.widgetId);
    }
    /**
     * Is called when the verification was successful
     * @param response The verification token
     */
    onVerify(response) {
        const event = this.lastClickEvent || {};
        event.hCaptchaToken = response;
        this.click.emit(event);
        this.verify.emit(response);
    }
    /**
     * Is called when the verification has expired
     * @param response The verification response
     */
    onExpired(response) {
        this.expired.emit(response);
    }
    /**
     * Is called when an error occurs during the verification process
     * @param error The error returned by hCaptcha
     */
    onError(error) {
        this.error.emit(error);
    }
}
NgHcaptchaInvisibleButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaInvisibleButtonDirective, deps: [{ token: i0.ElementRef }, { token: CAPTCHA_CONFIG }, { token: i0.NgZone }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
NgHcaptchaInvisibleButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.4", type: NgHcaptchaInvisibleButtonDirective, selector: "[ngHcaptchaInvisibleButton]", inputs: { siteKey: "siteKey", languageCode: "languageCode" }, outputs: { verify: "verify", expired: "expired", error: "error", click: "click" }, host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaInvisibleButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngHcaptchaInvisibleButton]'
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [CAPTCHA_CONFIG]
                    }] }, { type: i0.NgZone }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [PLATFORM_ID]
                    }] }];
    }, propDecorators: { siteKey: [{
                type: Input
            }], languageCode: [{
                type: Input
            }], verify: [{
                type: Output
            }], expired: [{
                type: Output
            }], error: [{
                type: Output
            }], click: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

class NgHcaptchaService {
    constructor(captchaConfig) {
        this.captchaConfig = captchaConfig;
    }
    verify() {
        return new Observable((subscriber) => {
            loadHCaptcha(this.captchaConfig.languageCode).subscribe(() => {
                setTimeout((context) => {
                    // Create hCaptcha element
                    if (!this.hCaptchaElement) {
                        this.hCaptchaElement = document.createElement('div');
                        document.body.appendChild(this.hCaptchaElement);
                    }
                    // Render hCaptcha using the defined options
                    if (!this.hCaptchaWidgetId) {
                        // Configure hCaptcha
                        const options = {
                            sitekey: this.captchaConfig.siteKey,
                            size: 'invisible',
                            callback: (res) => {
                                subscriber.next(res);
                                subscriber.complete();
                                this.resetHcaptcha();
                            },
                            'expired-callback': (res) => {
                                subscriber.error(res);
                                this.resetHcaptcha();
                            },
                            'error-callback': (err) => {
                                subscriber.error(err);
                                this.resetHcaptcha();
                            },
                        };
                        this.hCaptchaWidgetId = window.hcaptcha.render(this.hCaptchaElement, options);
                    }
                    // Immediately execute hCaptcha
                    window.hcaptcha.execute(this.hCaptchaWidgetId);
                }, 50, this);
            });
        });
    }
    resetHcaptcha() {
        window.hcaptcha.remove(this.hCaptchaWidgetId);
        this.hCaptchaElement = null;
        this.hCaptchaWidgetId = null;
    }
}
NgHcaptchaService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaService, deps: [{ token: CAPTCHA_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
NgHcaptchaService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaService, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [CAPTCHA_CONFIG]
                    }] }];
    } });

class NgHcaptchaModule {
    static forRoot(config) {
        return {
            ngModule: NgHcaptchaModule,
            providers: [
                NgHcaptchaService,
                {
                    provide: CAPTCHA_CONFIG,
                    useValue: config || []
                },
            ]
        };
    }
}
NgHcaptchaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgHcaptchaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaModule, declarations: [NgHcaptchaComponent, NgHcaptchaInvisibleButtonDirective], exports: [NgHcaptchaComponent, NgHcaptchaInvisibleButtonDirective] });
NgHcaptchaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: NgHcaptchaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    declarations: [NgHcaptchaComponent, NgHcaptchaInvisibleButtonDirective],
                    exports: [NgHcaptchaComponent, NgHcaptchaInvisibleButtonDirective],
                }]
        }] });

/*
 * Public API Surface of ng-hcaptcha
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CAPTCHA_CONFIG, NgHcaptchaComponent, NgHcaptchaInvisibleButtonDirective, NgHcaptchaModule, NgHcaptchaService, loadHCaptcha };
//# sourceMappingURL=ng-hcaptcha.mjs.map
