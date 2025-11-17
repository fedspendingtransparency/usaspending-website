/**
 * RecipientTimeVisualizationSection.jsx
 * Created by Lizzie Salita 7/6/18
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash-es';
import { FlexGridRow } from "data-transparency-ui";

import RecipientTimeVisualization from './RecipientTimeVisualization';
import RecipientTimeVisualizationSectionHeader from "./RecipientTimeVisualizationSectionHeader";
import RecipientTimeVisualizationSectionButtons from "./RecipientTimeVisualizationSectionButtons";

const propTypes = {
    data: PropTypes.object,
    visualizationPeriod: PropTypes.string,
    updateVisualizationPeriod: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.bool
};

const RecipientTimeVisualizationSection = ({
    data, visualizationPeriod, updateVisualizationPeriod, loading, error
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const sectionHrRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;

            if (windowWidth !== newWidth && isMounted) {
                setWindowWidth(newWidth);
            }
        }, 50);

        window.addEventListener('resize', handleResize);

        return () => {
            isMounted = false;
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    return (
        <FlexGridRow
            id="recipient-transactions-over-time"
            className="recipient-section transactions-over-time">
            <RecipientTimeVisualizationSectionHeader sectionHrRef={sectionHrRef} />
            <RecipientTimeVisualizationSectionButtons
                visualizationPeriod={visualizationPeriod}
                updateVisualizationPeriod={updateVisualizationPeriod} />
            <RecipientTimeVisualization
                visualizationPeriod={visualizationPeriod}
                loading={loading}
                error={error}
                data={data}
                width={sectionHrRef.current?.offsetWidth}
                color="#141D3B" />
        </FlexGridRow>
    );
};

RecipientTimeVisualizationSection.propTypes = propTypes;
export default RecipientTimeVisualizationSection;
