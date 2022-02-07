import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { LoadingMessage, SectionTitle } from 'data-transparency-ui';

const propTypes = {
    section: PropTypes.shape({
        name: PropTypes.string.isRequired,
        display: PropTypes.string.isRequired
    }),
    icon: PropTypes.string,
    children: PropTypes.element,
    isLoading: PropTypes.bool,
    dataThroughDate: PropTypes.string
};

const AgencySection = ({
    section,
    icon = "chart-area",
    children,
    isLoading,
    dataThroughDate
}) => {
    let dataThroughNote;
    if (dataThroughDate) {
        if (dataThroughDate === 'no data') {
            dataThroughNote = 'No data available for the selected fiscal year';
        }
        else {
            dataThroughNote = `Data through ${moment(dataThroughDate).format('M/D/YYYY')}`;
        }
    }

    return (
        <SectionTitle
            id={`agency-v2-${section.name}`}
            icon={<FontAwesomeIcon size="2x" icon={icon} />}
            title={section.display}
            isCollapsible >
            {dataThroughNote ? <div className="section__date-note">{dataThroughNote}</div> : null}
            {isLoading ? <LoadingMessage /> : children}
        </SectionTitle>);
};

AgencySection.propTypes = propTypes;
export default AgencySection;
