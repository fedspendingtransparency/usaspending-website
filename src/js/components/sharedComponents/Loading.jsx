import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageHeader } from 'data-transparency-ui';

import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';

import Header from 'components/sharedComponents/header/Header';
import Footer from 'containers/Footer';

// eslint-disable-next-line import/prefer-default-export
export const LoadingWrapper = ({
    msg = "Loading",
    isLoading,
    includeHeader = false,
    children,
    includeFooter = false
}) => {
    if (isLoading) {
        return (
        // TODO: [DEV-5940] Make a nice App Level Loading Component.
            <>
                {includeHeader && (
                    <>
                        <Header />
                        <PageHeader title="--" stickyBreakPoint={getStickyBreakPointForSidebar()}>
                            <div className="page__loading">
                                <FontAwesomeIcon icon="spinner" spin size="lg" />
                                <div>{`${msg}`}</div>
                                <div className="page__ellipsis-container">
                                    <div className="page__ellipsis" />
                                </div>
                            </div>
                            {includeFooter && (<Footer pageName="Loading" />)}
                        </PageHeader>
                    </>
                )}
                <div className="page__loading">
                    <FontAwesomeIcon icon="spinner" spin size="lg" />
                    <div>{`${msg}`}</div>
                    <div className="page__ellipsis-container">
                        <div className="page__ellipsis" />
                    </div>
                </div>
                {includeFooter && (<Footer pageName="Loading" />)}
            </>
        );
    }

    return children;
};

LoadingWrapper.propTypes = {
    msg: PropTypes.string,
    isLoading: PropTypes.bool,
    children: PropTypes.node,
    includeFooter: PropTypes.bool,
    includeHeader: PropTypes.bool
};
