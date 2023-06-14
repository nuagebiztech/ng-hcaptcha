import { Directive, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CAPTCHA_CONFIG } from './ng-hcaptcha-config';
import { loadHCaptcha } from './hcaptcha-utils';
import * as i0 from "@angular/core";
export class NgHcaptchaInvisibleButtonDirective {
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CAPTCHA_CONFIG]
                }] }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { siteKey: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaGNhcHRjaGEtaW52aXNpYmxlLWJ1dHRvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1oY2FwdGNoYS9zcmMvbGliL25nLWhjYXB0Y2hhLWludmlzaWJsZS1idXR0b24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFrQixNQUFNLEVBQUUsV0FBVyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ2pKLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXRFLE9BQU8sRUFBRSxjQUFjLEVBQWlCLE1BQU0sc0JBQXNCLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQU9oRCxNQUFNLE9BQU8sa0NBQWtDO0lBYzdDLFlBQW9CLEtBQWlCLEVBQ08sTUFBcUIsRUFDN0MsSUFBWSxFQUNTLFVBQVU7UUFIL0IsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNPLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDN0MsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNTLGVBQVUsR0FBVixVQUFVLENBQUE7UUFaekMsV0FBTSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzFELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNyRCxVQUFLLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkQsVUFBSyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBU04sQ0FBQztJQUV4RCxRQUFRO1FBQ04sdUVBQXVFO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDOUM7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QUMsUUFBYTtRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssT0FBTyxDQUFDLEtBQVU7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7K0hBMUdVLGtDQUFrQyw0Q0FlekIsY0FBYyxtQ0FFZCxXQUFXO21IQWpCcEIsa0NBQWtDOzJGQUFsQyxrQ0FBa0M7a0JBSDlDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtpQkFDeEM7OzBCQWdCYyxNQUFNOzJCQUFDLGNBQWM7OzBCQUVyQixNQUFNOzJCQUFDLFdBQVc7NENBZnRCLE9BQU87c0JBQWYsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxPQUFPO3NCQUFoQixNQUFNO2dCQUNHLEtBQUs7c0JBQWQsTUFBTTtnQkFDRyxLQUFLO3NCQUFkLE1BQU07Z0JBa0RQLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBOZ1pvbmUsIE9uSW5pdCwgT3V0cHV0LCBQTEFURk9STV9JRCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciwgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENBUFRDSEFfQ09ORklHLCBDYXB0Y2hhQ29uZmlnIH0gZnJvbSAnLi9uZy1oY2FwdGNoYS1jb25maWcnO1xuaW1wb3J0IHsgbG9hZEhDYXB0Y2hhIH0gZnJvbSAnLi9oY2FwdGNoYS11dGlscyc7XG5cbmRlY2xhcmUgY29uc3Qgd2luZG93OiBhbnk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ0hjYXB0Y2hhSW52aXNpYmxlQnV0dG9uXSdcbn0pXG5leHBvcnQgY2xhc3MgTmdIY2FwdGNoYUludmlzaWJsZUJ1dHRvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBzaXRlS2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxhbmd1YWdlQ29kZTogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSB2ZXJpZnk6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBleHBpcmVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIGxhc3RDbGlja0V2ZW50OiBhbnk7XG4gIHByaXZhdGUgY2FwdGNoYSQ6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSB3aWRnZXRJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0FQVENIQV9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBDYXB0Y2hhQ29uZmlnLFxuICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBVc2UgbGFuZ3VhZ2UgY29kZSBmcm9tIG1vZHVsZSBjb25maWcgd2hlbiBpbnB1dCBwYXJhbWV0ZXIgaXMgbm90IHNldFxuICAgIGlmICghdGhpcy5sYW5ndWFnZUNvZGUpIHtcbiAgICAgIHRoaXMubGFuZ3VhZ2VDb2RlID0gdGhpcy5jb25maWcubGFuZ3VhZ2VDb2RlO1xuICAgIH1cblxuICAgIC8vIERvIG5vdCBsb2FkIGhDYXB0Y2hhIGlmIHBsYXRmb3JtIGlzIHNlcnZlclxuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBMb2FkIHRoZSBoQ2FwdGNoYSBzY3JpcHRcbiAgICB0aGlzLmNhcHRjaGEkID0gbG9hZEhDYXB0Y2hhKHRoaXMubGFuZ3VhZ2VDb2RlKS5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKGNvbnRleHQpID0+IHtcbiAgICAgICAgICAvLyBDb25maWd1cmUgaENhcHRjaGFcbiAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgc2l0ZWtleTogKGNvbnRleHQuc2l0ZUtleSB8fCBjb250ZXh0LmNvbmZpZy5zaXRlS2V5KSxcbiAgICAgICAgICAgIHNpemU6ICdpbnZpc2libGUnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IChyZXMpID0+IHsgY29udGV4dC56b25lLnJ1bigoKSA9PiBjb250ZXh0Lm9uVmVyaWZ5KHJlcykpOyB9LFxuICAgICAgICAgICAgJ2V4cGlyZWQtY2FsbGJhY2snOiAocmVzKSA9PiB7IGNvbnRleHQuem9uZS5ydW4oKCkgPT4gY29udGV4dC5vbkV4cGlyZWQocmVzKSk7IH0sXG4gICAgICAgICAgICAnZXJyb3ItY2FsbGJhY2snOiAoZXJyKSA9PiB7IGNvbnRleHQuem9uZS5ydW4oKCkgPT4gY29udGV4dC5vbkVycm9yKGVycikpOyB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIFJlbmRlciBoQ2FwdGNoYSB1c2luZyB0aGUgZGVmaW5lZCBvcHRpb25zXG4gICAgICAgICAgY29udGV4dC53aWRnZXRJZCA9IHdpbmRvdy5oY2FwdGNoYS5yZW5kZXIoY29udGV4dC5lbFJlZi5uYXRpdmVFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfSwgNTAsIHRoaXMpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybVNlcnZlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jYXB0Y2hhJC51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKGV2ZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoZXZlbnQuaENhcHRjaGFUb2tlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubGFzdENsaWNrRXZlbnQgPSBldmVudDtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAvLyBPbmx5IGV4ZWN1dGUgaENhcHRjaGEgaWYgcGxhdGZvcm0gaXMgYnJvd3NlclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB3aW5kb3cuaGNhcHRjaGEuZXhlY3V0ZSh0aGlzLndpZGdldElkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB3aW5kb3cuaGNhcHRjaGEucmVzZXQodGhpcy53aWRnZXRJZCk7XG4gIH1cblxuICAvKipcbiAgICogSXMgY2FsbGVkIHdoZW4gdGhlIHZlcmlmaWNhdGlvbiB3YXMgc3VjY2Vzc2Z1bFxuICAgKiBAcGFyYW0gcmVzcG9uc2UgVGhlIHZlcmlmaWNhdGlvbiB0b2tlblxuICAgKi9cbiAgcHJpdmF0ZSBvblZlcmlmeShyZXNwb25zZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmxhc3RDbGlja0V2ZW50IHx8IHt9O1xuICAgIGV2ZW50LmhDYXB0Y2hhVG9rZW4gPSByZXNwb25zZTtcbiAgICB0aGlzLmNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIHRoaXMudmVyaWZ5LmVtaXQocmVzcG9uc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIElzIGNhbGxlZCB3aGVuIHRoZSB2ZXJpZmljYXRpb24gaGFzIGV4cGlyZWRcbiAgICogQHBhcmFtIHJlc3BvbnNlIFRoZSB2ZXJpZmljYXRpb24gcmVzcG9uc2VcbiAgICovXG4gIHByaXZhdGUgb25FeHBpcmVkKHJlc3BvbnNlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGlyZWQuZW1pdChyZXNwb25zZSk7XG4gIH1cblxuICAvKipcbiAgICogSXMgY2FsbGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzIGR1cmluZyB0aGUgdmVyaWZpY2F0aW9uIHByb2Nlc3NcbiAgICogQHBhcmFtIGVycm9yIFRoZSBlcnJvciByZXR1cm5lZCBieSBoQ2FwdGNoYVxuICAgKi9cbiAgcHJpdmF0ZSBvbkVycm9yKGVycm9yOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9yLmVtaXQoZXJyb3IpO1xuICB9XG5cbn1cbiJdfQ==