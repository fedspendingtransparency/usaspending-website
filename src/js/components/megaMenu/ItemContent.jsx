import React from "react";
import { Link } from "react-router-dom";

const ItemContent = ({items}) => {
    return (
        <div>
            <div className="dropdown-section" data-first-dropdown-section>
                <div>
                    <p>Section 1</p>
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
                    <p>Section 2</p>
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


        </div>

    )
}

export default ItemContent;
