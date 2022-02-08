import React from "react";
import GlossaryLink from "components/sharedComponents/GlossaryLink";
import { DUNS_LABEL } from "GlobalConstants";

/**
 * Create array of entity IDs (UEI and/or DUNS) formatted for Additional Information sections
 * @param {string} duns DUNS number (if any)
 * @param {string} uei UEI (if any)
 * @returns array of string(s) with value, label and glossary link
 */
export const idList = (duns, uei) => {
    const ids = [];
    if (uei) {
        ids.push(
            <>
                {uei} (UEI <GlossaryLink term="Unique Entity Identifier (UEI)" />)
            </>
        );
    }
    if (duns) {
        ids.push(
            <>
                {duns} ({DUNS_LABEL} <GlossaryLink term="duns" />)
            </>
        );
    }
    return ids;
};
