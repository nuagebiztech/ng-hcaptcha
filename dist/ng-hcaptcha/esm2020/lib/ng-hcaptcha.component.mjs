import { Component, Input, ViewChild, Inject, Output, EventEmitter, forwardRef, PLATFORM_ID, } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { CAPTCHA_CONFIG } from "./ng-hcaptcha-config";
import { loadHCaptcha } from "./hcaptcha-utils";
import * as i0 from "@angular/core";
export class NgHcaptchaComponent {
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
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [CAPTCHA_CONFIG]
                }] }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }]; }, propDecorators: { siteKey: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaGNhcHRjaGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctaGNhcHRjaGEvc3JjL2xpYi9uZy1oY2FwdGNoYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsU0FBUyxFQUdULE1BQU0sRUFFTixNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEdBR1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXRFLE9BQU8sRUFBRSxjQUFjLEVBQWlCLE1BQU0sc0JBQXNCLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQWdCaEQsTUFBTSxPQUFPLG1CQUFtQjtJQXNCOUIsWUFDa0MsTUFBcUIsRUFDN0MsSUFBWSxFQUNTLFVBQVUsRUFDL0IsUUFBbUI7UUFISyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQzdDLFNBQUksR0FBSixJQUFJLENBQVE7UUFDUyxlQUFVLEdBQVYsVUFBVSxDQUFBO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFmbkIsV0FBTSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzFELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNyRCxVQUFLLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFNN0QsYUFBUSxHQUFRLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUN6QixjQUFTLEdBQVEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBTVEsQ0FBQztJQUVuQyxpQkFBaUI7SUFFakIsUUFBUTtRQUNOLHVFQUF1RTtRQUN2RSxJQUFJLENBQUMs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RUF0QlosT0FBTztzQkFBZixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVrQyxPQUFPO3NCQUE5QyxTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRTVCLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxPQUFPO3NCQUFoQixNQUFNO2dCQUNHLEtBQUs7c0JBQWQsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIFBMQVRGT1JNX0lELFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgQ0FQVENIQV9DT05GSUcsIENhcHRjaGFDb25maWcgfSBmcm9tIFwiLi9uZy1oY2FwdGNoYS1jb25maWdcIjtcbmltcG9ydCB7IGxvYWRIQ2FwdGNoYSB9IGZyb20gXCIuL2hjYXB0Y2hhLXV0aWxzXCI7XG5cbmRlY2xhcmUgY29uc3Qgd2luZG93OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJuZy1oY2FwdGNoYVwiLFxuICB0ZW1wbGF0ZTogJzxkaXYgI2NhcHRjaGEgY2xhc3M9XCJoLWNhcHRjaGFcIj48L2Rpdj4nLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nSGNhcHRjaGFDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdIY2FwdGNoYUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3Nvclxue1xuICBASW5wdXQoKSBzaXRlS2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgbGFuZ3VhZ2VDb2RlOiBzdHJpbmc7XG5cbiAgQFZpZXdDaGlsZChcImNhcHRjaGFcIiwgeyBzdGF0aWM6IHRydWUgfSkgY2FwdGNoYTogRWxlbWVudFJlZjtcblxuICBAT3V0cHV0KCkgdmVyaWZ5OiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgZXhwaXJlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgd2lkZ2V0SWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBjYXB0Y2hhJDogU3Vic2NyaXB0aW9uO1xuXG4gIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcbiAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENBUFRDSEFfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogQ2FwdGNoYUNvbmZpZyxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyICApIHt9XG5cbiAgLy8gSW5pdGlhbGl6YXRpb25cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBVc2UgbGFuZ3VhZ2UgY29kZSBmcm9tIG1vZHVsZSBjb25maWcgd2hlbiBpbnB1dCBwYXJhbWV0ZXIgaXMgbm90IHNldFxuICAgIGlmICghdGhpcy5sYW5ndWFnZUNvZGUpIHtcbiAgICAgIHRoaXMubGFuZ3VhZ2VDb2RlID0gdGhpcy5jb25maWcubGFuZ3VhZ2VDb2RlO1xuICAgIH1cblxuICAgIC8vIERvIG5vdCBsb2FkIGhDYXB0Y2hhIGlmIHBsYXRmb3JtIGlzIHNlcnZlclxuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNhcHRjaGEkID0gbG9hZEhDYXB0Y2hhKHRoaXMubGFuZ3VhZ2VDb2RlLCAgdGhpcy5yZW5kZXJlcikuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgIChjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICAvLyBDb25maWd1cmUgaENhcHRjaGFcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgIHNpdGVrZXk6IGNvbnRleHQuc2l0ZUtleSB8fCBjb250ZXh0LmNvbmZpZy5zaXRlS2V5LFxuICAgICAgICAgICAgICB0aGVtZTogY29udGV4dC50aGVtZSxcbiAgICAgICAgICAgICAgc2l6ZTogY29udGV4dC5zaXplLFxuICAgICAgICAgICAgICB0YWJpbmRleDogY29udGV4dC50YWJJbmRleCxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnpvbmUucnVuKCgpID0+IGNvbnRleHQub25WZXJpZnkocmVzKSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiZXhwaXJlZC1jYWxsYmFja1wiOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udGV4dC56b25lLnJ1bigoKSA9PiBjb250ZXh0Lm9uRXhwaXJlZChyZXMpKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJlcnJvci1jYWxsYmFja1wiOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udGV4dC56b25lLnJ1bigoKSA9PiBjb250ZXh0Lm9uRXJyb3IoZXJyKSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgaENhcHRjaGEgdXNpbmcgdGhlIGRlZmluZWQgb3B0aW9uc1xuICAgICAgICAgICAgY29udGV4dC53aWRnZXRJZCA9IHdpbmRvdy5oY2FwdGNoYS5yZW5kZXIoXG4gICAgICAgICAgICAgIGNvbnRleHQuY2FwdGNoYS5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgaENhcHRjaGEgc2NyaXB0XCIsIGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jYXB0Y2hhJC51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLy8gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50YXRpb25cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAvLyBOZWVkcyB0byBiZSBpbXBsZW1lbnRlZCB0byBtYWtlIHRoZSBGb3JtR3JvdXAncyByZXNldCBmdW5jdGlvbiB3b3JrXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgLy8gUmVzZXQgaENhcHRjaGEuXG4gICAgLy8gV2UgbmVlZCB0byBjaGVjayB3aGV0aGVyIHdpbmRvdy5oY2FwdGNoYSBpcyBkZWZpbmVkIGJlY2F1c2VcbiAgICAvLyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIGNhbiBiZSBjYWxsZWQgYmVmb3JlIGhDYXB0Y2hhIGhhcyBiZWVuIGludGlhbGl6ZWQuXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgIXRoaXMudmFsdWUgJiYgd2luZG93LmhjYXB0Y2hhKSB7XG4gICAgICB3aW5kb3cuaGNhcHRjaGEucmVzZXQodGhpcy53aWRnZXRJZCk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB3aW5kb3cuaGNhcHRjaGEucmVzZXQodGhpcy53aWRnZXRJZCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cblxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbnNcblxuICAvKipcbiAgICogSXMgY2FsbGVkIHdoZW4gdGhlIHZlcmlmaWNhdGlvbiB3YXMgc3VjY2Vzc2Z1bFxuICAgKiBAcGFyYW0gcmVzcG9uc2UgVGhlIHZlcmlmaWNhdGlvbiB0b2tlblxuICAgKi9cbiAgcHJpdmF0ZSBvblZlcmlmeShyZXNwb25zZTogc3RyaW5nKSB7XG4gICAgdGhpcy52YWx1ZSA9IHJlc3BvbnNlO1xuICAgIHRoaXMudmVyaWZ5LmVtaXQocmVzcG9uc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIElzIGNhbGxlZCB3aGVuIHRoZSB2ZXJpZmljYXRpb24gaGFzIGV4cGlyZWRcbiAgICogQHBhcmFtIHJlc3BvbnNlIFRoZSB2ZXJpZmljYXRpb24gcmVzcG9uc2VcbiAgICovXG4gIHByaXZhdGUgb25FeHBpcmVkKHJlc3BvbnNlOiBhbnkpIHtcbiAgICB0aGlzLmV4cGlyZWQuZW1pdChyZXNwb25zZSk7XG4gIH1cblxuICAvKipcbiAgICogSXMgY2FsbGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzIGR1cmluZyB0aGUgdmVyaWZpY2F0aW9uIHByb2Nlc3NcbiAgICogQHBhcmFtIGVycm9yIFRoZSBlcnJvciByZXR1cm5lZCBieSBoQ2FwdGNoYVxuICAgKi9cbiAgcHJpdmF0ZSBvbkVycm9yKGVycm9yOiBhbnkpIHtcbiAgICB0aGlzLmVycm9yLmVtaXQoZXJyb3IpO1xuICB9XG59XG4iXX0=