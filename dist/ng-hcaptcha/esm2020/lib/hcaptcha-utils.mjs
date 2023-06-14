import { ɵɵtrustConstantResourceUrl, } from "@angular/core";
import { Observable } from "rxjs";
/**
 * Load the hCaptcha script by appending a script element to the head element.
 * The script won't be loaded again if it has already been loaded.
 * Async and defer are set to prevent blocking the renderer while loading hCaptcha.
 */
export function loadHCaptcha(languageCode, renderer) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGNhcHRjaGEtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1oY2FwdGNoYS9zcmMvbGliL2hjYXB0Y2hhLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCwwQkFBMEIsR0FDM0IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUk5Qzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FDMUIsWUFBcUIsRUFDckIsUUFBb0I7SUFFcEIsT0FBTyxJQUFJLFVBQVUsQ0FBTyxDQUFDLFFBQTBCLEVBQUUsRUFBRTtRQUN6RCx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU87U0FDUjtRQUVELDhDQUE4QztRQUM5QyxJQUFJLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxXQUFXLEVBQUU7WUFDMUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixPQUFPO1NBQ1I7UUFFRCxJQUFJLEdBQUcsR0FBRywrQ0FBK0MsQ0FBQztRQUUxRCxvQkFBb0I7UUFDcEIsSUFBSSxZQUFZLEVBQUU7WUFDaEIsR0FBRyxJQUFJLE9BQU8sWUFBWSxFQUFFLENBQUM7U0FDOUI7UUFFRCwyQkFBMkI7UUFDM0IsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQVEsQ0FBQztRQUNqQyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEIsNENBQTRDO1FBQzVDLE1BQU0sZ0JBQWdCLEdBQUcsMEJBQTBCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFakUsMEJBQTBCO1FBQzFCLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkQsbUVBQW1FO1FBQ25FLGFBQWEsQ0FBQyxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7UUFDckMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDM0IsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDM0IsYUFBYSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxhQUFhLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUMxQixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQztRQUVGLGlEQUFpRDtRQUNqRCxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUmVuZGVyZXIyLFxuICDJtWJ5cGFzc1Nhbml0aXphdGlvblRydXN0VXJsLFxuICDJtcm1dHJ1c3RDb25zdGFudFJlc291cmNlVXJsLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJlciB9IGZyb20gXCJyeGpzXCI7XG5cbmRlY2xhcmUgY29uc3Qgd2luZG93OiBhbnk7XG5cbi8qKlxuICogTG9hZCB0aGUgaENhcHRjaGEgc2NyaXB0IGJ5IGFwcGVuZGluZyBhIHNjcmlwdCBlbGVtZW50IHRvIHRoZSBoZWFkIGVsZW1lbnQuXG4gKiBUaGUgc2NyaXB0IHdvbid0IGJlIGxvYWRlZCBhZ2FpbiBpZiBpdCBoYXMgYWxyZWFkeSBiZWVuIGxvYWRlZC5cbiAqIEFzeW5jIGFuZCBkZWZlciBhcmUgc2V0IHRvIHByZXZlbnQgYmxvY2tpbmcgdGhlIHJlbmRlcmVyIHdoaWxlIGxvYWRpbmcgaENhcHRjaGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSENhcHRjaGEoXG4gIGxhbmd1YWdlQ29kZT86IHN0cmluZyxcbiAgcmVuZGVyZXI/OiBSZW5kZXJlcjJcbik6IE9ic2VydmFibGU8dm9pZD4ge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGU8dm9pZD4oKG9ic2VydmVyOiBTdWJzY3JpYmVyPHZvaWQ+KSA9PiB7XG4gICAgLy8gTm8gd2luZG93IG9iamVjdCAoc3NyKVxuICAgIGlmICghd2luZG93KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhlIGhDYXB0Y2hhIHNjcmlwdCBoYXMgYWxyZWFkeSBiZWVuIGxvYWRlZFxuICAgIGlmICh0eXBlb2Ygd2luZG93LmhjYXB0Y2hhICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvYnNlcnZlci5uZXh0KCk7XG4gICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzcmMgPSBcImh0dHBzOi8vaGNhcHRjaGEuY29tLzEvYXBpLmpzP3JlbmRlcj1leHBsaWNpdFwiO1xuXG4gICAgLy8gU2V0IGxhbmd1YWdlIGNvZGVcbiAgICBpZiAobGFuZ3VhZ2VDb2RlKSB7XG4gICAgICBzcmMgKz0gYCZobD0ke2xhbmd1YWdlQ29kZX1gO1xuICAgIH1cblxuICAgIC8vIFNldHVwIG1vY2sgVGVtcGxhdGVBcnJheVxuICAgIGNvbnN0IHN0cmluZ0FycmF5ID0gW3NyY10gYXMgYW55O1xuICAgIHN0cmluZ0FycmF5LnJhdyA9IFtzcmNdO1xuXG4gICAgLy8gQ3JlYXRlIGEgdHJ1c3RlZCBVUkwgZnJvbSB5b3VyIHNjcmlwdCBVUkxcbiAgICBjb25zdCB0cnVzdGVkU2NyaXB0VVJMID0gybXJtXRydXN0Q29uc3RhbnRSZXNvdXJjZVVybChzdHJpbmdBcnJheSk7XG5cbiAgICAvLyBDcmVhdGUgYSBzY3JpcHQgZWxlbWVudFxuICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXG4gICAgLy8gU2V0IHRoZSAnc3JjJyBhdHRyaWJ1dGUgb2YgdGhlIHNjcmlwdCBlbGVtZW50IHRvIHRoZSB0cnVzdGVkIFVSTFxuICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gdHJ1c3RlZFNjcmlwdFVSTDtcbiAgICBzY3JpcHRFbGVtZW50LmRlZmVyID0gdHJ1ZTtcbiAgICBzY3JpcHRFbGVtZW50LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHRFbGVtZW50Lm9uZXJyb3IgPSAoZSkgPT4gb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgc2NyaXB0RWxlbWVudC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KCk7XG4gICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH07XG5cbiAgICAvLyBBcHBlbmQgdGhlIHNjcmlwdCBlbGVtZW50IHRvIHRoZSBkb2N1bWVudCBoZWFkXG4gICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaGVhZCwgc2NyaXB0RWxlbWVudCk7XG4gIH0pO1xufVxuIl19