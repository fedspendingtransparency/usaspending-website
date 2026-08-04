/**
 * SubmitButton.jsx
 * Created by Lizzie Salita 3/26/18
 */

import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    validForm: PropTypes.bool,
    validDates: PropTypes.bool,
    handleSubmit: PropTypes.func
};

const SubmitButton = ({
    validForm,
    validDates,
    handleSubmit
}) => {
    
    const onClick = (e) => {
        e.preventDefault();
        handleSubmit();
    }



    let submitButton = (
        <div
            className="submit-button submit-button_disabled" >
            <button disabled>Download</button>
        </div>
    );

    if (validForm && validDates) {
        submitButton = (
            <div className="submit-button">
                <input type="submit" value="Download" onClick={onClick} />
            </div>
        );
    }

    return (
        <div className="submit-wrapper">
            {submitButton}
        </div>
    );
}


SubmitButton.propTypes = propTypes;
export default SubmitButton;
