import { NgModule } from '@angular/core';
import { NgHcaptchaComponent } from './ng-hcaptcha.component';
import { CAPTCHA_CONFIG } from './ng-hcaptcha-config';
import { NgHcaptchaInvisibleButtonDirective } from './ng-hcaptcha-invisible-button.directive';
import { NgHcaptchaService } from './ng-hcaptcha.service';
import * as i0 from "@angular/core";
export class NgHcaptchaModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaGNhcHRjaGEubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctaGNhcHRjaGEvc3JjL2xpYi9uZy1oY2FwdGNoYS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBaUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM5RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFPMUQsTUFBTSxPQUFPLGdCQUFnQjtJQUUzQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXNCO1FBQ25DLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRTtnQkFDVCxpQkFBaUI7Z0JBQ2pCO29CQUNFLE9BQU8sRUFBRSxjQUFjO29CQUN2QixRQUFRLEVBQUUsTUFBTSxJQUFJLEVBQUU7aUJBQ3ZCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7NkdBYlUsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsaUJBSFosbUJBQW1CLEVBQUUsa0NBQWtDLGFBQzVELG1CQUFtQixFQUFFLGtDQUFrQzs4R0FFdEQsZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBTDVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsa0NBQWtDLENBQUM7b0JBQ3ZFLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLGtDQUFrQyxDQUFDO2lCQUNuRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0hjYXB0Y2hhQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1oY2FwdGNoYS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ0FQVENIQV9DT05GSUcsIENhcHRjaGFDb25maWcgfSBmcm9tICcuL25nLWhjYXB0Y2hhLWNvbmZpZyc7XG5pbXBvcnQgeyBOZ0hjYXB0Y2hhSW52aXNpYmxlQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9uZy1oY2FwdGNoYS1pbnZpc2libGUtYnV0dG9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOZ0hjYXB0Y2hhU2VydmljZSB9IGZyb20gJy4vbmctaGNhcHRjaGEuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ0hjYXB0Y2hhQ29tcG9uZW50LCBOZ0hjYXB0Y2hhSW52aXNpYmxlQnV0dG9uRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW05nSGNhcHRjaGFDb21wb25lbnQsIE5nSGNhcHRjaGFJbnZpc2libGVCdXR0b25EaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0hjYXB0Y2hhTW9kdWxlIHtcblxuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBDYXB0Y2hhQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ0hjYXB0Y2hhTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ0hjYXB0Y2hhTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE5nSGNhcHRjaGFTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQ0FQVENIQV9DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZyB8fCBbXVxuICAgICAgICB9LFxuICAgICAgXVxuICAgIH07XG4gIH1cblxufVxuIl19