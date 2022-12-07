/**
 * AboutTheDataDrilldown.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React from 'react';
import { AngleLeft } from 'components/sharedComponents/icons/Icons';
import { FlexGridRow, ShareIcon } from "data-transparency-ui";
import PropTypes from 'prop-types';
import { LoadingWrapper } from "../sharedComponents/Loading";
import { getBaseUrl } from '../../helpers/socialShare';

const propTypes = {
    section: PropTypes.string,
    name: PropTypes.string,
    clearDrilldown: PropTypes.func,
    slug: PropTypes.string,
    entry: PropTypes.element
};

const AboutTheDataDrilldown = ({
    section, name, clearDrilldown, entry
}) => {
    const slug = "?about-the-data";

    const onShareClick = () => {
        console.debug("testing... ", name);
        // const emailSubject = `USAspending.gov Statement About the Data ${param}`;
        // const emailArgs = {
        //     subject: `${emailSubject}`,
        //     body: `View this statement about the data on USAspending.gov ${getBaseUrl(slug)}`
        // };
        // handleShareOptionClick(param, slug, emailArgs);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            clearDrilldown();
        }
    };

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
                    url={getBaseUrl(slug)}
                    onShareOptionClick={onShareClick}
                    colors={{ backgroundColor: "#00687d", color: "#dfe1e2" }} />
            </div>
        </FlexGridRow>

        {entry ?
            <div className="atd__drilldown">
                <div className="atd__overline">{ section }</div>
                <div className="atd__drilldown__heading">{ name }</div>
                <div className="atd__copy">{entry}</div>
            </div>
            :
            <><LoadingWrapper isLoading /></>}
    </>);
};

AboutTheDataDrilldown.propTypes = propTypes;
export default AboutTheDataDrilldown;
