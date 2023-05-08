import React from "react";
import { Link } from "react-router-dom";

const ItemContent = ({
    items, section1Title, section2Title, section3Title
}) => (
    <div>
        <div className="dropdown-section" data-first-dropdown-section>
            <div>
                <p>{section1Title}</p>
                <ul>
                    {items.map((item) => (
                        <li>
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
                    <li>
                        <a href="/">Stripe Atlas &rsaquo;</a>
                    </li>
                    <li>
                        <a href="/">Stripe Home &rsaquo;</a>
                    </li>
                </ul>
            </div>
        </div>
        {section3Title !== null && section3Title !== undefined && section3Title !== '' ?
            <div className="dropdown-section">
                <div>
                    <p>{section3Title}</p>
                    <ul>
                        <li>
                            <a href="/">Stripe Atlas &rsaquo;</a>
                        </li>
                        <li>
                            <a href="/">Stripe Home &rsaquo;</a>
                        </li>
                    </ul>
                </div>
            </div> : ''}
    </div>

);

export default ItemContent;
