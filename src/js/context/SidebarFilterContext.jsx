/**
 * SidebarFilterContext.jsx
 * Created on 4/1/2026 by JD House
 */

import PropTypes from "prop-types";
import React, { createContext, useContext, useReducer } from "react";

const SidebarFilterContext = createContext(null);

function reducer(state, action) {
    const title = action.payload;
    switch (action.type) {
        case 'toggle':
            return {
                ...state,
                [title]: !state[title]
            };
        case 'close':
            return {
                ...state,
                [title]: false
            };
        default:
            return state;
    }
}

const propTypes = {
    children: PropTypes.element
};

export function SidebarFilterProvider({ children }) {
    const [open, dispatch] = useReducer(reducer, {
        Location: false,
        "Time Period": true,
        "Award Description": false,
        "Award ID": false,
        "Spending Amount": false,
        "Award Type": false,
        "North American Industry Classification System (NAICS)": false,
        "Product and Service Code (PSC)": false,
        "Type of Contract Pricing": false,
        "Type of Set Aside": false,
        "Extent Competed": false,
        "Award Amount": false,
        "Assistance Listing": false,
        Recipient: false,
        "Recipient Type": false,
        Agency: false,
        "Treasury Account Symbol (TAS)": false,
        "Disaster Emergency Fund Code (DEFC)": false
    });

    return (
        <SidebarFilterContext.Provider value={{ open, dispatch }}>
            {children}
        </SidebarFilterContext.Provider>
    );
}

SidebarFilterProvider.propTypes = propTypes;

export const useSidebarObserver = () => useContext(SidebarFilterContext);
