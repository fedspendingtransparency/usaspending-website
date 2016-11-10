/**
  * SearchHeader.jsx
  * Created by Kevin Li 11/10/16
  **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

import FormatItem from './FormatItem';
import DownloadButton from './DownloadButton';

export default class SearchHeader extends React.Component {
    render() {
        return (
            <div className="search-header">
                <div className="search-title">
                    <h1>Advanced Search Results</h1>
                </div>
                <div className="search-options">
                    <ul className="search-formats">
                        <li>
                            <FormatItem
                                isActive
                                label="Time"
                                icon={<Icons.Calendar alt="Time" />} />
                        </li>
                        <li>
                            <FormatItem
                                label="Map"
                                icon={<Icons.ExclamationCircle alt="Map" />} />
                        </li>
                        <li>
                            <FormatItem
                                label="Rank"
                                icon={<Icons.ExclamationCircle alt="Rank" />} />
                        </li>
                        <li>
                            <FormatItem
                                label="Table"
                                icon={<Icons.ExclamationCircle alt="Table" />} />
                        </li>
                        <li>
                            <DownloadButton />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
