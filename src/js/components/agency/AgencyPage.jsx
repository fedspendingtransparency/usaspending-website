/**
 * AgencyPage.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
    ComingSoon,
    ErrorMessage
} from 'data-transparency-ui';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { showModal } from 'redux/actions/modal/modalActions';
import ShareIcon508 from 'components/sharedComponents/buttons/ShareIcon508';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import ProfileBackLink from 'components/sharedComponents/ProfileBackLink';
import NumericPickerWrapper from 'components/sharedComponents/dropdowns/NumericPickerWrapper';
import StatusOfFundsContainer from 'containers/agency/statusOfFunds/StatusOfFundsContainer';
import AgencySection from './AgencySection';
import AgencyOverview from './overview/AgencyOverview';
import AwardSpendingSubagency from './awardSpending/AwardSpendingSubagency';
import PageTitle from './overview/PageTitle';
import useJumpToSection from "../../hooks/useJumpToSection";

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
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const { pathname, search } = useLocation();
    const path = `${pathname.substring(1)}${search}`;

    const { name } = useSelector((state) => state.agency.overview);
    const { isStatusOfFundsChartLoaded } = useSelector((state) => state.agency);

    const dataThroughDates = useSelector((state) => state.agency.dataThroughDates);
    const overviewDataThroughDate = dataThroughDates?.overviewDataThroughDate;
    const statusDataThroughDate = dataThroughDates?.statusDataThroughDate;
    const awardSpendingDataThroughDate = dataThroughDates?.awardSpendingDataThroughDate;

    const handleShare = (optionName) => {
        handleShareOptionClick(optionName, path, {
            subject: `USAspending.gov Agency Profile: ${name}`,
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

    const jumpToSection = useJumpToSection("#agency-v2-", sections, isStatusOfFundsChartLoaded)

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
            toolBarComponents={[
                <NumericPickerWrapper
                    size="sm"
                    leftIcon="calendar-alt"
                    enabled
                    selectedValue={selectedFy}
                    latestValue={latestFy}
                    handleChange={(fy) => setSelectedFy({ fy })}
                    key={"NumericPickerWrapper"}/>,
                <ShareIcon508
                    url={getBaseUrl(path)}
                    onShareOptionClick={handleShare}
                    key={"ShareIcon508"} />
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
