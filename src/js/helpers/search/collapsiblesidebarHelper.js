/**
 * collapsibleSidebarHelper.jsx
 * Created by Andrea Blackwell 01/14/2025
 **/


export const sideBarXlDesktopWidth = 332;
export const sideBarDesktopWidth = 282;

export const panelContainerElClasses = [
    {
        className: "collapsible-sidebar",
        display: "flex"
    },
    {
        className: "sidebar-bottom-submit",
        display: "block"
    },
    {
        className: "collapsible-sidebar--toggle",
        display: "flex"
    }
];

export const checkInView = (el) => {
    const bbox = el.getBoundingClientRect();

    const intersection = {
        top: Math.max(0, bbox.top),
        left: Math.max(0, bbox.left),
        bottom: Math.min(window.innerHeight, bbox.bottom),
        right: Math.min(window.innerWidth, bbox.right)
    };

    return (intersection.bottom - intersection.top);
};

