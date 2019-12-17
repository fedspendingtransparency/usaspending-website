import React from 'react';

import { AWARD_SECTION_PROPS } from "../../../propTypes/index";

const classMap = {
    row: "award__row",
    column: "award__col"
};

const AwardSection = ({
    id,
    type,
    className = "",
    children
}) => (
    <div id={id} className={`${classMap[type]} ${className}`}>
        {children}
    </div>
);

AwardSection.propTypes = AWARD_SECTION_PROPS;
export default AwardSection;
