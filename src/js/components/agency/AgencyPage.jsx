/**
 * AgencyPage.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ComingSoon,
    ErrorMessage
} from 'data-transparency-ui';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';

import { combineQueryParams, getQueryParamString } from '../../helpers/queryParams';
import { agencyPageMetaTags } from '../../helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from '../../helpers/socialShare';
import { stickyHeaderHeight } from '../../dataMapping/stickyHeader/stickyHeader';
import { showModal } from '../../redux/actions/modal/modalActions';
import useQueryParams from "../../hooks/useQueryParams";
import ShareIcon508 from '../../components/sharedComponents/buttons/ShareIcon508';
import PageWrapper from '../../components/sharedComponents/PageWrapper';
import ProfileBackLink from '../../components/sharedComponents/ProfileBackLink';
import NumericPickerWrapper from '../../components/sharedComponents/dropdowns/NumericPickerWrapper';
import StatusOfFundsContainer from '../../containers/agency/statusOfFunds/StatusOfFundsContainer';
import AgencySection from './AgencySection';
import AgencyOverview from './overview/AgencyOverview';
import AwardSpendingSubagency from './awardSpending/AwardSpendingSubagency';
import PageTitle from './overview/PageTitle';

require('pages/agency/index.scss');

const propTypes = {
    selectedFy: PropTypes.string,
    latestFy: PropTypes.number,
    setSelectedFy: PropTypes.func,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    agencySlug: PropTypes.string
};

export const AgencyProfileV2 = ({
    selectedFy,
    setSelectedFy,
    isError,
    errorMessage,
    isLoading,
    latestFy,
    agencySlug
}) => {
    const history = useNavigate();
    const query = useQueryParams();
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const { pathname, search } = useLocation();
    const path = `${pathname.substring(1)}${search}`;

    const [activeSection, setActiveSection] = useState(query.section || 'overview');
    const { name } = useSelector((state) => state.agency.overview);
    const { isStatusOfFundsChartLoaded } = useSelector((state) => state.agency);

    const dataThroughDates = useSelector((state) => state.agency.dataThroughDates);
    const overviewDataThroughDate = dataThroughDates?.overviewDataThroughDate;
    const statusDataThroughDate = dataThroughDates?.statusDataThroughDate;
    const awardSpendingDataThroughDate = dataThroughDates?.awardSpendingDataThroughDate;

    const handleShare = (optionName) => {
        handleShareOptionClick(optionName, path, {
            subject: `USAspending.gov Agency Profile: ${name}`,
            // eslint-disable-next-line max-len
            body: `View the spending activity for this Agency on USAspending.gov: ${getBaseUrl(path)}`
        }, handleShareDispatch);
    };

    const sections = [
        {
            section: 'overview',
            label: 'Overview',
            icon: 'landmark',
            dataThroughDate: overviewDataThroughDate,
            component: <AgencyOverview fy={selectedFy} dataThroughDate={overviewDataThroughDate} />
        },
        {
            section: 'status-of-funds',
            label: 'Status of Funds',
            icon: 'money-check-alt',
            dataThroughDate: statusDataThroughDate,
            component: <StatusOfFundsContainer fy={selectedFy} />
        },
        {
            section: 'award-spending',
            label: 'Award Spending',
            icon: 'hand-holding-usd',
            dataThroughDate: awardSpendingDataThroughDate,
            component: <AwardSpendingSubagency fy={`${selectedFy}`} />
        }
    ];

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = sections.find((obj) => obj.section === section);
        if (!matchedSection) {
            // no matching section
            return;
        }

        // find the section in dom
        const sectionDom = document.querySelector(`#agency-v2-${matchedSection.section}`);
        if (!sectionDom) {
            return;
        }

        // add section to url
        if (!window.location.href.includes(`section=${section}`)) {
            const newQueryParams = combineQueryParams(query, { section: `${section}` });
            history({
                path: `${getQueryParamString(newQueryParams)}`
            }, { replace: true });
        }

        // update the state
        setActiveSection(section);

        // add offsets

        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight);

        window.scrollTo({
            top: sectionTop - 55,
            left: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (isStatusOfFundsChartLoaded && query.section) {
            jumpToSection(query.section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.section, isStatusOfFundsChartLoaded]);

    return (
        <PageWrapper
            pageName="agency-v2"
            classNames="usa-da-agency-page-v2"
            title={name}
            metaTagProps={isLoading ? {} : agencyPageMetaTags({ id: agencySlug, name })}
            inPageNav
            loading={isLoading}
            sections={sections}
            jumpToSection={jumpToSection}
            activeSection={activeSection}
            toolBarComponents={[
                <NumericPickerWrapper
                    size="sm"
                    leftIcon="calendar-alt"
                    enabled
                    selectedValue={selectedFy}
                    latestValue={latestFy}
                    handleChange={(fy) => setSelectedFy({ fy })} />,
                <ShareIcon508 url={getBaseUrl(path)} onShareOptionClick={handleShare} />
            ]}>
            <main id="main-content" className="main-content usda__flex-row">
                <ProfileBackLink
                    className="agency-profile"
                    label="Back to Agency Profile Page"
                    url="/agency" />
                <div className="body usda__flex-col">
                    <PageTitle />
                    {isError
                        ? <ErrorMessage description={errorMessage} />
                        : sections.map((section) => (
                            <AgencySection
                                key={section.section}
                                section={section}
                                isLoading={isLoading}
                                icon={section.icon}
                                dataThroughDate={section.dataThroughDate}>
                                {section.component || <ComingSoon />}
                            </AgencySection>
                        ))}
                </div>
            </main>
        </PageWrapper>
    );
};

AgencyProfileV2.propTypes = propTypes;
export default AgencyProfileV2;
