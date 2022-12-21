import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line no-useless-escape
const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const propTypes = {
    closeModal: PropTypes.func
};

const EmailSignUp = ({
    closeModal
}) => {
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
            {!isSubmitted && <h2>Subscribe the USAspending.gov newsletter</h2>}
            {isSubmitted && (
                <div className="email-sign-up__confirmation">
                    <FontAwesomeIcon icon="check-circle" color="#2E8540" />
                    <h3>Thank you for subscribing!</h3>
                    <p>We will be in touch with a message shortly.</p>
                    <button onClick={closeModal}>OK</button>
                </div>
            )}
            {!isSubmitted && (
                <form>
                    <label className="email-label" htmlFor="email">Email Address</label>
                    <input
                        style={{ margin: (isValid || !emailInput) ? '0 0 6.5rem 0' : '0 0 1rem 0' }}
                        className="email-input"
                        type="email"
                        name="email"
                        value={emailInput}
                        onChange={handleEmailInput} />
                    {!isValid && emailInput.length > 0 && (
                        <div className="email-sign-up__validation">
                            <FontAwesomeIcon icon="exclamation-circle" color="#CD2026" />
                            <span>Please enter a valid email address.</span>
                        </div>
                    )}
                    <input
                        className="submit"
                        type="submit"
                        value="SUBMIT"
                        title="subscribe"
                        alt="subscribe"
                        name="subscribe"
                        disabled={!isValid}
                        onClick={handleSubmit} />
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
        </div>
    );
};

EmailSignUp.propTypes = propTypes;
export default EmailSignUp;
