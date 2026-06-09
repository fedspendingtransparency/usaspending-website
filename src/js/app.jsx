import React from 'react';
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppContainer from 'containers/AppContainer';
import registerIcons from './registerIcons';

/*
  babel 7 removed the ECMAScript proposals from babel-polyfill.
  See link here for this implementation: https://babeljs.io/docs/en/v7-migration
  Also using the transform-runtime plugin for the test env.
*/
require("core-js");
require('helpers/rafPolyfill');

console.log("=== APP.JSX DEBUG START ===");

try {
    console.log("1. About to register icons");
    registerIcons();
    console.log("2. Icons registered");

    console.log("3. About to create QueryClient");
    const queryClient = new QueryClient();
    console.log("4. QueryClient created:", queryClient);

    console.log("5. Getting app div");
    const appDiv = document.getElementById("app");
    console.log("6. App div found:", appDiv);

    console.log("7. Creating root");
    const root = createRoot(appDiv);
    console.log("8. Root created:", root);

    console.log("9. About to render AppContainer");
    const App = root.render(
        <QueryClientProvider client={queryClient}>
            <AppContainer />
        </QueryClientProvider>
    );
    console.log("10. Render called successfully");
    console.log("=== APP.JSX DEBUG END ===");
} catch (error) {
    console.error("=== ERROR IN APP.JSX ===", error);
    console.error("Error stack:", error.stack);
}

export default App;
