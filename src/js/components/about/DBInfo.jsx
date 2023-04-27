/**
 * DBInfo.jsx
 * Created by Destin Frasier 04/20/2017
 **/

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';
import Header from 'containers/shared/HeaderContainer';

import MetaTags from '../sharedComponents/metaTags/MetaTags';

require('pages/dbInfo/dbInfoPage.scss');

export default class DBInfo extends React.Component {
    render() {
        return (
            <div className="usa-da-db-info">
                <MetaTags {...MetaTagHelper.dbInfoPageMetaTags} />
                <Header />
                <main id="main-content">
                    <div className="article-wrapper">
                        <h1>Limitation on Permissible Use of Dun &amp; Bradstreet, Inc. Data</h1>
                        <p>This website contains data supplied by third party information suppliers, one of which is D&B. For the purposes of the
                         following limitation on permissible use of D&B data, which includes each entity&#39;s DUNS Number and its associated business
                         information, &quot;D&amp;B Open Data&quot; is defined as the following data elements: Business Name, Street Address, City Name, State/Province Name,
                          Country Name, County Code, State/Province Code, State/Province Abbreviation, and ZIP/Postal Code.
                        </p>
                        <p>D&B hereby grants you, the user, a license for a limited, non-exclusive use of D&amp;B data within the limitations set forth herein.
                           By using this website you agree that you shall not use D&B Open Data without giving written attribution to the source of such data
                           (i.e., D&amp;B) and shall not access, use or disseminate D&amp;B Open Data in bulk, (i.e., in amounts sufficient for use as an original source
                            or as a substitute for the product and/or service being licensed hereunder).
                        </p>
                        <p>Except for data elements identified above as D&B Open Data, under no circumstances are you authorized to use any other D&amp;B data for
                           commercial, resale or marketing purposes (e.g., identifying, quantifying, segmenting and/or analyzing customers and prospective customers).
                           Systematic access (electronic harvesting) or extraction of content from the website, including the use of &quot;bots&quot; or &quot;spiders&quot;, is prohibited.
                           Federal government entities are authorized to use the D&B data for purposes of acquisition as defined in FAR 2.101 and for the purpose of managing
                           Federal awards, including sub-awardees, or reporting Federal award information.
                        </p>
                        <p>The Federal Government and its agencies assume no liability for the use of the D&amp;B data once it is downloaded or accessed. The D&B data is
                           provided &quot;as is&quot; without warranty of any kind. The D&amp;B data is the intellectual property of D&amp;B. In no event will D&amp;B or any third party information
                           supplier be liable in any way with regard to the use of the D&amp;B data. For more information about the scope of permissible use of D&amp;B data licensed
                           hereunder, please contact D&amp;B at datause_govt@dnb.com
                        </p>
                    </div>
                </main>
                <Footer pageName="DBInfo" />
            </div>
        );
    }
}
