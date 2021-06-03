/**
 * AccountSpending.jsx
 * Created by Lizzie Salita 5/8/20
 */

import React from 'react';
import PropTypes from 'prop-types';

import CountTabContainer from 'containers/agencyV2/accountSpending/CountTabContainer';
import TableContainer from 'containers/agencyV2/accountSpending/TableContainer';
import { useStateWithPrevious } from 'helpers';

const propTypes = {
    fy: PropTypes.string,
    agencyId: PropTypes.string
};

export const tabs = [
    // TODO - add tooltips
    {
        internal: 'object_class',
        label: 'Object Class',
        countField: 'object_class_count',
        subHeading: 'Object Classes'
    },
    {
        internal: 'program_activity',
        label: 'Program Activity',
        countField: 'program_activity_count'
    },
    {
        internal: 'federal_account',
        label: 'Federal Account',
        countField: 'federal_account_count',
        subHeading: 'Treasury Accounts'
    }
];

const AccountSpending = ({ agencyId, fy }) => {
    const [prevActiveTab, activeTab, setActiveTab] = useStateWithPrevious('object_class');
    const subHeading = tabs.find((tab) => tab.internal === activeTab).subHeading;
    return (
        <div className="body__content">
            <div className="count-tabs">
                <CountTabContainer
                    fy={fy}
                    agencyId={agencyId}
                    tabs={tabs}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab} />
                <TableContainer
                    agencyId={agencyId}
                    fy={fy}
                    prevType={prevActiveTab}
                    type={activeTab}
                    subHeading={subHeading} />
            </div>
        </div>
    );
};

AccountSpending.propTypes = propTypes;
export default AccountSpending;
