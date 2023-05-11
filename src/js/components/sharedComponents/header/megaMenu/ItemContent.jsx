import React from "react";
import { FlexGridRow } from 'data-transparency-ui';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ItemContent = ({
    section1Title,
    section2Title,
    section3Title,
    section1Items,
    section2Items,
    section3Items,
    section1Sub,
    section2Sub,
    section1Icon,
    section2Icon,
    section3Icon
}) => (
    <div className="dropdown-section__wrapper">
        <div className="dropdown-section__top-columns">
            <div className="dropdown-section first-dropdown-section" data-first-dropdown-section>
                {section1Icon && section1Icon !== null && section1Icon !== '' ? <FontAwesomeIcon size="lg" className="" icon={section1Icon} /> : ''}
                <div>
                    <p className="dropdown-section__section-title">{section1Title}</p>
                    {section1Sub !== null && section1Sub !== undefined && section1Sub !== '' ?
                        <span className="dropdown-section__section-subtitle">{section1Sub}</span> : ''}
                    <ul className="dropdown-section__section-list">
                        {section1Items.map((item, index) => (
                            <>
                                <li key={`link-${index}`}>
                                    {item.icon && item.icon !== '' && item.icon !== null ? <FontAwesomeIcon size="lg" className="" icon={item.icon} /> : ''}
                                    <div className="dropdown-item__link-desc">
                                        <Link className="dropdown-item__link-label" to={item.url}>{item.label}</Link>
                                        <span className="dropdown-item__description">{item.description}</span>
                                    </div>
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="dropdown-section">
                <div className="dropdown-section__alternate-top">
                    {section2Icon && section2Icon !== null && section2Icon !== '' ? <FontAwesomeIcon size="lg" className="" icon={section2Icon} /> : ''}
                    <div>
                        <p className="dropdown-section__section-title">{section2Title}</p>
                        {section2Sub !== null && section2Sub !== undefined && section2Sub !== '' ?
                            <span className="dropdown-section__section-subtitle">{section2Sub}</span> : ''}
                        <ul className="dropdown-section__section-list">
                            {section2Items.map((item, index) => (
                                <>
                                    <li key={`second-section-link-${index}`}>
                                        {item.icon && item.icon !== '' && item.icon !== null ? <FontAwesomeIcon size="lg" className="" icon={item.icon} /> : ''}
                                        <div className="dropdown-item__link-desc">
                                            <Link className="dropdown-item__link-label" to={item.url}>{item.label}</Link>
                                            <span className="dropdown-item__description">{item.description}</span>
                                        </div>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {section3Title !== null && section3Title !== undefined && section3Title !== '' ?
            <div className="dropdown-section dropdown-section__bottom-portion">
                <div className="dropdown-section__alternate-top">
                    {section3Icon && section3Icon !== null && section3Icon !== '' ? <FontAwesomeIcon size="lg" className="" icon={section3Icon} /> : ''}
                    <div>
                        <p className="dropdown-section__section-title">{section3Title}</p>
                        <div className="dropdown-section__section-list">
                            {section3Items.map((item, index) => (
                                <FlexGridRow desktop={7} width={7}>
                                    <div className="dropdown-section__section-list-item" key={`third-section-link-${index}`}>
                                        <div className="dropdown-item__link-desc">
                                            <Link className="dropdown-item__link-label" to={item.url}>{item.label}</Link>
                                            <div className="dropdown-item__description">{item.description}</div>
                                        </div>
                                    </div>
                                </FlexGridRow>
                            ))}
                        </div>
                    </div>
                </div>
            </div> : ''}
    </div>

);

export default ItemContent;
