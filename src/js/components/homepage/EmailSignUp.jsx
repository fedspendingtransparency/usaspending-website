import React, { useState } from 'react';

// eslint-disable-next-line no-useless-escape
const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const EmailSignUp = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [emailInput, setEmailInput] = useState('');

    const handleEmailInput = (e) => {
        setEmailInput(e.target.value);
    };
    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const isValid = regex.test(emailInput);

    return (
        <div className="email-sign-up__modal-body">
            <h2>Subscribe the USAspending.gov Newsletter</h2>
            {/* <form action="http://ntdmls01/subscribe/subscribe.tml" method="POST"> */}
            {isSubmitted && (
                <span>Thanks.</span>
            )}
            {!isSubmitted && (
                <form>
                    <label className="email-label" htmlFor="email">Email address: </label>
                    <input className="email-input" type="email" name="email" value={emailInput} onChange={handleEmailInput} />
                    <input className="submit" type="submit" value="SUBMIT" title="subscribe" alt="subscribe" name="subscribe" disabled={!isValid} onClick={handleSubmit} />
                    <input type="hidden" name="list" value="usaspending" />
                    <input type="hidden" name="lists" value="usaspending" />
                    <input type="hidden" name="demographics" value="" />
                    <input type="hidden" name="name_required" value="" />
                    <input type="hidden" name="pw_required" value="" />
                    <input type="hidden" name="confirm" value="one" />
                    <input type="hidden" name="showconfirm" value="T" />
                    <input type="hidden" name="url" value="" />
                    <input type="hidden" name="appendsubinfotourl" value="" />
                    <input type="hidden" name="secx" value="03b19f94" />
                </form>
            )}
            {!isValid && emailInput.length > 0 && (
                <span>Wrong.</span>
            )}
        </div>
    );
};

export default EmailSignUp;
