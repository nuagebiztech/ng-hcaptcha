import { ElementRef, EventEmitter, NgZone, OnInit, OnDestroy } from '@angular/core';
import { CaptchaConfig } from './ng-hcaptcha-config';
import * as i0 from "@angular/core";
export declare class NgHcaptchaInvisibleButtonDirective implements OnInit, OnDestroy {
    private elRef;
    private config;
    private zone;
    private platformId;
    siteKey: string;
    languageCode: string;
    verify: EventEmitter<string>;
    expired: EventEmitter<any>;
    error: EventEmitter<any>;
    click: EventEmitter<any>;
    private lastClickEvent;
    private captcha$;
    private widgetId;
    constructor(elRef: ElementRef, config: CaptchaConfig, zone: NgZone, platformId: any);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onClick(event: any): boolean;
    reset(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NgHcaptchaInvisibleButtonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgHcaptchaInvisibleButtonDirective, "[ngHcaptchaInvisibleButton]", never, { "siteKey": "siteKey"; "languageCode": "languageCode"; }, { "verify": "verify"; "expired": "expired"; "error": "error"; "click": "click"; }, never, never, false>;
}
