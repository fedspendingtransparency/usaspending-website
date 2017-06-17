/**
 * HomepageMapCitation.jsx
 * Created by Destin Frasier 6/16/17
 */

import React from 'react';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';

export default class HomepageMapCitation extends React.Component {
    render() {
        return (
            <div>
                <p>
                    The map reflects where obligated funding was used. This is called &quot;place of performance.&quot;
                </p>
                <p>
                    <strong>Sources:</strong> U.S. Census Bureau, Population Division |
                    The World Factbook 2013-14. Washington, DC: Central Intelligence Agency, 2013.
                    <span className="info-icon">
                        <InfoCircle alt="Citation" />
                    </span>
                </p>
            </div>
        );
    }
}
