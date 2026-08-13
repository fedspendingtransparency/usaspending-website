import React from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QAT } from "GlobalConstants";
import { NATURAL_LANGUAGE, FILTERS } from './SidebarConstants';
import NLBadge from "../NLBadge";

const cyan60v = '#00687D';
const cyan50v = '#0081A1';
const colorWhite = '#FFF';

const propTypes = {
    sidebarContent: PropTypes.string,
    setSidebarContent: PropTypes.func,
    sidebarIsOpen: PropTypes.bool,
    setSidebarIsOpen: PropTypes.func,
    isMedium: PropTypes.bool
};

/* eslint-disable max-len */
const NLSidebarButtons = ({ sidebarContent, setSidebarIsOpen, sidebarIsOpen, setSidebarContent, isMedium }) => {
    if (isMedium || !QAT) return;

    // icon and button colors
    const primaryColorNL = sidebarContent === 'natural language' && sidebarIsOpen ? cyan50v : colorWhite;
    const secondaryColorNL = sidebarContent === 'natural language' && sidebarIsOpen ? colorWhite : 'transparent';
    const primaryColorAS = sidebarContent === 'filters' && sidebarIsOpen ? cyan50v : colorWhite;
    const secondaryColorAS = sidebarContent === 'filters' && sidebarIsOpen ? colorWhite : 'transparent';

    return (
        <div className={"sidebar-nl-buttons-container"}>
            <div className={`color-overlay-element ${sidebarContent === 'natural language' ? ' gradient' : ''
            }`} />
            <button
                style={{ backgroundColor: secondaryColorAS }}
                aria-label="Button to change the content of the sidebar to advanced search filters"
                className={`sidebar-nl-buttons ${sidebarContent === 'filters' && sidebarIsOpen  ? 'selected' : ''
                }`}
                onClick={(e) => {
                    setSidebarContent('filters');
                    sidebarIsOpen ? null : setSidebarIsOpen(e);
                }}>
                <NLBadge />
                <FontAwesomeIcon icon="filter-list" color={primaryColorAS} />
            </button>
            <button
                style={{ backgroundColor: secondaryColorNL }}
                aria-label="Button to change the content of the sidebar to natural language search"
                className={`sidebar-nl-buttons ${sidebarContent === 'natural language' && sidebarIsOpen ? 'selected' : ''
                }`}
                onClick={(e) => {
                    setSidebarContent('natural language');
                    sidebarIsOpen ? console.log(sidebarIsOpen) : setSidebarIsOpen(e);
                }
                }>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={secondaryColorNL} xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.1331 3.06836C10.4348 3.06836 10.7252 3.08021 11.0149 3.11719L9.85571 5.62012C6.85045 5.76811 4.49648 8.17109 4.49634 11.3633C4.49634 14.5556 6.99524 17.1074 10.1213 17.1074C13.0784 17.1074 15.4804 14.8272 15.7219 11.8691L18.2083 10.6729C18.2444 10.8946 18.2444 11.1292 18.2444 11.3633C18.2444 13.1998 17.6654 14.8767 16.6877 16.2695L21.6487 21.2979V21.3105C22.1192 21.8282 22.1193 22.6299 21.6487 23.1475C21.1418 23.6281 20.3568 23.628 19.8499 23.1475L14.925 18.0811C13.5612 19.0671 11.9197 19.6709 10.1213 19.6709C5.63135 19.6709 1.99833 15.9735 1.99829 11.376C1.99829 6.77858 5.63114 3.06859 10.1331 3.06836Z"
                        fill={primaryColorNL} />
                    <path fillRule="evenodd" clipRule="evenodd"
                        d="M12.9221 2.98242C13.0909 2.98263 13.2596 3.09344 13.344 3.24121L13.6819 3.99316L14.8411 6.59375C17.1702 7.69059 17.2188 7.69069 18.0999 8.12207C18.2445 8.18374 18.3527 8.35595 18.3528 8.52832C18.3528 8.70082 18.2446 8.87365 18.0999 8.95996L14.8411 10.4883C13.7668 12.8672 13.7423 12.9166 13.344 13.8164C13.2596 13.9642 13.0909 14.075 12.9221 14.0752C12.7532 14.0752 12.5841 13.9643 12.5237 13.8164C12.3547 13.4343 12.2461 13.1751 12.1858 13.0889V13.0645L11.0022 10.4883L8.47974 9.28027C8.37097 9.21862 8.10527 9.10777 7.74341 8.95996C7.59866 8.87364 7.49048 8.70081 7.49048 8.52832C7.49061 8.35596 7.59878 8.18375 7.74341 8.12207C8.11758 7.94951 8.37111 7.838 8.47974 7.77637L11.0022 6.56836H10.9905C11.0069 6.53278 12.1282 4.09786 12.5237 3.24121C12.584 3.0933 12.7531 2.98242 12.9221 2.98242ZM12.2581 7.16016C12.1132 7.48063 11.8833 7.70268 11.6057 7.85059L10.1096 8.54102L11.5823 9.23145C11.8959 9.36706 12.1133 9.60155 12.2581 9.92188L12.9338 11.4248L13.6096 9.92188C13.7424 9.60148 13.9717 9.37936 14.2854 9.23145L15.7581 8.54102L14.2854 7.85059C13.9718 7.70273 13.7544 7.46884 13.6096 7.18555L12.9338 5.65625L12.2581 7.16016Z"
                        fill={primaryColorNL} />
                    <path
                        d="M18.3528 0.492188C18.4976 0.492188 18.6069 0.578521 18.6672 0.689453L19.2581 2.34082L20.8762 2.94531C20.9846 3.00699 21.0686 3.11792 21.0686 3.26562C21.0686 3.41331 20.9847 3.52429 20.8762 3.58594L19.2581 4.18945L18.6672 5.8418C18.6069 5.95271 18.4976 6.03906 18.3528 6.03906C18.2082 6.03892 18.0996 5.95257 18.0393 5.8418L17.4475 4.18945L15.8665 3.58594C15.7218 3.52431 15.637 3.41339 15.637 3.26562C15.637 3.11783 15.7218 3.00697 15.8665 2.94531L17.4475 2.34082L18.0393 0.689453C18.0996 0.578614 18.2081 0.492333 18.3528 0.492188Z"
                        fill={primaryColorNL} />
                </svg>
            </button>
        </div>
    );
};

NLSidebarButtons.propTypes = propTypes;
export default NLSidebarButtons;
