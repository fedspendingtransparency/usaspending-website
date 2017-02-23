/**
 * DetailsTableTabItem.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';

const propTypes = {
    label: React.PropTypes.string,
    internal: React.PropTypes.string,
    active: React.PropTypes.bool,
    switchTab: React.PropTypes.func
};

export default class DetailsTableTabItem extends React.Component {
    //constructor(props) {
    //    super(props);
    //
    //    this.clickedTab = this.clickedTab.bind(this);
    //}

    //clickedTab() {
    //    this.props.switchTab(this.props.internal);
    //}

    render() {
        //let activeClass = '';
        //if (this.props.active) {
        //    activeClass = ' active';
        //}

        let activeClass = ' active';

        return (
            <button
                className={`table-tab-toggle${activeClass}`}
                title={`Show Transaction History`}>
                Transaction History
            </button>
        );
    }
}

DetailsTableTabItem.propTypes = propTypes;
