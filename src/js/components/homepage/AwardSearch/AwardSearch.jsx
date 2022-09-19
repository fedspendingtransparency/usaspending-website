/**
 * AwardSearch.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AwardSearch = () => (
    <section className="award-search__section">
        <FlexGridRow className="grid-content" >
            <FlexGridCol mobile={12}>
                <div className="award-search__overline-div">
                    <span
                        className="fa-layers fa-fw award-search__span"><FontAwesomeIcon icon="search" size="sm" style={{ height: '12px', width: '12px' }} />
                    </span>
                    <p className="award-search__overline">AWARD SEARCH</p>
                </div>
                <h2 className="award-search__header">Search data on federal award spending</h2>
                <p className="award-search__subtext">Find information on awards such as contracts, loans, and grants based on location, industry, and more.</p>
            </FlexGridCol>
            <FlexGridCol mobile={12}>

            </FlexGridCol>
        </FlexGridRow>
    </section>
);

export default AwardSearch;
