/**
 * NLDefaultHint.jsx
 * Created by Nick Torres 8/14/2026
 **/
import React from "react";
import PropTypes, { oneOfType } from "prop-types";

const propTypes = {
    hint: oneOfType([PropTypes.string, PropTypes.element]),
    onClick: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const NLDefaultHint = React.memo(function NLDefaultHint({hint, onClick}) {
    return (
        <>
            <button className="sidebar-default-hint" onClick={onClick}>
                {hint}
            </button>   
        </>
    );
});
NLDefaultHint.propTypes = propTypes;
export default NLDefaultHint;