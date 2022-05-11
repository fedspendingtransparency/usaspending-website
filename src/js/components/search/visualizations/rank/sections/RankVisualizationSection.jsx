/**
  * RankVisualizationSection.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle, min } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

import RankVisualization from '../RankVisualization';

const propTypes = {
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    children: PropTypes.node,
    recipientError: PropTypes.bool
};

export default class RankVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            labelWidth: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.clickPrevious = this.clickPrevious.bind(this);
        this.clickNext = this.clickNext.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    clickPrevious() {
        this.props.previousPage();
    }

    clickNext() {
        this.props.nextPage();
    }

    handleWindowResize() {
    // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            this.setState({
                windowWidth,
                visualizationWidth: this.sectionHr.offsetWidth,
                labelWidth: min([this.sectionHr.offsetWidth / 3, 270])
            });
        }
    }

    render() {
        const disableNext = !this.props.hasNextPage || this.props.recipientError;
        const disablePrev = !this.props.hasPreviousPage;
        let hidePager = '';

        if ((disableNext && disablePrev) || this.props.loading || this.props.error) {
            hidePager = 'hide';
        }
        if (this.props.recipientError) {
            hidePager = '';
        }

        return (
            <div>
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />

                {this.props.children}

                <RankVisualization
                    {...this.props}
                    {...this.state}
                    width={this.state.visualizationWidth} />

                <div className={`visualization-pager-container ${hidePager}`}>
                    <button
                        className="visualization-pager"
                        title="Show previous ten"
                        aria-label="Show previous ten"
                        disabled={disablePrev}
                        onClick={this.clickPrevious}>
                        <div className="pager-content">
                            <div className="icon">
                                <Icons.AngleLeft alt="Show previous ten" />
                            </div>
                            <div className="pager-label">
                                Show previous ten
                            </div>
                        </div>
                    </button>
                    <button
                        className="visualization-pager"
                        title="Show next ten"
                        aria-label="Show next ten"
                        disabled={disableNext}
                        onClick={this.clickNext}>
                        <div className="pager-content">
                            <div className="pager-label next">
                                Show next ten
                            </div>
                            <div className="icon">
                                <Icons.AngleRight alt="Show next ten" />
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        );
    }
}

RankVisualizationSection.propTypes = propTypes;
