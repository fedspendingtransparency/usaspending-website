/**
 * AboutTheDataDrilldown.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React, { useEffect, Suspense, useMemo, lazy } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router';
import { ShareIcon } from "data-transparency-ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { handleShareOptionClick } from 'helpers/socialShare';
import { LoadingWrapper } from "../sharedComponents/Loading";
import { showModal } from '../../redux/actions/modal/modalActions';

const drilldownComponent = (slug) => lazy(() =>  import(
    /* webpackPreload: true */ `../../../content/about-the-data/${slug}`
));

const propTypes = {
    section: PropTypes.string,
    name: PropTypes.string,
    clearDrilldown: PropTypes.func,
    slug: PropTypes.string
};

const AboutTheDataDrilldown = ({
    section, name, clearDrilldown, slug
}) => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const value = useMemo(() => {
        const newUrlString = searchParams ? `?${searchParams?.toString()}` : '';
        const url = window.location.href.split("?");
        const path = url[0];

        if (path) {
            if (searchParams?.size > 0) {
                return `${path}${newUrlString}&about-the-data=`;
            }
            return `${path}?about-the-data=`;
        }
        return null;
    }, [searchParams]);

    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };

    const onShareClick = (optionName) => {
        // remove existing params
        const emailSubject = `USAspending.gov Statement About the Data: ${name}`;
        const emailArgs = {
            subject: encodeURIComponent(`${emailSubject}`),
            body: `View this statement about the data on USAspending.gov: ${`${value}${slug}`}`
        };
        const placeholder = `${value}${slug}`;
        handleShareOptionClick(optionName, placeholder, emailArgs, handleShareDispatch);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            clearDrilldown();
        }
    };

    useEffect(() => {
        if (searchParams) {
            searchParams.delete('about-the-data');
            searchParams.delete('glossary');
        }
    }, [searchParams]);

    const DrilldownComponent = drilldownComponent(slug);

    return (
        <>
            <Suspense fallback={<LoadingWrapper isLoading />}>
                <div
                    className="atd__back"
                    role="button"
                    onKeyUp={handleKeyUp}
                    tabIndex="0"
                    onClick={clearDrilldown}>
                    <FontAwesomeIcon icon="chevron-left" className="left-chevron-icon" alt="Back" />
                    <span className="atd__back__label">
                        Back
                    </span>
                </div>
                <div className="atd__share__icon">
                    <ShareIcon
                        url={`${value}${slug}`}
                        onShareOptionClick={onShareClick}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                onShareClick();
                            }
                        }}
                        colors={{ backgroundColor: "#00687d", color: "#dfe1e2" }}
                        noShareText />
                </div>
                <div className="atd__drilldown">
                    <div className="atd__overline">{ section }</div>
                    <div className="atd__drilldown__heading">{ name }</div>
                    <div className="atd__copy">
                        {/* suppressing rule due to webpack exception */}
                        {/* eslint-disable-next-line react-hooks/static-components */}
                        <DrilldownComponent />
                    </div>
                </div>
            </Suspense>
        </>
    );
};

AboutTheDataDrilldown.propTypes = propTypes;
export default AboutTheDataDrilldown;
