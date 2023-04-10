/**
 * UnlinkedAwardWarning.jsx
 * Created by Brian Petway 07/07/2022
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import PropTypes from "prop-types";

const propTypes = {
    topMargin: PropTypes.bool,
    widerLayout: PropTypes.bool
};

const UnlinkedAwardWarning = ({ topMargin, widerLayout }) => (
    <section className={`unlinked-award-warning__wrapper ${topMargin ? "top-margin" : ""}`}>
        <FlexGridRow className="unlinked-award-warning__content">
            <FlexGridCol className={`unlinked-award-warning__column-one ${widerLayout ? "wider-layout" : ""}`} width={1} tablet={0.5}>
                <ExclamationTriangle />
            </FlexGridCol>
            <FlexGridCol className="unlinked-award-warning__column-two" width={11}>
                <div className="unlinked-award-warning__heading">
                    This award has not been linked to any federal account.
                </div>
            </FlexGridCol>
        </FlexGridRow>
    </section>
);

UnlinkedAwardWarning.propTypes = propTypes;
export default UnlinkedAwardWarning;
