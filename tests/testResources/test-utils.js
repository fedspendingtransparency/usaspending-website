/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Routes } from 'react-router-dom';

// Import your own reducer
import reducer from "../../src/js/redux/reducers/index";

function render(
    ui,
    {
        initialState,
        store = createStore(reducer, initialState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        console.log("children", children);
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <Routes>
                        {children}
                    </Routes>
                </Provider>
            </BrowserRouter>
        );
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
