/**
 * OverviewContainer.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash-es';

import AmountsVisualization from 'components/covid19/amountsVisualization/AmountsVisualization';
import DateNote from 'components/covid19/DateNote';
import useCallbackRef from "../../hooks/useCallbackRef";

const propTypes = {
    publicLaw: PropTypes.string
};

const OverviewContainer = ({ publicLaw }) => {
    const overviewData = useSelector((state) => state.covid19.overview);
    const [visualizationsWidth, setVisualizationsWidth] = useState(0);

    const ref = useCallbackRef(throttle((entry) => setVisualizationsWidth(entry.contentRect.width), 50));

    return (
        <div ref={ref} className="body__content overview">
            <DateNote />
            <AmountsVisualization
                overviewData={overviewData}
                width={visualizationsWidth}
                publicLaw={publicLaw} />
        </div>
    );
};

OverviewContainer.propTypes = propTypes;
export default OverviewContainer;
