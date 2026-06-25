import React from 'react';
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppContainer from 'containers/AppContainer';
import registerIcons from './registerIcons';

/**
 * babel 7 removed the ECMAScript proposals from babel-polyfill.
 * See link here for this implementation: https://babeljs.io/docs/en/v7-migration
 * Also using the transform-runtime plugin for the test env.
*/
require("core-js");
require('helpers/rafPolyfill');

registerIcons();

// Create a QueryClient instance
const queryClient = new QueryClient();

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
const App = root.render(
    <QueryClientProvider client={queryClient}>
        <AppContainer />
    </QueryClientProvider>
);
export default App;
