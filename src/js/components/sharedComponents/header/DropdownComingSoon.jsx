/**
 * DropdownComingSoon.jsx
 * Created by Kevin Li 7/19/17
 */

import React from 'react';

import { ExclamationCircle } from 'components/sharedComponents/icons/Icons';

const DropdownComingSoon = () => (
    <div className="nav-coming-soon">
        <div className="nav-coming-soon__icon">
            <ExclamationCircle alt="Coming soon" />
        </div>
        <div className="nav-coming-soon__label">
            Coming Soon
        </div>
    </div>
);

export default DropdownComingSoon;
