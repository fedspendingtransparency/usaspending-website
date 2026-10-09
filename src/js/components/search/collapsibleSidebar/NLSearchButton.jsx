/**
 * NLSearchButton.jsx
 * Created by Nick Torres 8/28/2026
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFireQueryEvent from '../../../hooks/useFireQueryEvent';

const DEFAULT_ICON_PATH = '../../../../img/magnifying-glass-white.svg';

const propTypes = {
    loadingState: PropTypes.string,
    classname: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
    startNLSearch: PropTypes.func
};

const NLSearchButton = ({
    loadingState,
    classname = 'default-search',
    icon = DEFAULT_ICON_PATH,
    text = 'Search',
    startNLSearch
}) => {
    const fireQueryEvent = useFireQueryEvent();

    const onClick = () => {
        startNLSearch();
        fireQueryEvent();
    };

    return (
        <button className={`natural-language-submit ${classname}`} onClick={onClick} disabled={loadingState}>
            {!loadingState && <img src={icon} alt="Icon for Search Button" />}
            {loadingState && <FontAwesomeIcon icon={['far', 'wand-magic-sparkles']} />}
            {text}
            {loadingState && (
                <svg
                    className="natural-language-submit__spinner"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        overflow: 'visible',
                        pointerEvents: 'none'
                    }}
                    aria-hidden="true"
                    focusable="false">
                    <defs>
                        <linearGradient id="nlSubmitStreakGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#a8f2ff" />
                            <stop offset="50%" stopColor="#00687d" />
                            <stop offset="100%" stopColor="#a8f2ff" />
                        </linearGradient>
                    </defs>
                    <rect
                        className="natural-language-submit__spinner-track"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="4"
                        fill="none"
                        stroke="url(#nlSubmitStreakGradient)"
                        pathLength="100" />
                </svg>
            )}
        </button>
    );
};

NLSearchButton.propTypes = propTypes;
export default NLSearchButton;
