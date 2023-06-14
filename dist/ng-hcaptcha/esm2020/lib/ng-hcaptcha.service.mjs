import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { loadHCaptcha } from "./hcaptcha-utils";
import { CAPTCHA_CONFIG } from "./ng-hcaptcha-config";
import * as i0 from "@angular/core";
export class NgHcaptchaService {
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
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [CAPTCHA_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaGNhcHRjaGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWhjYXB0Y2hhL3NyYy9saWIvbmctaGNhcHRjaGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQWlCLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUtyRSxNQUFNLE9BQU8saUJBQWlCO0lBSzFCLFlBQTRDLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUksQ0FBQztJQUU3RSxNQUFNO1FBQ0YsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFVBQTJCLEVBQUUsRUFBRTtZQUNsRCxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUN6RCxVQUFVLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDbkIsMEJBQTBCO29CQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTt3QkFDdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7cUJBQ25EO29CQUVELDRDQUE0QztvQkFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDeEIscUJBQXFCO3dCQUNyQixNQUFNLE9BQU8sR0FBRzs0QkFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzRCQUNuQyxJQUFJLEVBQUUsV0FBVzs0QkFDakIsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0NBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDckIsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3pCLENBQUM7NEJBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQ0FDeEIsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUN6QixDQUFDOzRCQUNELGdCQUFnQixFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0NBQ3RCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDekIsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3FCQUNqRjtvQkFFRCwrQkFBK0I7b0JBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sYUFBYTtRQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7OzhHQW5EUSxpQkFBaUIsa0JBS04sY0FBYztrSEFMekIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFVBQVU7OzBCQU1NLE1BQU07MkJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpYmVyIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IGxvYWRIQ2FwdGNoYSB9IGZyb20gXCIuL2hjYXB0Y2hhLXV0aWxzXCI7XG5pbXBvcnQgeyBDYXB0Y2hhQ29uZmlnLCBDQVBUQ0hBX0NPTkZJRyB9IGZyb20gXCIuL25nLWhjYXB0Y2hhLWNvbmZpZ1wiO1xuXG5kZWNsYXJlIGNvbnN0IHdpbmRvdzogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdIY2FwdGNoYVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBoQ2FwdGNoYUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgaENhcHRjaGFXaWRnZXRJZDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChDQVBUQ0hBX0NPTkZJRykgcHJpdmF0ZSBjYXB0Y2hhQ29uZmlnOiBDYXB0Y2hhQ29uZmlnKSB7IH1cblxuICAgIHZlcmlmeSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8YW55PikgPT4ge1xuICAgICAgICAgICAgbG9hZEhDYXB0Y2hhKHRoaXMuY2FwdGNoYUNvbmZpZy5sYW5ndWFnZUNvZGUpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoY29udGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgaENhcHRjaGEgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaENhcHRjaGFFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhDYXB0Y2hhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmhDYXB0Y2hhRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBSZW5kZXIgaENhcHRjaGEgdXNpbmcgdGhlIGRlZmluZWQgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaENhcHRjaGFXaWRnZXRJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29uZmlndXJlIGhDYXB0Y2hhXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVrZXk6IHRoaXMuY2FwdGNoYUNvbmZpZy5zaXRlS2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6ICdpbnZpc2libGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRIY2FwdGNoYSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V4cGlyZWQtY2FsbGJhY2snOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEhjYXB0Y2hhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZXJyb3ItY2FsbGJhY2snOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEhjYXB0Y2hhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhDYXB0Y2hhV2lkZ2V0SWQgPSB3aW5kb3cuaGNhcHRjaGEucmVuZGVyKHRoaXMuaENhcHRjaGFFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEltbWVkaWF0ZWx5IGV4ZWN1dGUgaENhcHRjaGFcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmhjYXB0Y2hhLmV4ZWN1dGUodGhpcy5oQ2FwdGNoYVdpZGdldElkKTtcbiAgICAgICAgICAgICAgICB9LCA1MCwgdGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldEhjYXB0Y2hhKCkge1xuICAgICAgICB3aW5kb3cuaGNhcHRjaGEucmVtb3ZlKHRoaXMuaENhcHRjaGFXaWRnZXRJZCk7XG4gICAgICAgIHRoaXMuaENhcHRjaGFFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5oQ2FwdGNoYVdpZGdldElkID0gbnVsbDtcbiAgICB9XG5cbn1cbiJdfQ==