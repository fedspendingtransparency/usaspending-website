/**
 * Accordion.jsx
 * Created by Kwadwo Opoku-Debrah 10/13/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { compact } from 'lodash';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createOnKeyDownHandler } from 'helpers/keyboardEventsHelper';

const awardIdField = 'Unique Award Key';

export default class Accordion extends React.Component {
    static propTypes = {
        accordionName: PropTypes.string,
        accordionIcon: PropTypes.string,
        iconClassName: PropTypes.string,
        accordionData: PropTypes.object,
        globalToggle: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.globalToggle !== prevProps.globalToggle) {
            this.globalOverride();
        }
    }

    handleClick() {
        this.setState({ open: !this.state.open });
    }

    link(pathAndTitle) {
        const { path, title } = pathAndTitle;
        if (!path && !title) return '--';
        if (!path) return title;
        if (title && path) return (<Link to={path}>{title}</Link>);
        return (<Link to={path}>Unknown</Link>);
    }

    // pass an array of address lines
    // e.g. ['1234 Sleepy Ghost Lane', 'Las Vegas, Nevada', 'Some Country']
    address(arrayOfRows) {
    // if no data return --
        const array = compact(arrayOfRows);
        if (array.length === 0) return '--';
        return (
            <div>
                {
                    arrayOfRows.map((addressLine, index) => (
                        <div key={`addressline-${addressLine}-${index}`}>
                            {addressLine || '--'}
                        </div>
                    ))
                }
            </div>
        );
    }

    // pass an array of data
    // e.g. ['have', 'a', 'good', 'day']
    list(arrayOfData) {
        const array = compact(arrayOfData);
        if (array.length === 0) return '--';
        return (
            <ul className="accordion-table__list">
                {arrayOfData.map((type, index) => <li key={`list-${type}-${index}`}>{type}</li>)}
            </ul>
        );
    }

    globalOverride() {
        this.setState({
            open: this.props.globalToggle
        });
    }

    accordionBody() {
        const { accordionData } = this.props;
        if (!accordionData) return null;
        return Object.keys(accordionData).map((key) => {
            let data = accordionData[key] || '--';
            // display data as a link, address or list
            if (accordionData[key]) {
                const awardInfo = accordionData[key];
                const specialType = accordionData[key].type;
                if (specialType) {
                    data = this[awardInfo.type](awardInfo.data);
                }
            }
            return (
                <div
                    key={key}
                    className="accordion-row">
                    <div className="accordion-row__title">{key}</div>
                    <div className={`accordion-row__data${key === awardIdField ? ' generated-id' : ''}`}>{data}</div>
                </div>
            );
        });
    }

    render() {
        const { accordionName, accordionIcon, iconClassName } = this.props;
        const onKeyDownHandler = createOnKeyDownHandler(this.handleClick);
        const accordionBody = this.accordionBody();
        const open = this.state.open ?
            (<FontAwesomeIcon className="accordion-caret" size="lg" icon="angle-down" />) :
            (<FontAwesomeIcon className="accordion-caret" size="lg" icon="angle-right" />);
        const openClassName = this.state.open ? 'accordion accordion_open' : 'accordion';
        return (
            <div className={openClassName}>
                <div
                    className="accordion__bar"
                    tabIndex={0}
                    role="button"
                    onKeyDown={onKeyDownHandler}
                    onClick={this.handleClick}>
                    <span>
                        <FontAwesomeIcon className={iconClassName} size="lg" icon={accordionIcon} />
                        {accordionName}
                    </span>
                    <span>
                        {open}
                    </span>
                </div>
                <div className="accordion__content">
                    {accordionBody}
                </div>
            </div>
        );
    }
}
