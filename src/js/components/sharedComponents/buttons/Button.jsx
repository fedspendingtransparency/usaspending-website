/**
 * Button.jsx
 * Created by Nick Torres 2/1/23
 */

import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    buttonSize: PropTypes.oneOf(['large', 'medium', 'small', 'lg', 'md', 'sm']).isRequired,
    backgroundColor: PropTypes.oneOf(['light', 'dark']).isRequired,
    buttonType: PropTypes.oneOf(['primary', 'primaryIcon', 'secondary', 'secondaryIcon', 'tertiary', 'text', 'stacked', 'icon', 'inline', 'intext']).isRequired,
    copy: PropTypes.string.isRequired,
    image: PropTypes.element,
    textAlignment: PropTypes.oneOf(['left', 'center']),
    imageAlignment: PropTypes.oneOf(['left', 'right']),
    additionalClassnames: PropTypes.string,
    onClick: PropTypes.func
};

const Button = (props) => {
    let classNameList = "";

    // button size
    if (props.buttonSize === 'large' || props.buttonSize === 'lg') {
        classNameList += ' button__lg ';
    }
    else if (props.buttonSize === 'medium' || props.buttonSize === 'md') {
        classNameList += ' button__md ';
    }
    else if (props.buttonSize === 'small' || props.buttonSize === 'sm') {
        classNameList += ' button__sm ';
    }

    // text alignment
    if (props.textAlignment === 'left') {
        classNameList += ' button-text__left-align';
    }
    else if (props.textAlignment === 'center') {
        classNameList += ' button-text__center-align';
    }

    // variants
    if (props.buttonType === "primary") {
        classNameList += ' button-type__primary-light ';
    }
    else if (props.buttonType === "secondary") {
        if (props.backgroundColor === 'light') {
            classNameList += ' button-type__secondary-light ';
        }
        else if (props.backgroundColor === 'dark') {
            classNameList += ' button-type__secondary-dark ';
        }
    }
    else if (props.buttonType === "primaryIcon") {
        classNameList += ' button-type__primaryIcon-light ';
    }
    else if (props.buttonType === "secondaryIcon") {
        if (props.backgroundColor === 'light') {
            classNameList += ' button-type__secondaryIcon-light ';
        }
        else if (props.backgroundColor === 'dark') {
            classNameList += ' button-type__secondaryIcon-dark ';
        }
    }
    else if (props.buttonType === "tertiary") {
        classNameList += ' button-type__tertiary-light ';
    }
    else if (props.buttonType === "text") {
        if (props.backgroundColor === 'light') {
            if (props.imageAlignment === 'left') {
                classNameList += ' button-type__text-left-light ';
            }
            else if (props.imageAlignment === 'right') {
                classNameList += ' button-type__text-right-light ';
            }
            else {
                classNameList += ' button-type__text-light ';
            }
        }
        else if (props.backgroundColor === 'dark ') {
            if (props.imageAlignment === 'left') {
                classNameList += ' button-type__text-left-dark ';
            }
            else if (props.imageAlignment === 'right') {
                classNameList += ' button-type__text-right-dark ';
            }
            else {
                classNameList += ' button-type__text-dark ';
            }
        }
    }
    else if (props.buttonType === "stacked") {
        if (props.backgroundColor === 'light') {
            classNameList += ' button-type__stacked-light ';
        }
        else if (props.backgroundColor === 'dark') {
            classNameList += ' button-type__stacked-dark ';
        }
    }
    else if (props.buttonType === "icon") {
        if (props.backgroundColor === 'light') {
            classNameList += ' button-type__icon-light ';
        }
        else if (props.backgroundColor === 'dark') {
            classNameList += ' button-type__icon-dark ';
        }
    }
    else if (props.buttonType === "inline") {
        classNameList += ' button-type__inline-light ';
    }
    else if (props.buttonType === "intext") {
        classNameList += ' button-type__intext-light ';
    }
    console.debug(classNameList);
    if (!props.additionalClassnames?.empty() && props.additionalClassnames !== null && props.additionalClassnames !== undefined) {
        classNameList += ' ';
        classNameList += props.additionalClassnames;
    }

    console.debug("after: ", classNameList);
    return (
        <button className={classNameList} tabIndex="0" onClick={props.onClick}>{props.copy}</button>
    );
};

Button.propTypes = propTypes;
export default Button;
