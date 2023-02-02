/**
 * Button.jsx
 * Created by Nick Torres 2/1/23
 */

import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    backgroundColor: PropTypes.oneOf(['light', 'dark']),
    buttonType: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'text', 'stacked', 'icon', 'inline', 'intext']),
    buttonSize: PropTypes.oneOf(['large', 'medium', 'small', 'lg', 'md', 'sm']),
    copy: PropTypes.string,
    image: PropTypes.element,
    textAlignment: PropTypes.oneOf(['left', 'center', 'right']),
    imageAlignment: PropTypes.oneOf(['left', 'right'])
};

const Button = (props) => {
    console.debug(props);
    return (
        <button>test</button>
    );
};

Button.propTypes = propTypes;
export default Button;
