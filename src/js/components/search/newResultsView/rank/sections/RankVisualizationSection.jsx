/**
  * RankVisualizationSection.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle, min } from 'lodash';

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
        return (
            <>
                <RankVisualization
                    {...this.props}
                    {...this.state}
                    width={this.state.visualizationWidth} />
            </>
        );
    }
}

RankVisualizationSection.propTypes = propTypes;
