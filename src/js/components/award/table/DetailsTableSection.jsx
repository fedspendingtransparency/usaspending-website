/**
 * DetailsTableSection.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';

import DetailsTableTabs from './DetailsTableTabs';


export default class DetailsTableSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableWidth: 0
        };

        this.setTableWidth = this.setTableWidth.bind(this);
    }
    componentDidMount() {
        // set the initial table width
        this.setTableWidth();
        // watch the window for size changes
        window.addEventListener('resize', this.setTableWidth);
    }

    componentWillUnmount() {
        // stop watching for size changes
        window.removeEventListener('resize', this.setTableWidth);
    }

    setTableWidth() {
        const tableWidth = this.tableWidthController.clientWidth - 2;
        this.setState({ tableWidth });
    }

    render() {
        return (
            <div className="contract-details-table-section" id="details-table-section">
                <DetailsTableTabs />
                <div
                    className="details-table-width-master"
                    ref={(div) => {
                        // this is an empty div that scales via CSS
                        // the results table width will follow this div's width
                        this.tableWidthController = div;
                    }} />
                <div className="contract-details-table">

                </div>
            </div>
        );
    }
}

//DetailsTableSection.propTypes = propTypes;

