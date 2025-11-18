import React from "react";
import { SectionHeader } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const propTypes = { sectionHrRef: PropTypes.object };

const RecipientTimeVisualizationSectionHeader = ({ sectionHrRef }) => (
    <>
        <SectionHeader
            icon={<FontAwesomeIcon icon="chart-bar" size="2x" />}
            title="Transactions Over Time"
            titleTooltip={{ component: false }}
            descTooltip={{ component: false }} />
        <hr
            className="results-divider"
            ref={sectionHrRef} />
        <div className="recipient-section__description">
            This graph shows trends over time for all transactions to this recipient.
            Hover over the bars for more detailed information.
        </div>
    </>
);

RecipientTimeVisualizationSectionHeader.propTypes = propTypes;
export default RecipientTimeVisualizationSectionHeader;
