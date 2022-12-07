/**
 * AboutTheDataDrilldown.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React, {useEffect, useState} from 'react';
import { AngleLeft } from 'components/sharedComponents/icons/Icons';
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
    const [drilldownComponent, setDrilldownComponent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            clearDrilldown();
        }
    };

    useEffect(() => {
        if (slug?.length > 0) {
            // lazy load the md files
            const Component = React.lazy(() => import(/* webpackPreload: true */ `../../../content/about-the-data/${slug}.md`).then((comp) => comp));
            if (Component) {
                setIsLoading(false);
                setDrilldownComponent(<Component />);
            } else {
                setIsError(true);
            }
        }
    }, [slug]);


    return (<>
        <div className="atd__back" role="button" onKeyUp={(e) => handleKeyUp(e)} tabIndex="0" onClick={() => clearDrilldown()}>
            <AngleLeft alt="Back" />
            <span className="atd__back__label">
                Back
            </span>
        </div>
        {isLoading ?
            <><LoadingWrapper isLoading /></>
            :
            <div className="atd__drilldown">
                <div className="atd__overline">{ section }</div>
                <div className="atd__drilldown__heading">{ name }</div>
                {/*<div className="atd__copy">{ drilldownComponent }</div>*/}
            </div>
        }
    </>);
};

AboutTheDataDrilldown.propTypes = propTypes;
export default AboutTheDataDrilldown;
