/**
 * ExplorerDetailPage.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { useState } from 'react';
import DetailContentContainer from 'containers/explorer/detail/DetailContentContainer';
import ExplorerWrapperPage from '../ExplorerWrapperPage';
import ExplorerTooltip from './visualization/ExplorerTooltip';
import ExplorerAwardTooltip from './visualization/ExplorerAwardTooltip';

const ExplorerDetailPage = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltip, setTooltip] = useState({
        x: 0,
        y: 0,
        name: '',
        code: '',
        amount: 0,
        percent: 0,
        total: 0,
        isAward: false
    });

    const showTooltipFn = (position, data) => {
        setShowTooltip(true);
        setTooltip(Object.assign({}, position, data));
    };

    const hideTooltipFn = () => {
        setShowTooltip(false);
    };

    let tooltipUi = null;

    if (showTooltip) {
        tooltipUi = (<ExplorerTooltip
            {...tooltip} />);

        if (tooltip.isAward) {
            tooltipUi = (<ExplorerAwardTooltip
                {...tooltip} />);
        }
    }

    return (
        <ExplorerWrapperPage>
            <div className="explorer-detail-wrap">
                <DetailContentContainer
                    showTooltip={showTooltipFn}
                    hideTooltip={hideTooltipFn} />
                {tooltipUi}
            </div>
        </ExplorerWrapperPage>
    );
};

export default ExplorerDetailPage;
