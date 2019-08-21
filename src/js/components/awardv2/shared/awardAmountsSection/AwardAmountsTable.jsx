import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    awardType: PropTypes.oneOf(['contract', 'idv', 'grant']),
    amountMapByCategoryTitle: PropTypes.shape({})
};

const AwardAmountsTable = ({
    amountMapByCategoryTitle
}) => (
    <div className="award-amounts__data-wrapper">
        {Object.keys(amountMapByCategoryTitle).map((title) => (
            <div className="award-amounts__data-content">
                <div><span className="award-amounts__data-icon award-amounts__data-icon_blue" />{title}</div>
                <span>{amountMapByCategoryTitle[title]}</span>
            </div>
        ))}
    </div>
);

AwardAmountsTable.propTypes = propTypes;
export default AwardAmountsTable;
