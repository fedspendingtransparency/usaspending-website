/**
 * AboutTheDataDrilldown.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React, { useEffect, useState, Suspense } from 'react';
import { handleShareOptionClick } from 'helpers/socialShare';
import { ShareIcon } from "data-transparency-ui";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingWrapper } from "../sharedComponents/Loading";

const propTypes = {
    section: PropTypes.string,
    name: PropTypes.string,
    clearDrilldown: PropTypes.func,
    slug: PropTypes.string
};

const AboutTheDataDrilldown = ({
    section, name, clearDrilldown, slug
}) => {
    // figure out if there is a param
    const stripUrl = () => {
        const url = new URL(window.location.href);
        if (url.search !== '') {
            const test = window.location.href.includes("?");
            if (test) {
                return `${window.location.href}&about-the-data=`;
            }
        }
        return `${window.location.href}?about-the-data=`;
    };
    const value = stripUrl();

    const onShareClick = (optionName) => {
        const emailSubject = `USAspending.gov Statement About the Data: ${name}`;
        const emailArgs = {
            subject: encodeURIComponent(`${emailSubject}`),
            body: `View this statement about the data on USAspending.gov: ${`${value}${slug}`}`
        };
        const placeHolder = `${value}${slug}`;
        handleShareOptionClick(optionName, placeHolder, emailArgs);
    };

    const [drilldownComponent, setDrilldownComponent] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            clearDrilldown();
        }
    };

    useEffect(() => {
        if (slug?.length > 0) {
            // lazy load the md files
            const Component = React.lazy(() => import(/* webpackPreload: true */ `../../../content/about-the-data/${slug}`).catch((err) => {
                setIsError(true);
                console.log(err);
            }));

            setDrilldownComponent(<Component />);
        }
    }, [slug]);

    return (<>
        <Suspense fallback={<LoadingWrapper isLoading />}>
            <div className="atd__back" role="button" onKeyUp={(e) => handleKeyUp(e)} tabIndex="0" onClick={() => clearDrilldown()}>
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
                {isError ?
                    <p>Error Loading Data</p>
                    :
                    <div className="atd__copy">{drilldownComponent}</div>
                }
            </div>
        </Suspense>
    </>);
};

AboutTheDataDrilldown.propTypes = propTypes;
export default AboutTheDataDrilldown;
