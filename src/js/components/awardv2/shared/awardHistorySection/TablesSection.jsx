/**
 * TablesSection.jsx
 * Created by David Trinh 12/10/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    overview: PropTypes.object,
    activeTab: PropTypes.string,
    clickTab: PropTypes.func,
    awardId: PropTypes.string
};

export default class TablesSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableWidth: 0
        };
        this.countRequest = null;
        this.setTableWidth = this.setTableWidth.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        // stop watching for size changes
        window.removeEventListener('resize', this.setTableWidth);
    }

    render() {
        const content = this.currentSection();

        if (tabOptions.length > 0) {
            return (
                <div className="tables-section">
                    <DetailsTabBar
                        tabOptions={tabOptions}
                        activeTab={this.props.activeTab}
                        clickTab={this.props.clickTab} />
                    <ResultsTablePicker
                        types={tabOptions}
                        active={this.props.activeTab}
                        switchTab={this.props.clickTab} />
                    <div
                        className="tables-width-master"
                        ref={(div) => {
                            // this is an empty div that scales via CSS
                            // the results table width will follow this div's width
                            this.tableWidthController = div;
                        }} />
                    <div className="tables-content">
                        {content}
                    </div>
                </div>
            );
        }
        return null;
    }
}

TablesSection.propTypes = propTypes;
