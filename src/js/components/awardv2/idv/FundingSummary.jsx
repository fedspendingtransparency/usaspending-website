import React from 'react';
import { Pie } from '../../sharedComponents/icons/Icons';

const FundingSummary = () => (
    <div className="award__col award-viz">
        <div className="award-viz__heading">
            <div className="award-viz__icon">
                <Pie />
            </div>
            <h3 className="award-viz__title">Federal Account Funding</h3>
        </div>
        <hr />
        <p>Funding Details Table goes here</p>
    </div>
);

export default FundingSummary;
