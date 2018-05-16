/**
 * AwardBreakdownTreeMap.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import AwardTypes from './AwardTypes';

const propTypes = {
    activeFY: PropTypes.string,
    awardBreakdown: PropTypes.object,
    totalAmount: PropTypes.number,
    hasNegatives: PropTypes.bool
};

export default class AwardBreakdownTreeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            selected: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            this.setState({
                windowWidth
            });
        }
    }

    render() {
        return (
            <div
                className="award-breakdown__treemap"
                id="award-breakdown__treemap">
                <div
                    className="usa-da-treemap-section"
                    ref={(sr) => {
                        this.sectionWrapper = sr;
                    }}>
                    <AwardTypes
                        {...this.state}
                        awardBreakdown={this.props.awardBreakdown}
                        totalAmount={this.props.totalAmount}
                        hasNegatives={this.props.hasNegatives} />
                </div>
            </div>
        );
    }
}

AwardBreakdownTreeMap.propTypes = propTypes;
