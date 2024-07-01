/**
 * treemapHelper.js
 * Created by michaelbray on 6/8/17.
 */

export const treemapColors = [
    "#1b4956",
    "#1d545c",
    "#1d545c",
    "#1f5f63",
    "#216a69",
    "#227570",
    "#238076",
    "#238c7d",
    "#239884",
    "#32a387",
    "#48ae87",
    "#5aba87",
    "#6ac587",
    "#79d086",
    "#87dc85",
    "#95e784",
    "#a3f383"
];

export const alternateColors = [
    "rgba(28,73,86,0.3)",
    "rgba(22,100,108,0.3)",
    "rgba(18,129,124,0.3)",
    "rgba(18,129,124,0.3)",
    "rgba(18,129,124,0.3)",
    "rgba(32,158,135,0.3)",
    "rgba(70,187,140,0.3)",
    "rgba(70,187,140,0.3)",
    "rgba(70,187,140,0.3)",
    "rgba(70,187,140,0.3)",
    "rgba(70,187,140,0.3)",
    "rgba(112,215,139,0.3)",
    "rgba(162,243,132,0.3)",
    "rgba(162,243,132,0.3)",
    "rgba(162,243,132,0.3)",
    "rgba(162,243,132,0.3)",
    "rgba(162,243,132,0.3)"
];

export const tooltipStyles = {
    defaultStyle: {
        textColor: "#FFFFFF"
    },
    highlightedStyle: {
        color: "#F2B733",
        textColor: "#212121"
    }
};

export const stateTreemapColorsNoToggle = [
    // "#053547", // direct payments
    // "#325566", // grants
    // "#587786", // contracts
    // "#7E9BA8", // other financial assistance
    // "#A6C2CB" // loans

    "#0e4f5c", // direct payments, $cyan-70v
    "#00687d", // grants, $cyan-60v
    "#0081a1", // contracts, $cyan-50v
    "#009ec1", // other, $cyan-40v
    "#00BDE3" // loans, $cyan-30v
];

export const stateTreemapColorsWithToggle = [
    "#0f6460", // direct payments, $mint-cool-60v
    "#008480", // grants, $mint-cool-50v
    "#00a398", // contracts, $mint-cool-40v
    "#1dc2ae", // other, $mint-cool-30v
    "#29e1cb" // loans, $mint-cool-20v
];

export const stateTooltipStyles = {
    defaultStyle: {
        textColor: "#FFFFFF"
    },
    highlightedStyle: {
        color: "#F2B733",
        textColor: "#212121"
    }
};
