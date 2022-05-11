import React, { useState, useEffect } from 'react';
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
    const [dots, updateDots] = useState("...");
    const timeouts = [];

    useEffect(() => {
        if (isLoading) {
            timeouts.push(setTimeout(() => {
                switch (dots.length) {
                    case 2:
                        updateDots("...");
                        break;
                    case 3:
                        updateDots("");
                        break;
                    case 0:
                        updateDots(".");
                        break;
                    default:
                        updateDots("..");
                        break;
                }
            }, 350));
        }

        if (!isLoading) timeouts.forEach((t) => clearTimeout(t));

        return () => timeouts.forEach((t) => clearTimeout(t));
    }, [updateDots, dots, timeouts, isLoading]);

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
                                <h4>{`${msg}${dots}`}</h4>
                            </div>
                            {includeFooter && (<Footer pageName="Loading" />)}
                        </PageHeader>
                    </>
                )}
                <div className="page__loading">
                    <FontAwesomeIcon icon="spinner" spin size="lg" />
                    <h4>{`${msg}${dots}`}</h4>
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
