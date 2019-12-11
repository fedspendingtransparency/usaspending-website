/**
 * Award.jsx
 * Created by David Trinh 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import { find } from 'lodash';
import { scrollToY } from 'helpers/scrollToHelper';

import SummaryBar from './SummaryBarV2';
import ContractContent from './contract/ContractContent';
import IdvContent from './idv/IdvContent';
import FinancialAssistanceContent from './financialAssistance/FinancialAssistanceContent';
import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Error from '../sharedComponents/Error';

const propTypes = {
    awardId: PropTypes.string,
    award: PropTypes.object,
    noAward: PropTypes.bool,
    downloadData: PropTypes.func,
    downloadModalProps: PropTypes.shape({
        mounted: PropTypes.bool,
        hideModal: PropTypes.func
    }),
    isDownloadPending: PropTypes.bool
};

const awardSections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'additional-information',
        label: 'Additional Information'
    },
    {
        section: 'referenced-awards',
        label: 'Referenced Awards'
    },
    {
        section: 'award-history',
        label: 'Award History'
    }
];

export default class Award extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sectionPositions: [],
            window: {
                height: 0
            }
        };

        this.jumpToSection = this.jumpToSection.bind(this);
    }

    jumpToSection(section = '') {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(awardSections, {
            section
        });

        if (!matchedSection) {
            // no matching section
            return;
        }

        // scroll to the correct section
        const sectionDom = document.querySelector(`#award-${section}`);

        if (!sectionDom) {
            return;
        }

        const sectionTop = sectionDom.offsetTop - 145;
        scrollToY(sectionTop, 700);
    }

    render() {
        let content = null;
        let summaryBar = null;
        const { overview } = this.props.award;
        const { awardId } = this.props;
        if (overview) {
            summaryBar = (
                <SummaryBar
                    isDownloadPending={this.props.isDownloadPending}
                    downloadData={this.props.downloadData}
                    category={overview.category} />
            );
            if (overview.category === 'contract') {
                content = (
                    <ContractContent
                        awardId={awardId}
                        overview={overview}
                        counts={{ subawardCount: overview.subawardCount }}
                        jumpToSection={this.jumpToSection} />
                );
            }
            else if (overview.category === 'idv') {
                content = (
                    <IdvContent
                        awardId={awardId}
                        overview={overview}
                        counts={this.props.award.counts}
                        jumpToSection={this.jumpToSection} />
                );
            }
            else {
                content = (
                    <FinancialAssistanceContent
                        awardId={awardId}
                        overview={overview}
                        jumpToSection={this.jumpToSection} />
                );
            }
        }
        if (this.props.noAward) {
            summaryBar = (
                <SummaryBar isInvalidId />
            );
            content = (
                <div className="wrapper">
                    <Error
                        title="Invalid Award ID"
                        message="The award ID provided is invalid.
                        Please check the ID and try again." />
                </div>
            );
        }

        return (
            <div className="usa-da-award-v2-page">
                <MetaTags {...MetaTagHelper.awardPageMetaTags} />
                <Header />
                <StickyHeader>
                    {summaryBar}
                </StickyHeader>
                <main className={!this.props.noAward ? 'award-content' : ''}>
                    {content}
                </main>
                <Footer />
            </div>
        );
    }
}

Award.propTypes = propTypes;
