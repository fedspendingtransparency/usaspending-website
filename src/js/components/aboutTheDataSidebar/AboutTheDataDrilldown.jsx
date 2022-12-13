/**
 * AboutTheDataDrilldown.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React, { useEffect, useState, Suspense } from 'react';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { AngleLeft } from 'components/sharedComponents/icons/Icons';
import { FlexGridRow, ShareIcon } from "data-transparency-ui";
import PropTypes from 'prop-types';
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
    const onShareClick = (optionName) => {
        const emailSubject = `USAspending.gov Statement About the Data ${name}`;
        const emailArgs = {
            subject: `${emailSubject}`,
            body: `View this statement about the data on USAspending.gov ${`${getBaseUrl('?about-the-data=')}${slug}`}`
        };
        handleShareOptionClick(optionName, `${getBaseUrl('?about-the-data=')}${slug}`, emailArgs);
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
        <FlexGridRow width={12}>
            <div className="atd__back" role="button" onKeyUp={(e) => handleKeyUp(e)} tabIndex="0" onClick={() => clearDrilldown()}>
                <AngleLeft alt="Back" />
                <span className="atd__back__label">
                Back
                </span>
            </div>
            <div className="atd__share__icon">
                <ShareIcon
                    url={getBaseUrl(`?about-the-data=${slug}`)}
                    onShareOptionClick={onShareClick}
                    colors={{ backgroundColor: "#00687d", color: "#dfe1e2" }} />
            </div>
        </FlexGridRow>

        {!isError &&
            <Suspense fallback={<LoadingWrapper isLoading />}>
                <div className="atd__drilldown">
                    <div className="atd__overline">{ section }</div>
                    <div className="atd__drilldown__heading">{ name }</div>
                    <div className="atd__copy">{ drilldownComponent }</div>
                </div>
            </Suspense>
        }
    </>);
};

AboutTheDataDrilldown.propTypes = propTypes;
export default AboutTheDataDrilldown;
