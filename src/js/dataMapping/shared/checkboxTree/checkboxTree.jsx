import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// default icons
export const treeIcons = {
    check: (<FontAwesomeIcon
        className="rct-icon rct-icon-check"
        size="lg"
        icon="check-square" />),
    uncheck: (<FontAwesomeIcon
        className="rct-icon rct-icon-uncheck"
        size="lg"
        icon="square" />),
    halfCheck: (<FontAwesomeIcon
        className="rct-icon rct-icon-half-check"
        size="lg"
        icon="minus-square" />),
    expandClose: (<FontAwesomeIcon
        className="rct-icon rct-icon-expand-close"
        size="lg"
        icon="angle-right" />),
    expandOpen: (<FontAwesomeIcon
        className="rct-icon rct-icon-expand-open"
        size="lg"
        icon="angle-down" />),
    expandAll: null,
    collapseAll: null,
    parentClose: null,
    parentOpen: null,
    leaf: null
};
