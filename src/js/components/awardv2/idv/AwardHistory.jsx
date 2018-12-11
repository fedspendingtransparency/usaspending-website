/**
  * AwardInfo.jsx
  * Created by David Trinh 12/10/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';

import TablesSection from './TablesSection';

const propTypes = {
    overview: PropTypes.object
};

export default class AwardHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "transaction"
        };

        this.clickTab = this.clickTab.bind(this);
    }

    clickTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    render() {
        return (
            <div className="award-history">
                <div className="award-history__title">Award History</div>
                <hr />
                <TablesSection
                    selectedAward={this.props.overview}
                    clickTab={this.clickTab}
                    activeTab={this.state.activeTab} />
            </div>
        );
    }
}
AwardHistory.propTypes = propTypes;

