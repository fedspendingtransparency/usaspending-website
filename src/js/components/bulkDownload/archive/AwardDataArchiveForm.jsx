/**
 * AwardDataArchiveForm.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ArchiveAgencyFilter from './filters/AgencyFilter';
import ArchiveTypeFilter from './filters/TypeFilter';
import ArchiveFiscalYearFilter from './filters/FiscalYearFilter';

const propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func,
    agencies: PropTypes.object,
    requestResults: PropTypes.func
};

export default class AwardDataArchiveForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            formWidth: 0
        };

        this.setFormWidth = this.setFormWidth.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    // set the initial form width
        this.setFormWidth();
        // watch the window for size changes
        window.addEventListener('resize', this.setFormWidth);
    }

    componentWillUnmount() {
    // stop watching for size changes
        window.removeEventListener('resize', this.setFormWidth);
    }

    setFormWidth() {
        const windowWidth = window.innerWidth;
        const formWidth = this.formWidthController.clientWidth - 1;
        this.setState({
            windowWidth,
            formWidth
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.requestResults();
    }

    render() {
        return (
            <div className="award-data-archive-form">
                <div className="form-title__wrapper">
                    <div className="form-title">
                        Filter by
                    </div>
                </div>
                <div
                    className="form-width-master"
                    ref={(div) => {
                        // this is an empty div that scales via CSS
                        // the dropdown widths will be based on this width
                        this.formWidthController = div;
                    }} />
                <form
                    className="archive-form"
                    onSubmit={this.handleSubmit}>
                    <ArchiveAgencyFilter
                        formWidth={this.state.formWidth}
                        windowWidth={this.state.windowWidth}
                        agency={this.props.filters.agency}
                        updateFilter={this.props.updateFilter}
                        agencies={this.props.agencies} />
                    <ArchiveTypeFilter
                        formWidth={this.state.formWidth}
                        windowWidth={this.state.windowWidth}
                        currentType={this.props.filters.type.display}
                        updateFilter={this.props.updateFilter} />
                    <ArchiveFiscalYearFilter
                        formWidth={this.state.formWidth}
                        windowWidth={this.state.windowWidth}
                        currentFY={this.props.filters.fy}
                        updateFilter={this.props.updateFilter} />
                    <div className="form__button">
                        <input type="submit" value="Apply" />
                    </div>
                </form>
            </div>
        );
    }
}

AwardDataArchiveForm.propTypes = propTypes;
