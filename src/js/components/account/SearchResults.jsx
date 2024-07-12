/**
 * SearchResults.jsx
 * Created by Kevin Li 3/20/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import AccountTopFilterBarContainer from
    'containers/account/topFilterBar/AccountTopFilterBarContainer';
import { tabletScreen } from 'dataMapping/shared/mobileBreakpoints';
import AccountTimeVisualizationContainer from
    'containers/account/visualizations/AccountTimeVisualizationContainer';
import AccountRankVisualizationContainer from
    'containers/account/visualizations/AccountRankVisualizationContainer';
import Note, { dodNote } from 'components/sharedComponents/Note';
import AccountAwardsContainer from 'containers/account/awards/AccountAwardsContainer';

const propTypes = {
    showNote: PropTypes.bool
};

export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0
        };

        this.handleWindowResize = this.handleWindowResize.bind(this);
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
            // width changed, update the visualization width
            this.setState({
                windowWidth
            });
        }
    }
    render() {
        return (
            <div className="search-results-wrapper">
                <AccountTopFilterBarContainer {...this.props} />
                <div className="search-results">
                    <AccountTimeVisualizationContainer />
                    <div style={this.state.windowWidth < tabletScreen ? { height: "1000px" } : { height: "auto" }}>
                        <AccountRankVisualizationContainer />
                    </div>
                    <AccountAwardsContainer />
                    {this.props.showNote && <Note message={dodNote} />}
                </div>
            </div>
        );
    }
}

SearchResults.propTypes = propTypes;
