import React from "react";
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
    section3Sub,
    section1Icon,
    section2Icon,
    section3Icon
}) => (
    <div className="dropdown-section__wrapper">
        <div className="dropdown-section" data-first-dropdown-section>
            <div>
                {section1Icon ? <FontAwesomeIcon className="" icon={section1Icon} /> : ''}<p>{section1Title}</p>
                {section1Sub !== null && section1Sub !== undefined && section1Sub !== '' ?
                    <span className="dropdown-section__section-subtitle">{section1Sub}</span> : ''}
                <ul>
                    {section1Items.map((item, index) => (
                        <li key={`link-${index}`}>
                            <FontAwesomeIcon className="" icon={item.icon} /><Link to={item.url}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="dropdown-section">
            <div>
                {section2Icon ? <FontAwesomeIcon className="" icon={section2Icon} /> : ''}<p>{section2Title}</p>
                {section2Sub !== null && section2Sub !== undefined && section2Sub !== '' ?
                    <span className="dropdown-section__section-subtitle">{section2Sub}</span> : ''}
                <ul>
                    {section2Items.map((item, index) => (
                        <li key={`link-${index}`}>
                            <FontAwesomeIcon className="" icon={item.icon} /><Link to={item.url}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        {section3Title !== null && section3Title !== undefined && section3Title !== '' ?
            <div className="dropdown-section">
                <div>
                    {section3Icon ? <FontAwesomeIcon className="" icon={section3Icon} /> : ''}<p>{section3Title}</p>
                    {section3Sub !== null && section3Sub !== undefined && section3Sub !== '' ?
                        <span className="dropdown-section__section-subtitle">{section3Sub}</span> : ''}
                    <ul>
                        {section3Items.map((item, index) => (
                            <li key={`link-${index}`}>
                                <Link to={item.url}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div> : ''}
    </div>

);

export default ItemContent;
