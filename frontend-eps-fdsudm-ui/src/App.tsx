import { useEffect, useState } from "react";

import "./App.css";
import Home from "./features/home";

// import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const App = () => {
  // Azure Application Insight Implementations
  // Please follow this instuction https://github.com/ExxonMobil/web-template/wiki/Other-implementations
  // or remove this section if you don't need it.
  // const appInsights = new ApplicationInsights({
  //   config: {
  //     connectionString: import.meta.env.VITE_APPINSIGHT_CONNECTIONSTRING,
  //     enableAutoRouteTracking: true,
  //   },
  // });
  // appInsights.loadAppInsights();

  
  return (
      <Home></Home>
  );
};

export default App;