import React from "react";
import { Link } from "react-router-dom";

const ItemContent = ({
    section1Title,
    section2Title,
    section3Title,
    section1Items,
    section2Items,
    section3Items,
    section1Sub,
    section2Sub,
    section3Sub
}) => (
    <div className="dropdown-section__wrapper">
        <div className="dropdown-section" data-first-dropdown-section>
            <div>
                <p>{section1Title}</p>
                <ul>
                    {section1Items.map((item, index) => (
                        <li key={`link-${index}`}>
                            <Link to={item.url}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="dropdown-section">
            <div>
                <p>{section2Title}</p>
                <ul>
                    {section2Items.map((item, index) => (
                        <li key={`link-${index}`}>
                            <Link to={item.url}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        {section3Title !== null && section3Title !== undefined && section3Title !== '' ?
            <div className="dropdown-section">
                <div>
                    <p>{section3Title}</p>
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
