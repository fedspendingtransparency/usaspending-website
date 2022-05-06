import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// default icons
// eslint-disable-next-line import/prefer-default-export
export const treeIcons = {
    check: (<FontAwesomeIcon
        tabIndex={0}
        className="rct-icon rct-icon-check"
        size="lg"
        icon="check-square" />),
    uncheck: (<FontAwesomeIcon
        tabIndex={0}
        className="rct-icon rct-icon-uncheck"
        size="lg"
        icon="square" />),
    halfCheck: (<FontAwesomeIcon
        tabIndex={0}
        className="rct-icon rct-icon-half-check"
        size="lg"
        icon="minus-square" />),
    expandClose: (<FontAwesomeIcon
        tabIndex={0}
        className="rct-icon rct-icon-expand-close"
        size="lg"
        icon="angle-right" />),
    expandOpen: (<FontAwesomeIcon
        tabIndex={0}
        className="rct-icon rct-icon-expand-open"
        size="lg"
        icon="angle-down" />),
    expandAll: null,
    collapseAll: null,
    parentClose: null,
    parentOpen: null,
    leaf: null
};

export const checkboxTreeFilters = [
    'defCodes',
    'pscCodes',
    'naicsCodes',
    'tasCodes'
];
