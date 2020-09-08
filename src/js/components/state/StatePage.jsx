/**
 * StatePage.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { capitalize } from 'lodash';
import { statePageMetaTags } from 'helpers/metaTagHelper';

import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';
import Header from 'containers/shared/HeaderContainer';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Error from 'components/sharedComponents/Error';
import { LoadingWrapper } from "components/sharedComponents/Loading";
import { getBaseUrl } from "helpers/socialShare";

import StateContent from './StateContent';

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    id: PropTypes.string,
    stateProfile: PropTypes.object,
    pickedFy: PropTypes.func
};

export default class StatePage extends React.Component {
    render() {
        const { id, stateProfile } = this.props;
        const slug = `state/${id}/${stateProfile.fy}`;

        let content = <StateContent {...this.props} />;
        if (this.props.error) {
            content = (
                <Error
                    title="Invalid State"
                    message="The state ID provided is invalid. Please check the ID and try again." />
            );
        }
        return (
            <div className="usa-da-state-page">
                {stateProfile.overview && <MetaTags {...statePageMetaTags(stateProfile.overview)} />}
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            {capitalize(this.props.stateProfile.overview.type)} Profile
                        </h1>
                    </div>
                    <div className="sticky-header__toolbar">
                        <ShareIcon
                            slug={slug}
                            email={{
                                subject: `USAspending.gov State Profile: ${stateProfile.overview.name}`,
                                body: `View the spending activity for this state on USAspending.gov: ${getBaseUrl(slug)}`
                            }} />
                    </div>
                </StickyHeader>
                <main
                    id="main-content"
                    className="main-content">
                    <LoadingWrapper isLoading={this.props.loading}>
                        {content}
                    </LoadingWrapper>
                </main>
                <Footer />
            </div>
        );
    }
}

StatePage.propTypes = propTypes;
