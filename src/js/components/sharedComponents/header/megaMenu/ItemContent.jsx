import React from "react";
import { useDispatch } from 'react-redux';
import { FlexGridRow } from 'data-transparency-ui';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uniqueId } from 'lodash';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import * as glossaryActions from 'redux/actions/glossary/glossaryActions';
import * as slideoutActions from 'redux/actions/slideouts/slideoutActions';
import FadeContents from "./FadeContents";

const ItemContent = React.memo(({
    navbarConfig,
    menuIndex,
    prevIndex,
    closeDropdown,
    direction
}) => {
    const dispatch = useDispatch();

    const openATD = (e) => {
        dispatch(aboutTheDataActions.showAboutTheData());
        dispatch(slideoutActions.setLastOpenedSlideout('atd'));
        e.preventDefault();
    };

    const openGlossary = (e) => {
        dispatch(glossaryActions.showGlossary());
        dispatch(slideoutActions.setLastOpenedSlideout('glossary'));
        e.preventDefault();
    };

    return <>
        {navbarConfig.map((section, i) => {
            if (i <= 0) {
                // eslint-disable-next-line array-callback-return
                return;
            }

            const {
                section1Items,
                section2Items,
                section3Items
            } = section;

            const section1Title = section.section1Options[i]?.title;
            const section2Title = section.section2Options[i]?.title;
            const section3Title = section.section3Options[i]?.title;
            const section1Sub = section.section1Options[i]?.sub;
            const section2Sub = section.section2Options[i]?.sub;
            const section1Icon = section.section1Options[i]?.icon;
            const section2Icon = section.section2Options[i]?.icon;
            const section3Icon = section.section3Options[i]?.icon;

            // eslint-disable-next-line consistent-return
            return (
                <FadeContents hide={menuIndex !== i} direction={direction}>
                    {/* the contents of the dropdown should be hidden if the content doesn't match to the prev or current menu item */}
                    <div
                        style={prevIndex !== i && menuIndex !== i ? { display: "none" } : {}}
                        className="dropdown-section__wrapper"
                        key={uniqueId()}>
                        <div className={menuIndex === 1 ? "dropdown-section__top-columns undo__bottom-padding" : "dropdown-section__top-columns"}>
                            <div
                                key={uniqueId()}
                                className="dropdown-section first-dropdown-section"
                                data-first-dropdown-section>
                                {section1Icon && section1Icon !== null && section1Icon !== '' ?
                                    <FontAwesomeIcon
                                        role="presentation"
                                        icon={section1Icon}
                                        style={{ width: "18px", height: "18px" }} /> : ''}
                                <div>
                                    <p className="dropdown-section__section-title">{section1Title}</p>
                                    {section1Sub !== null && section1Sub !== undefined && section1Sub !== '' ?
                                        <span className="dropdown-section__section-subtitle">{section1Sub}</span> : ''}
                                    <ul className="dropdown-section__section-list">
                                        {section1Items?.map((item, index) => <>
                                            <li
                                                key={`link-${uniqueId(index)}`}
                                                className={menuIndex > 1 ? 'list__extra-padding' : ''}>
                                                <Link className="dropdown--item__link" to={item.url} target={item.shouldOpenNewTab ? "_blank" : null} rel={item.shouldOpenNewTab ? "noopener noreferrer" : null}>
                                                    {item.icon && item.icon !== '' && item.icon !== null ?
                                                        <FontAwesomeIcon
                                                            role="presentation"
                                                            icon={item.icon}
                                                            style={{ width: "20px", height: "20px" }} /> : ''}
                                                    <div className="dropdown-item__link-desc">
                                                        <div className="dropdown-item__link-label">
                                                            {item.label}
                                                            <span
                                                                className="dropdown-item__description">{item.description}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        </>)}
                                    </ul>
                                </div>
                            </div>
                            <div key={uniqueId()} className="dropdown-section">
                                <div className={menuIndex > 1 ? "dropdown-section__alternate-top" : ""}>
                                    {section2Icon && section2Icon !== null && section2Icon !== '' ?
                                        <FontAwesomeIcon
                                            role="presentation"
                                            icon={section2Icon}
                                            style={{ width: "18px", height: "18px" }} /> : ''}
                                    <div>
                                        <p className="dropdown-section__section-title">{section2Title}</p>
                                        {section2Sub !== null && section2Sub !== undefined && section2Sub !== '' ?
                                            <span
                                                className="dropdown-section__section-subtitle">{section2Sub}
                                            </span> : ''}
                                        <ul className="dropdown-section__section-list">
                                            {section2Items?.map((item, index) => <>
                                                <li
                                                    key={`second-section-link-${uniqueId(index)}`}
                                                    className={menuIndex > 1 ? 'list__extra-padding' : ''}>
                                                    <Link
                                                        className="dropdown--item__link"
                                                        to={item.url === "?about-the-data" || item.url === "?glossary" ? '' : item.url}
                                                        onClick={(e) => {
                                                            if (item.url === '?about-the-data') {
                                                                openATD(e);
                                                            }
                                                            else if (item.url === '?glossary') {
                                                                openGlossary(e);
                                                            }
                                                        }}
                                                        target={item.shouldOpenNewTab ? "_blank" : null}
                                                        rel={item.shouldOpenNewTab ? "noopener noreferrer" : null}
                                                        onMouseUp={(e) => {
                                                            if (item.url === '?about-the-data') {
                                                                openATD(e);
                                                            }
                                                            else if (item.url === '?glossary') {
                                                                openGlossary(e);
                                                            }
                                                        }}>
                                                        {item.icon && item.icon !== '' && item.icon !== null ?
                                                            <FontAwesomeIcon
                                                                role="presentation"
                                                                size="lg"
                                                                className=""
                                                                icon={item.icon}
                                                                style={{
                                                                    width: "20px",
                                                                    height: "20px"
                                                                }} /> : ''}
                                                        <div className="dropdown-item__link-desc">
                                                            <div className="dropdown-item__link-label">
                                                                {item.label}
                                                                <span
                                                                    className="dropdown-item__description">{item.description}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {section3Title !== null && section3Title !== undefined && section3Title !== '' ?
                            <div key={uniqueId()} className="dropdown-section dropdown-section__bottom-portion">
                                <div className={menuIndex > 1 ? "dropdown-section__alternate-top" : ""}>
                                    {section3Icon && section3Icon !== null && section3Icon !== '' ?
                                        <FontAwesomeIcon
                                            role="presentation"
                                            style={{ width: "18px", height: "18px" }}
                                            icon={section3Icon} /> : ''}
                                    <div>
                                        <p className="dropdown-section__section-title">{section3Title}</p>
                                        <ul className="dropdown-section__section-list">
                                            {section3Items?.map((item, index) => <>
                                                <li
                                                    key={`third-section-link-${uniqueId(index)}`}
                                                    className={menuIndex > 2 ? 'list__extra-padding third__item-margin' : 'list__extra-padding'}>
                                                    <FlexGridRow width={6} desktop={6}>
                                                        <a
                                                            className="dropdown--item__link"
                                                            href={item.url}
                                                            onKeyDown={(e) => {
                                                                if (item.label === 'Release Notes' && e.key === 'Tab') {
                                                                    closeDropdown();
                                                                }
                                                            }}
                                                            target={item.shouldOpenNewTab ? "_blank" : null}
                                                            rel={item.shouldOpenNewTab ? "noopener noreferrer" : null}>
                                                            {item.icon && item.icon !== '' && item.icon !== null ?
                                                                <FontAwesomeIcon
                                                                    role="presentation"
                                                                    style={{ width: "20px", height: "20px" }}
                                                                    icon={item.icon} /> : ''}
                                                            <div className="dropdown-item__link-desc">
                                                                <div className="dropdown-item__link-label">
                                                                    {item.label}
                                                                    <span
                                                                        className="dropdown-item__description">{item.description}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </FlexGridRow>
                                                </li>
                                            </>)}
                                        </ul>
                                    </div>
                                </div>
                            </div> : ''}
                    </div>
                </FadeContents>
            );
        })}
    </>;
});

export default ItemContent;
