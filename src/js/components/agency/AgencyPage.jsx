/**
 * AgencyPage.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'data-transparency-ui';

import { agencyPageMetaTags } from 'helpers/metaTagHelper';

import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';


import AgencyLoading from './AgencyLoading';
import AgencyError from './AgencyError';

import AgencyContent from './AgencyContent';

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    id: PropTypes.string,
    agency: PropTypes.object,
    lastUpdate: PropTypes.string
};


export default class AgencyPage extends React.Component {
    handleShare = (name) => {
        handleShareOptionClick(name, `agency/${this.props.agency.id}`, {
            subject: `USAspending.gov Agency Profile: ${this.props.agency.overview.name}`,
            body: `View all of the Federal Account Profiles on USAspending.gov: ${getBaseUrl(`agency/${this.props.agency.id}`)}`
        });
    };

    render() {
        const { id, overview } = this.props.agency;
        let content = <AgencyContent {...this.props} />;
        if (this.props.loading) {
            content = (<AgencyLoading />);
        }
        else if (this.props.error) {
            content = (<AgencyError />);
        }

        return (
            <div className="usa-da-agency-page">
                <MetaTags {...agencyPageMetaTags(overview)} />
                <Header />
                <PageHeader
                    overLine="Agency Profile"
                    title={overview?.name}
                    shareProps={{
                        url: getBaseUrl(`agency/${id}`),
                        onShareOptionClick: this.handleShare
                    }}>
                    <main
                        id="main-content"
                        className="main-content">
                        {content}
                    </main>
                    <Footer />
                </PageHeader>
            </div>
        );
    }
}

AgencyPage.propTypes = propTypes;
