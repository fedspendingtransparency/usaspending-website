/**
  * AwardInfo.jsx
  * Created by Emily Gullo 01/20/2017
  **/

import React from 'react';
import _ from 'lodash';

import $ from 'jquery';

import { awardTypeGroups } from 'dataMapping/search/awardType';
import SummaryBar from './SummaryBar';
import AwardInfoBar from './AwardInfoBar';
import AwardContract from './contract/AwardContract';
import AwardGrant from './financialAssistance/AwardGrant';
import DetailsSection from './details/DetailsSection';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "subaward"
        };

        this.clickTab = this.clickTab.bind(this);
        this.seeAdditional = this.seeAdditional.bind(this);
    }

    clickTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    seeAdditional() {
        this.clickTab('additional');
        const table = document.querySelector(`#details-table-section`);
        if (table) {
            const tableSection = table.offsetTop - 150;
            $('body').animate({
                scrollTop: tableSection
            }, 250);
        }
    }

    render() {
        const isContract =
            _.includes(awardTypeGroups.contracts, this.props.selectedAward.award_type);

        let amountsDetailsSection = (
            <AwardContract
                {...this.props}
                selectedAward={this.props.selectedAward}
                seeAdditional={this.seeAdditional} />
        );
        if (!isContract) {
            amountsDetailsSection = (
                <AwardGrant
                    {...this.props}
                    selectedAward={this.props.selectedAward}
                    seeAdditional={this.seeAdditional} />
            );
        }

        return (
            <div>
                <SummaryBar
                    {...this.props}
                    selectedAward={this.props.selectedAward} />
                <main id="main-content" className="main-content">
                    <AwardInfoBar
                        {...this.props}
                        selectedAward={this.props.selectedAward} />

                    {amountsDetailsSection}

                    <DetailsSection
                        {...this.props}
                        isContract={isContract}
                        clickTab={this.clickTab}
                        activeTab={this.state.activeTab} />
                </main>
            </div>
        );
    }
}
AwardInfo.propTypes = propTypes;

