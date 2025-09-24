/**
 * ContentPageHeader.jsx
 * Created by J.D. House 9/15/25
 */

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { FlexGridRow, FlexGridCol, ShareIcon } from 'data-transparency-ui';
import { useDispatch } from 'react-redux';

import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { throttle } from 'lodash-es';
import { showModal } from '../../../redux/actions/modal/modalActions';

const propTypes = {
    slug: PropTypes.string,
    className: PropTypes.string,
    image: PropTypes.string,
    kicker: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    shareOptions: PropTypes.object
};

const ContentPageHeader = ({
    slug,
    className = "",
    image,
    kicker,
    title,
    body,
    shareOptions = null
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const onShareClick = (name) => {
        const emailArgs = {
            subject: shareOptions.emailSubject,
            body: shareOptions.emailBody
        };
        handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);
    return (
        <section className={`${className}__hero`}>
            <FlexGridRow className="grid-content">
                <FlexGridCol
                    desktop={6}
                    tablet={0}
                    mobile={0}>
                    <div className={`${className}__column-one`}>
                        <div className={`${className}__img-container`}>
                            <img className={`${className}__img`} src={image} alt="placeholder" />
                        </div>
                    </div>
                </FlexGridCol>
                <FlexGridCol
                    desktop={6}
                    tablet={12}
                    mobile={12}>
                    <div className={`${className}__column-two`}>
                        <div className={`${className}__column-two-container`}>
                            <div className={`${className}__column-two-kicker`}>{kicker}</div>
                            <div className={`${className}__column-two-title`}>{title}</div>
                            <div className={`${className}__column-two-body`}>{body}</div>

                            { shareOptions &&
                                <div className={`${className}__column-share-icon`}>
                                    <ShareIcon
                                        url={getBaseUrl(slug)}
                                        onShareOptionClick={onShareClick}
                                        colors={{ backgroundColor: "#edf0ff", color: "#2378c3" }}
                                        dropdownDirection={isMobile ? 'right' : 'left'}
                                        classNames="no-margin-left"
                                        noShareText />
                                </div>
                            }
                        </div>
                    </div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};
ContentPageHeader.propTypes = propTypes;
export default ContentPageHeader;
