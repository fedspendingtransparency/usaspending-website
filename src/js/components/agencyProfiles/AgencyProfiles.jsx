/**
 * AgencyProfiles.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';

import { agencyLandingPageMetaTags } from 'helpers/metaTagHelper';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

import AgencyProfilesHeader from './header/AgencyProfilesHeader';
import AgencyProfilesContent from './AgencyProfilesContent';

export default class AgencyProfiles extends React.Component {
    render() {
        return (
            <div className="usa-da-agency-profiles">
                <MetaTags {...agencyLandingPageMetaTags} />
                <Header />
                <AgencyProfilesHeader />
                <main
                    id="main-content"
                    className="main-content">
                    <AgencyProfilesContent />
                </main>
                <Footer />
            </div>
        );
    }
}
