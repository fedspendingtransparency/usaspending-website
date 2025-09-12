/**
 * Award.jsx
 * Created by David Trinh 10/5/2018
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { ShareIcon, DownloadIconButton } from 'data-transparency-ui';
import { find, startCase, throttle, uniqueId } from 'lodash-es';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import * as MetaTagHelper from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import Error from 'components/sharedComponents/Error';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import { LoadingWrapper } from 'components/sharedComponents/Loading';

import ContractContent from './contract/ContractContent';
import IdvContent from './idv/IdvContent';
import FinancialAssistanceContent from './financialAssistance/FinancialAssistanceContent';
import { showModal } from '../../redux/actions/modal/modalActions';

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

const Award = (props) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const handleWindowResize = throttle(() => {
        // determine if the width changed
        const local = window.innerWidth;
        if (windowWidth !== local) {
            setWindowWidth(local);
            setIsMobile(local < mediumScreen);
        }
    }, 50);

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onShareClick = (name) => {
        const { awardId, award } = props;
        const slug = `award/${awardId}`;
        const emailSubject = `${award?.overview?.awardingAgency?.formattedToptier} to ${award.overview?.recipient?._name}`;
        const emailArgs = {
            subject: `USAspending.gov Award Summary: ${emailSubject}`,
            body: `View the spending details of this federal award on USAspending.gov: ${getBaseUrl(slug)}`
        };
        handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
    };

    const jumpToSection = (section = '') => {
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
        window.scrollTo({
            top: sectionTop,
            left: 0,
            behavior: 'smooth'
        });
    };


    const renderContent = (overview, awardId) => {
        if (!overview) return null;
        if (overview.category === 'contract') {
            return (
                <ContractContent
                    awardId={awardId}
                    overview={overview}
                    counts={{ subawardCount: overview.subawardCount }}
                    jumpToSection={jumpToSection}
                    isSubAwardIdClicked={props.isSubAwardIdClicked}
                    subAwardIdClicked={props.subAwardIdClicked}
                    defCodes={props.defCodes}
                    unlinked={props.unlinked} />
            );
        }
        else if (overview.category === 'idv') {
            return (
                <IdvContent
                    awardId={awardId}
                    overview={overview}
                    details={props.award.idvDetails}
                    jumpToSection={jumpToSection}
                    defCodes={props.defCodes}
                    unlinked={props.unlinked} />
            );
        }
        else if (props.noAward) {
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
                jumpToSection={jumpToSection}
                isSubAwardIdClicked={props.isSubAwardIdClicked}
                subAwardIdClicked={props.subAwardIdClicked}
                defCodes={props.defCodes}
                unlinked={props.unlinked} />
        );
    };

    const { overview } = props.award;
    const { awardId, isLoading } = props;
    const content = renderContent(overview, awardId);
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
                    key={uniqueId()}
                    url={getBaseUrl(slug)}
                    onShareOptionClick={onShareClick}
                    classNames={!isMobile ? "margin-right" : ""} />,
                <DownloadIconButton
                    key={uniqueId()}
                    isEnabled={!props.noAward}
                    downloadInFlight={props.isDownloadPending}
                    onClick={props.downloadData} />
            ]}>
            <LoadingWrapper isLoading={isLoading}>
                <main className={!props.noAward ? 'award-content' : ''}>
                    {content}
                </main>
            </LoadingWrapper>
        </PageWrapper>
    );
};

export default Award;
Award.propTypes = propTypes;
