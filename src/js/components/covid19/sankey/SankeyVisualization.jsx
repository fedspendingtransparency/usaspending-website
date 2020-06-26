/**
 * SankeyContainer.jsx
 * Created By Jonathan Hill 06/04/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import Sankey from 'components/covid19/sankey/Sankey';
import { sankeyHeight } from 'dataMapping/covid19/covid19';

const propTypes = {
    defCodes: PropTypes.array,
    overview: PropTypes.object,
    width: PropTypes.number
};

const SankeyContainer = ({ defCodes, overview, width }) => (
    <div className="body__content covid19__sankey-container">
        <h3 className="body__narrative covid19__sankey-title">
              This is how the <strong>total spending</strong> was funded and spent.
        </h3>
        <p className="body__narrative-description covid19__sankey-sub-title">
            This Sankey diagram shows the flow of spending from specific funding
            sources (in this case, the different Public Laws that funded the COVID-19 Response)
            through to the money that has been paid out.
        </p>
        <Sankey defCodes={defCodes} overview={overview} height={sankeyHeight} width={width} />
        <div className="covid19__sankey-legend">
            <div className="covid19-sankey-legend__item">
                <div className="covid19-sankey-legend__item__circle covid19-sankey-legend__item__circle-budget-source" />
                <div className="covid19-sankey-legend__item-text">Budget Source</div>
            </div>
            <div className="covid19-sankey-legend__item">
                <div className="covid19-sankey-legend__item__circle covid19-sankey-legend__item__circle-total-budget" />
                <div className="covid19-sankey-legend__item-text">Total Budget</div>
            </div>
            <div className="covid19-sankey-legend__item">
                <div className="covid19-sankey-legend__item__circle covid19-sankey-legend__item__circle-obligated" />
                <div className="covid19-sankey-legend__item-text">Obligated Funds</div>
            </div>
            <div className="covid19-sankey-legend__item">
                <div className="covid19-sankey-legend__item__circle covid19-sankey-legend__item__circle-outlayed" />
                <div className="covid19-sankey-legend__item-text">Outlayed Funds</div>
            </div>
        </div>
    </div>
);

SankeyContainer.propTypes = propTypes;
export default SankeyContainer;
