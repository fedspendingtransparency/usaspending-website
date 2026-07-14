/**
 * AccountRankVisualizationSection.jsx
 * Created by Kevin Li 3/22/17
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle, min } from 'lodash-es';
import { SectionHeader } from "data-transparency-ui";
import * as Icons from 'components/sharedComponents/icons/Icons';

import RankVisualization from './RankVisualization';
import RankVisualizationScopeButton from
    './RankVisualizationScopeButton';

const propTypes = {
    labelSeries: PropTypes.array,
    dataSeries: PropTypes.array,
    descriptions: PropTypes.array,
    categoryScope: PropTypes.string,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    changeScope: PropTypes.func,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func
};

const AccountRankVisualizationSection = ({
    labelSeries,
    dataSeries,
    descriptions,
    categoryScope,
    hasNextPage,
    hasPreviousPage,
    loading,
    error,
    changeScope,
    nextPage,
    previousPage
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [visualizationWidth, setVisualizationWidth] = useState(0);
    const [labelWidth, setLabelWidth] = useState(0);

    const sectionHr = useRef(null);
    const disableNext = !hasNextPage;
    const disablePrev = !hasPreviousPage;
    let hidePager = '';

    if ((disableNext && disablePrev) || loading) {
        hidePager = 'hide';
    }

    const handleWindowResize = throttle(() => {
        // determine if the width changed
        const windowWidthLocal = window.innerWidth;
        if (windowWidthLocal !== windowWidth) {
            // width changed, update the visualization width
            setWindowWidth(windowWidthLocal);
            setVisualizationWidth(sectionHr.current.offsetWidth);
            setLabelWidth(min([sectionHr.current.offsetWidth / 3, 270]));
        }
    }, 50);

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="results-visualization-rank-section"
            id="results-section-rank">
            <SectionHeader
                title="Spending by Category"
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <hr
                className="results-divider"
                ref={(hr) => {
                    sectionHr.current = hr;
                }} />

            <div className="visualization-top">
                <div className="visualization-description">
                    <div className="content">
                        View a list of the top categories from highest to lowest. Filter your results more (at
                        left) and watch this graph update automatically.
                    </div>
                </div>
                <div className="visualization-period">
                    <div className="content">
                        <ul>
                            <li>
                                <RankVisualizationScopeButton
                                    value="programActivity"
                                    label="Program Activity"
                                    active={categoryScope === 'programActivity'}
                                    changeScope={changeScope} />
                            </li>
                            <li>
                                <RankVisualizationScopeButton
                                    value="objectClass"
                                    label="Object Class"
                                    active={categoryScope === 'objectClass'}
                                    changeScope={changeScope} />
                            </li>
                            <li>
                                <RankVisualizationScopeButton
                                    value="tas"
                                    label="Treasury Account Symbol (TAS)"
                                    active={categoryScope === 'tas'}
                                    changeScope={changeScope} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <RankVisualization
                labelSeries={labelSeries}
                dataSeries={dataSeries}
                descriptions={descriptions}
                loading={loading}
                error={error}
                width={visualizationWidth}
                labelWidth={labelWidth} />

            <div className={`visualization-pager-container ${hidePager}`}>
                <button
                    className="visualization-pager"
                    title="Show previous five"
                    aria-label="Show previous five"
                    disabled={disablePrev}
                    onClick={previousPage}>
                    <div className="pager-content">
                        <div className="icon">
                            <Icons.AngleLeft alt="Show previous five" />
                        </div>
                        <div className="pager-label">
                            Show previous five
                        </div>
                    </div>
                </button>
                <button
                    className="visualization-pager"
                    title="Show next five"
                    aria-label="Show next five"
                    disabled={disableNext}
                    onClick={nextPage}>
                    <div className="pager-content">
                        <div className="pager-label next">
                            Show next five
                        </div>
                        <div className="icon">
                            <Icons.AngleRight alt="Show next five" />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

AccountRankVisualizationSection.propTypes = propTypes;
export default AccountRankVisualizationSection;
