import React from 'react';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";
import packagejson from '../package.json'

try {
    const browserHistory = createBrowserHistory({ basename: 'React App' });
    var reactPlugin = new ReactPlugin();
    var appInsights = new ApplicationInsights({
        config: {
            connectionString: packagejson.autopilot.appinsights,
            extensions: [reactPlugin],
            extensionConfig: {
                [reactPlugin.identifier]: { history: browserHistory }
            }
        }
    });
    appInsights.loadAppInsights();
    appInsights.trackEvent({ name: "App Visited" }, getCustomProperties(packagejson.autopilot.telemetry))
}
catch {
    console.log("Cannot upload telemetry")
}

function getCustomProperties(autopilotInfo) {
    return autopilotInfo = { ...autopilotInfo, url: window.location.href, hostname: window.location.hostname }
}