/* CategoriesList.jsx */
/* Created by Andrea Blackwell November 8, 2024 */

import React from "react";
import PropTypes from 'prop-types';

const propTypes = {
    categories: PropTypes.object,
    setLevel3: PropTypes.func
};

const CategoriesList = ({ categories, setLevel3 }) => (
    <>
        {categories.map((item) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <a
                onClick={(e) => setLevel3(e, item.component)}
                onKeyUp={((e) => (e.key === "Enter" ? setLevel3(e, item.component) : ''))}>
                {item.title}
            </a>
        ))};
    </>
);

CategoriesList.propTypes = propTypes;
export default CategoriesList;
