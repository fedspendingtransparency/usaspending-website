/**
 * Heading.jsx
 * Created by Jonathan Hill 06/10/20
 */

import React from 'react';

const Heading = () => (
    <div className="heading__container">
        <div className="heading__title">
            How much has the Federal Government
            spent on the <span className="color-purple">COVID-19 Response</span> in total?
        </div>
        <div className="heading__description">
            In April 2020 the Federal Government began allocating funds in
            response to the COVID-19 pandemic. There are a variety of
            dimensions to analyze COVID-19 Response spending,
            including who received spending, which agency spent the funds, and how
            the funds were spent over time.
        </div>
    </div>
);

export default Heading;
