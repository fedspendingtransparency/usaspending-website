import React from "react";
import PropTypes from "prop-types";

const BarValue = ({
    spendingCategory,
    className = 'award-amounts-viz__desc',
    onEnter,
    onLeave = () => {},
    style,
    title,
    number
}) => (
    <div
        // minWidth here ensures that the container of the desc-text is not too scrunched up.
        style={{ ...style, minWidth: '100px' }}
        className={`${className} ${spendingCategory}`}
        role="button"
        tabIndex="0"
        onBlur={onLeave}
        onFocus={onEnter}
        onKeyPress={onEnter}
        onMouseMove={onEnter}
        onMouseEnter={onEnter}
        onMouseDown={onEnter}
        onMouseLeave={onLeave}
        onClick={onEnter}>
        <div className="award-amounts-viz__desc-text">
            <strong>{number}</strong><br />{title}
        </div>
    </div>
);

const BarLabelAndLine = ({
    children,
    spendingCategory,
    labelStyles,
    lineStyles,
    lineClassName = 'award-amounts-viz__line',
    labelClassName = 'award-amounts-viz__label'
}) => (
    <div className={`${labelClassName} ${spendingCategory}`} style={labelStyles}>
        <div className={`${lineClassName} ${spendingCategory}`} style={{ ...lineStyles, minWidth: '4px' }} />
        {children}
    </div>
);

const Bar = ({
    className = 'award-amounts-viz__bar',
    children,
    spendingCategory,
    onEnter,
    onLeave,
    barWrapperStyles = {},
    barStyles
}) => (
    <div
        role="button"
        tabIndex="0"
        style={barWrapperStyles}
        className={`award-amounts-viz__bar-wrapper ${spendingCategory}`}
        onBlur={onLeave}
        onFocus={onEnter}
        onKeyPress={onEnter}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onEnter}>
        <div className={`${className} ${spendingCategory}`} style={barStyles}>
            {children}
        </div>
    </div>
);

Bar.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    spendingCategory: PropTypes.string,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    barWrapperStyles: PropTypes.object,
    barStyles: PropTypes.object
};

BarLabelAndLine.propTypes = {
    children: PropTypes.node,
    spendingCategory: PropTypes.string,
    labelStyles: PropTypes.object,
    lineStyles: PropTypes.object,
    lineClassName: PropTypes.string,
    labelClassName: PropTypes.string
};

BarValue.propTypes = {
    spendingCategory: PropTypes.string,
    className: PropTypes.string,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string,
    number: PropTypes.string
};

export {
    Bar,
    BarLabelAndLine,
    BarValue
};
