import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class SegmentAnalytics {
  initializeAnalytics: any = !function() {
    const analytics = (<any>window).analytics =  (<any>window).analytics || [];
    if (!analytics.initialize) {
      if(analytics.invoked) {
        window.console && console.error && console.error('Segment snippet included twice.');
      }
      else {
        analytics.invoked = !0;
        analytics.methods = [
          'trackSubmit',
          'trackClick',
          'trackLink',
          'trackForm',
          'pageview',
          'identify',
          'reset',
          'group',
          'track',
          'ready',
          'alias',
          'debug',
          'page',
          'once',
          'off',
          'on'
        ];
        analytics.factory = (method) => {
          return function() {
            const routes = Array.prototype.slice.call(arguments);
            routes.unshift(method);
            analytics.push(routes);
            return analytics;
          }
        };
        analytics.methods.forEach(method => {
          analytics[method] = analytics.factory(method);
        });
        analytics.load = function(api_key) {
          const element = document.createElement('script');
          element.type = 'text/javascript';
          element.async = !0;
          element.src = `${'https:' === document.location.protocol ? 'https://' : 'http://'}cdn.segment.com/analytics.js/v1/${api_key}/analytics.min.js`;
          const firstScript  = document.getElementsByTagName('script')[0];
          firstScript.parentNode.insertBefore(element, firstScript)
        };
        analytics.SNIPPET_VERSION='4.0.0';
        analytics.load(environment.segmentAPIKey);
        analytics.page();
      }
    }
  }();
}
