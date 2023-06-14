import { ElementRef, OnInit, NgZone, EventEmitter, OnDestroy, Renderer2 } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { CaptchaConfig } from "./ng-hcaptcha-config";
import * as i0 from "@angular/core";
export declare class NgHcaptchaComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private config;
    private zone;
    private platformId;
    private renderer;
    siteKey: string;
    theme: string;
    size: string;
    tabIndex: number;
    languageCode: string;
    captcha: ElementRef;
    verify: EventEmitter<string>;
    expired: EventEmitter<any>;
    error: EventEmitter<any>;
    private _value;
    private widgetId;
    private captcha$;
    onChange: any;
    onTouched: any;
    constructor(config: CaptchaConfig, zone: NgZone, platformId: any, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(value: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    reset(): void;
    get value(): string;
    set value(value: string);
    /**
     * Is called when the verification was successful
     * @param response The verification token
     */
    private onVerify;
    /**
     * Is called when the verification has expired
     * @param response The verification response
     */
    private onExpired;
    /**
     * Is called when an error occurs during the verification process
     * @param error The error returned by hCaptcha
     */
    private onError;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgHcaptchaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgHcaptchaComponent, "ng-hcaptcha", never, { "siteKey": "siteKey"; "theme": "theme"; "size": "size"; "tabIndex": "tabIndex"; "languageCode": "languageCode"; }, { "verify": "verify"; "expired": "expired"; "error": "error"; }, never, never, false>;
}
