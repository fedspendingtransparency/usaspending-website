/**
 * ObjectClassTreeMap
 * Created by michaelbray on 6/8/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle, find } from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as Icons from 'components/sharedComponents/icons/Icons';

import MajorObjectClasses from './MajorObjectClasses';
import MinorObjectClasses from './MinorObjectClasses';

const propTypes = {
    activeFY: PropTypes.string,
    majorObjectClasses: PropTypes.object,
    minorObjectClasses: PropTypes.object,
    totalObligation: PropTypes.number,
    totalMinorObligation: PropTypes.number,
    displayedTotalObligation: PropTypes.number,
    showMinorObjectClasses: PropTypes.func,
    asOfDate: PropTypes.string,
    hasNegatives: PropTypes.bool,
    minorHasNegatives: PropTypes.bool
};

export default class ObjectClassTreeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            showMinorObjectClass: false,
            selected: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.toggleMinorObjectClass = this.toggleMinorObjectClass.bind(this);
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

    toggleMinorObjectClass(selected = 0) {
        this.setState({
            showMinorObjectClass: !this.state.showMinorObjectClass,
            selected
        }, () => {
            if (this.state.showMinorObjectClass) {
                this.props.showMinorObjectClasses(selected);
            }
        });
    }

    generateHeader() {
        let header = '';

        if (this.state.showMinorObjectClass === true) {
            header = (
                <button
                    className="back"
                    onClick={this.toggleMinorObjectClass}>
                    <Icons.ArrowUp /> Back to Major Object Classes
                </button>
            );
        }

        return header;
    }

    generateObjectClasses() {
        let objectClasses = (<MajorObjectClasses
            {...this.state}
            majorObjectClasses={this.props.majorObjectClasses}
            totalObligation={this.props.totalObligation}
            toggleMinorObjectClass={this.toggleMinorObjectClass}
            hasNegatives={this.props.hasNegatives} />);

        if (this.state.showMinorObjectClass === true) {
            const selectedMajorObjectClass = find(this.props.majorObjectClasses.children,
                { major_object_class_code: this.state.selected });

            objectClasses = (<MinorObjectClasses
                {...this.state}
                majorObjectClass={selectedMajorObjectClass}
                minorObjectClasses={this.props.minorObjectClasses}
                totalObligation={this.props.totalObligation}
                totalMinorObligation={this.props.totalMinorObligation}
                toggleMinorObjectClass={this.toggleMinorObjectClass}
                hasNegatives={this.props.minorHasNegatives} />);
        }

        return objectClasses;
    }

    render() {
        const total = MoneyFormatter.formatTreemapValues(this.props.displayedTotalObligation);

        return (
            <div
                className="agency-section-wrapper"
                id="agency-object-classes">
                <div className="agency-section-title">
                    <h4>Object Classes</h4>
                    <hr className="results-divider" />
                    <em>FY {this.props.activeFY} data reported through {this.props.asOfDate}</em>
                </div>
                <div className="agency-callout-description">
                    <p>This {total} in obligations is divided among categories,
                        called <strong>object classes</strong>. These groupings can be helpful
                        for analysis and cross-agency comparison.
                    </p>
                </div>
                <div className="agency-section-content">
                    <div
                        className="usa-da-treemap-section"
                        ref={(sr) => {
                            this.sectionWrapper = sr;
                        }}>
                        <div className="usa-da-treemap-header">
                            {this.generateHeader()}
                        </div>
                        {this.generateObjectClasses()}
                    </div>
                    <div className="agency-viz-description">This visualization represents obligated amount.</div>
                </div>
            </div>
        );
    }
}

ObjectClassTreeMap.propTypes = propTypes;
