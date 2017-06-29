/**
  * RankVisualizationSection.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import { throttle, min } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

import RankVisualization from '../RankVisualization';

const propTypes = {
    nextPage: React.PropTypes.func,
    previousPage: React.PropTypes.func,
    loading: React.PropTypes.bool,
    hasNextPage: React.PropTypes.bool,
    hasPreviousPage: React.PropTypes.bool,
    children: React.PropTypes.node
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
        const disableNext = !this.props.hasNextPage;
        const disablePrev = !this.props.hasPreviousPage;
        let hidePager = '';

        if ((disableNext && disablePrev) || this.props.loading) {
            hidePager = 'hide';
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
                        title="Show previous five"
                        aria-label="Show previous five"
                        disabled={disablePrev}
                        onClick={this.clickPrevious}>
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
                        onClick={this.clickNext}>
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
    }
}

RankVisualizationSection.propTypes = propTypes;
