/**
 * AgencyPage.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ShareIcon } from 'data-transparency-ui';

import { agencyPageMetaTags } from 'helpers/metaTagHelper';

import PageWrapper from 'components/sharedComponents/PageWrapper';
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
            body: `View the spending activity of this agency on USAspending.gov: ${getBaseUrl(`agency/${this.props.agency.id}`)}`
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
            <PageWrapper
                pageName="Agency Profile"
                classNames="usa-da-agency-page"
                overLine="Agency Profile"
                title={overview?.name}
                metaTagProps={agencyPageMetaTags(overview)}
                toolBarComponents={[
                    <ShareIcon
                        onShareOptionClick={this.handleShare}
                        url={getBaseUrl(`agency/${id}`)} />
                ]}>
                <main
                    id="main-content"
                    className="main-content">
                    {content}
                </main>
            </PageWrapper>
        );
    }
}

AgencyPage.propTypes = propTypes;
