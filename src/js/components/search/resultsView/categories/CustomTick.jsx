import React from "react";
import PropTypes from "prop-types";
import { Text } from "recharts";
import Analytics from "../../../../helpers/analytics/Analytics";

const onClickHandler = (linkName, scope, hash) => {
    Analytics.event({
        category: `Section categories: ${scope}`,
        action: `Clicked ${linkName}`,
        label: hash
    });
};

const tickFormatter = (value, isDesktopSm) => {
    const limit = isDesktopSm ? 34 : 36; // put your maximum character
    if (value.length < limit) {
        return {text: value, isOneLine: (value === value.toUpperCase() ? value.length < 24 : value.length < 27)};
    }
    const newValue = value.replace("Department", "Dept");
    if (newValue.length <= limit) return { text: newValue, isOneLine: false };
    return { text: `${newValue.substring(0, limit)}...`, isOneLine: false };
};

const propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    payload: PropTypes.string,
    link: PropTypes.array,
    isTablet: PropTypes.bool,
    isDesktopSm: PropTypes.bool,
    scope: PropTypes.string,
    hash: PropTypes.string
}

const CustomTick = ({ x, y, payload, link, isTablet, isDesktopSm, scope, hash }) => {
    const labelWidthVar = isTablet ? 400 : 175;
    const formattedText = tickFormatter(payload.value, isDesktopSm);
    const translateY = () => {
        if (isTablet) {
            return y - 20;
        }
        if (formattedText.isOneLine) {
            return y + 4;
        }
        return y + 12;
    };
    return (
        <g transform={`translate(${x - 8},${translateY()})`}>
            {link[payload.index].link ?
                <a
                    href={`${link[payload.index].link}`}
                    onClick={() => onClickHandler(
                        payload.value,
                        scope,
                        hash
                    )}>
                    <Text
                        textAnchor={isTablet ? "start" : "end"}
                        fontSize={14}
                        width={isTablet ? labelWidthVar : labelWidthVar + 16}
                        fill="#2378C3"
                        lineHeight={17.5}>
                        {formattedText.text}
                    </Text>
                </a>
                :
                <Text
                    textAnchor={isTablet ? "start" : "end"}
                    fontSize={14}
                    width={isTablet ? labelWidthVar : labelWidthVar + 16}
                    fill="#5c5c5c"
                    lineHeight={17.5}>
                    {formattedText.text}
                </Text>
            }
        </g>
    );
};

CustomTick.propTypes = propTypes;
export default CustomTick;