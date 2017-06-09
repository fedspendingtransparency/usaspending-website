/**
 * ObjectClassTreeMap
 * Created by michaelbray on 6/8/17.
 */

import React from 'react';
import _ from 'lodash';

import MajorObjectClasses from './MajorObjectClasses';
import MinorObjectClasses from './MinorObjectClasses';

const propTypes = {
    objectClassData: React.PropTypes.object,
    totalObligation: React.PropTypes.number
};

export default class ObjectClassTreeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            showMinorObjectClass: false,
            selected: 0
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
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
        });
    }

    generateObjectClasses() {
        let objectClasses = (<MajorObjectClasses
            {...this.state}
            objectClassData={this.props.objectClassData}
            totalObligation={this.props.totalObligation}
            toggleMinorObjectClass={this.toggleMinorObjectClass} />);

        if (this.state.showMinorObjectClass === true) {
            objectClasses = (<MinorObjectClasses
                {...this.state}
                objectClassData={this.props.objectClassData}
                totalObligation={this.props.totalObligation}
                toggleMinorObjectClass={this.toggleMinorObjectClass} />);
        }

        return objectClasses;
    }

    render() {
        return (
            <div
                className="usa-da-treemap-section"
                ref={(sr) => {
                    this.sectionWrapper = sr;
                }}>
                {this.generateObjectClasses()}
            </div>
        );
    }

}

ObjectClassTreeMap.propTypes = propTypes;
