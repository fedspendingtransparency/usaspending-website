/**
 * ErrorWordOfTheDay.jsx
 * Created by Brian Petway 10/05/22
 */

import React from 'react';

const ErrorWordOfTheDay = () => (
    <div className="word-of-the-day__error-message">
        <picture>
            <img
                role="presentation"
                src="../../../../img/homepage-word-of-the-day/Error-Placeholder.svg"
                alt="" />
        </picture>
        Unable to load Word of the Day
    </div>
);

export default ErrorWordOfTheDay;
