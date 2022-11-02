/**
 * ErrorWordOfTheDay.jsx
 * Created by Brian Petway 10/05/22
 */

import React from 'react';

const ErrorWordOfTheDay = () => (
    <div className="word-of-the-day__error-message">
        <p className="word-of-the-day-paragraph-one">Something went wrong</p>
        <p className="word-of-the-day-paragraph-two">Sorry, we're unable to load this content.</p>
        {/* eslint-disable-next-line no-return-assign */}
        <button className="word-of-the-day-button" onClick={() => window.location = 'mailto:usaspending.help@fiscal.treasury.gov?subject=Word%20of%20the%20Day%20Error'}>Report this error</button>
    </div>
);

export default ErrorWordOfTheDay;
