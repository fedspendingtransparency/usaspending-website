/**
 * Button.jsx
 * Created by Nick Torres 2/1/23
 */

import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    buttonSize: PropTypes.oneOf(['large', 'medium', 'small', 'lg', 'md', 'sm']).isRequired,
    backgroundColor: PropTypes.oneOf(['light', 'dark']).isRequired,
    buttonType: PropTypes.oneOf(['primary', 'primaryIcon', 'secondary', 'secondaryIcon', 'tertiary', 'tertiaryIcon', 'text', 'stacked', 'icon', 'inline', 'intext']).isRequired,
    copy: PropTypes.string.isRequired,
    image: PropTypes.element,
    textAlignment: PropTypes.oneOf(['left', 'center']),
    imageAlignment: PropTypes.oneOf(['left', 'right']),
    additionalClassnames: PropTypes.string,
    onClick: PropTypes.func,
    onKeyUp: PropTypes.func,
    buttonTitle: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    maxWidth: PropTypes.string,
    to: PropTypes.string
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

    // variants
    // PRIMARY
    if (props.buttonType === "primary") {
        classNameList += ' button-type__primary-light ';
    }
    // SECONDARY LIGHT AND DARK
    else if (props.buttonType === "secondary") {
        if (props.backgroundColor === 'light') {
            classNameList += ' button-type__secondary-light ';
        }
        else if (props.backgroundColor === 'dark') {
            classNameList += ' button-type__secondary-dark ';
        }
    }
    // PRIMARY WITH ICON
    else if (props.buttonType === "primaryIcon") {
        if (props.backgroundColor === 'light') {
            if (props.imageAlignment === 'left') {
                classNameList += ' button-type__primary-left-icon-light ';
            }
        }
    }
    // SECONDARY WITH ICON - LEFT ALIGNMENT ONLY
    else if (props.buttonType === "secondaryIcon") {
        if (props.backgroundColor === 'light') {
            if (props.imageAlignment === 'left') {
                classNameList += ' button-type__secondary-left-icon-light ';
            }
        }
        else if (props.backgroundColor === 'dark') {
            if (props.imageAlignment === 'left') {
                classNameList += ' button-type__secondary-left-icon-dark ';
            }
        }
    }
    // TERTIARY
    else if (props.buttonType === "tertiary") {
        classNameList += ' button-type__tertiary-light ';
    }
    // TERTIARY LIGHT and ICON LEFT LIGHT
    else if (props.buttonType === "tertiaryIcon") {
        if (props.imageAlignment === 'left') {
            if (props.backgroundColor === 'light') {
                classNameList += ' button-type__tertiary-left-icon-light ';
            }
        }
    }
    // TEXT LIGHT LEFT/RIGHT/NO ICON
    // TEXT DARK LEFT/RIGHT/NO ICON
    else if (props.buttonType === "text") {
        if (props.backgroundColor === 'light') {
            if (props.imageAlignment === 'left') {
                classNameList += ' button-type__text-left-icon-light ';
            }
            else if (props.imageAlignment === 'right') {
                classNameList += ' button-type__text-right-icon-light ';
            }
            else {
                classNameList += ' button-type__text-light ';
            }
        }
        else if (props.backgroundColor === 'dark') {
            if (props.imageAlignment === 'left') {
                classNameList += ' button-type__text-left-icon-dark ';
            }
            else if (props.imageAlignment === 'right') {
                classNameList += ' button-type__text-right-icon-dark ';
            }
            else {
                classNameList += ' button-type__text-dark ';
            }
        }
    }
    // STACKED LIGHT/DARK
    else if (props.buttonType === "stacked") {
        if (props.backgroundColor === 'light') {
            classNameList += ' button-type__stacked-icon-light ';
        }
        else if (props.backgroundColor === 'dark') {
            classNameList += ' button-type__stacked-icon-dark ';
        }
    }
    // ICON LIGHT/DARK
    else if (props.buttonType === "icon") {
        if (props.backgroundColor === 'light') {
            classNameList += ' button-type__icon-light ';
        }
        else if (props.backgroundColor === 'dark') {
            classNameList += ' button-type__icon-dark ';
        }
    }
    // INLINE LIGHT
    else if (props.buttonType === "inline") {
        if (props.imageAlignment === "right") {
            classNameList += ' button-type__inline-right-icon-light ';
        }
    }
    // INTEXT LIGHT
    else if (props.buttonType === "intext") {
        classNameList += ' button-type__intext-light ';
    }

    // text alignment
    if (props.textAlignment === 'left') {
        classNameList += ' button-text__left-align ';
    }
    else if (props.textAlignment === 'center') {
        classNameList += ' button-text__center-align ';
    }

    // ANY ADDITIONAL CLASS NAMES
    if (!props.additionalClassnames === '' && props.additionalClassnames !== null && props.additionalClassnames !== undefined) {
        classNameList += ' ';
        classNameList += props.additionalClassnames;
    }

    if (classNameList.includes('button-type__intext-light')) {
        return (
            <a aria-label={props.buttonTitle} className={classNameList} tabIndex="0" onKeyUp={props.onKeyUp} onClick={props.onClick} disabled={props.disabled} style={{ maxWidth: props.maxWidth }} target="_blank" rel="noopener noreferrer" href={props.to}>{props.copy}</a>
        );
    }
    else if (classNameList.includes('left-icon')) {
        return (
            <button aria-label={props.buttonTitle} className={classNameList} tabIndex="0" onClick={props.onClick} disabled={props.disabled} style={{ maxWidth: props.maxWidth }}>{props.image}{props.copy}</button>
        );
    }
    else if (classNameList.includes('right-icon')) {
        return (
            <button aria-label={props.buttonTitle} className={classNameList} tabIndex="0" onClick={props.onClick} disabled={props.disabled} style={{ maxWidth: props.maxWidth }}>{props.copy}{props.image}</button>
        );
    }
    else if (classNameList.includes('stacked-icon')) {
        return (
            <button aria-label={props.buttonTitle} className={classNameList} tabIndex="0" onClick={props.onClick} disabled={props.disabled} style={{ maxWidth: props.maxWidth }}><div className="stacked-button__only-image">{props.image}</div><div className="stacked-button__only-text">{props.copy}</div></button>
        );
    }
    else if (classNameList.includes('icon-light') || classNameList.includes('icon-dark')) {
        return (
            <button aria-label={props.buttonTitle} className={classNameList} tabIndex="0" onClick={props.onClick} disabled={props.disabled} style={{ maxWidth: props.maxWidth }}>{props.image}</button>
        );
    }
    return (
        <button aria-label={props.buttonTitle} className={classNameList} tabIndex="0" onClick={props.onClick} disabled={props.disabled} style={{ maxWidth: props.maxWidth }}>{props.copy}</button>
    );
};

Button.propTypes = propTypes;
export default Button;
