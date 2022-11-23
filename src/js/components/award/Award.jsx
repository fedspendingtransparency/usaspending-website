/**
 * Award.jsx
 * Created by David Trinh 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { ShareIcon, DownloadIconButton } from 'data-transparency-ui';
import { find, startCase } from 'lodash';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import { scrollToY } from 'helpers/scrollToHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import Error from 'components/sharedComponents/Error';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import { LoadingWrapper } from 'components/sharedComponents/Loading';

import ContractContent from './contract/ContractContent';
import IdvContent from './idv/IdvContent';
import FinancialAssistanceContent from './financialAssistance/FinancialAssistanceContent';

const propTypes = {
    awardId: PropTypes.string,
    award: PropTypes.object,
    noAward: PropTypes.bool,
    downloadData: PropTypes.func,
    downloadModalProps: PropTypes.shape({
        mounted: PropTypes.bool,
        hideModal: PropTypes.func
    }),
    isDownloadPending: PropTypes.bool,
    isSubAwardIdClicked: PropTypes.bool,
    subAwardIdClicked: PropTypes.func,
    isLoading: PropTypes.bool,
    defCodes: PropTypes.array,
    unlinked: PropTypes.bool
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
    },
    {
        section: 'cfda',
        label: 'Assistance Listing (CFDA Program) Information'
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
        this.renderContent = this.renderContent.bind(this);
    }

    onShareClick = (name) => {
        const { awardId, award } = this.props;
        const slug = `award/${awardId}`;
        const emailSubject = `${award?.overview?.awardingAgency?.formattedToptier} to ${award.overview?.recipient?._name}`;
        const emailArgs = {
            subject: `USAspending.gov Award Summary: ${emailSubject}`,
            body: `View the spending details of this federal award on USAspending.gov: ${getBaseUrl(slug)}`
        };
        handleShareOptionClick(name, slug, emailArgs);
    };

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

    renderContent(overview, awardId) {
        if (!overview) return null;
        if (overview.category === 'contract') {
            return (
                <ContractContent
                    awardId={awardId}
                    overview={overview}
                    counts={{ subawardCount: overview.subawardCount }}
                    jumpToSection={this.jumpToSection}
                    isSubAwardIdClicked={this.props.isSubAwardIdClicked}
                    subAwardIdClicked={this.props.subAwardIdClicked}
                    defCodes={this.props.defCodes}
                    unlinked={this.props.unlinked} />
            );
        }
        else if (overview.category === 'idv') {
            return (
                <IdvContent
                    awardId={awardId}
                    overview={overview}
                    details={this.props.award.idvDetails}
                    jumpToSection={this.jumpToSection}
                    defCodes={this.props.defCodes}
                    unlinked={this.props.unlinked} />
            );
        }
        else if (this.props.noAward) {
            return (
                <div className="wrapper">
                    <Error
                        title="Invalid Award ID"
                        message="The award ID provided is invalid.
                        Please check the ID and try again." />
                </div>
            );
        }
        return (
            <FinancialAssistanceContent
                awardId={awardId}
                overview={overview}
                jumpToSection={this.jumpToSection}
                isSubAwardIdClicked={this.props.isSubAwardIdClicked}
                subAwardIdClicked={this.props.subAwardIdClicked}
                defCodes={this.props.defCodes}
                unlinked={this.props.unlinked} />
        );
    }

    render() {
        const { overview } = this.props.award;
        const { awardId, isLoading } = this.props;
        const content = this.renderContent(overview, awardId);
        const slug = `award/${awardId}`;
        const title = (overview?.category === 'idv')
            ? 'Indefinite Delivery Vehicle'
            : `${startCase(overview?.category)} Summary`;
        return (
            <PageWrapper
                pageName="Award Profile"
                classNames="usa-da-award-v2-page"
                overLine="Award Profile"
                metaTagProps={overview ? MetaTagHelper.awardPageMetaTags(overview) : {}}
                title={isLoading ? '--' : title}
                toolBarComponents={[
                    <ShareIcon
                        url={getBaseUrl(slug)}
                        onShareOptionClick={this.onShareClick} />,
                    <DownloadIconButton
                        isEnabled={!this.props.noAward}
                        downloadInFlight={this.props.isDownloadPending}
                        onClick={this.props.downloadData} />
                ]}>
                <LoadingWrapper isLoading={isLoading}>
                    <main className={!this.props.noAward ? 'award-content' : ''}>
                        {content}
                    </main>
                </LoadingWrapper>
            </PageWrapper>
        );
    }
}

Award.propTypes = propTypes;
