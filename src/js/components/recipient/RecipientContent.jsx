/**
 * RecipientContent.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import RecipientTimeVisualizationSectionContainer from 'containers/recipient/RecipientTimeVisualizationSectionContainer';
import TopFiveSection from './topFive/TopFiveSection';
import RecipientOverview from './RecipientOverview';

const propTypes = {
    recipient: PropTypes.object,
    pickedFy: PropTypes.func,
    showChildRecipientModal: PropTypes.func,
    showAlternateNamesRecipientModal: PropTypes.func
};

const RecipientContent = ({
    recipient,
    showChildRecipientModal,
    showAlternateNamesRecipientModal
}) => (
    <div className="recipient-content-wrapper">
        <div className="recipient-content">
            <RecipientOverview
                showChildRecipientModal={showChildRecipientModal}
                showAlternateNamesRecipientModal={showAlternateNamesRecipientModal}
                recipient={recipient} />
            <RecipientTimeVisualizationSectionContainer
                recipient={recipient} />
            <TopFiveSection />
        </div>
    </div>
);

RecipientContent.propTypes = propTypes;

export default RecipientContent;
