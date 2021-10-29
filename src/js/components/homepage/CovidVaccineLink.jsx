import React from 'react';

const CovidVaccineLink = () => (
    <div className="covid-19-vaccine-link__container">
        <img src="img/wcdt.png" alt="We Can Do This" />
        <div className="covid-19-vaccine-link__text">
            <strong>We can do this. </strong>
            Find COVID-19 vaccines near you.&nbsp;
            <a
                href="https://www.vaccines.gov/ "
                target="_blank"
                rel="noopener noreferrer">
                Visit Vaccines.gov
            </a>
        </div>
    </div>
);

export default CovidVaccineLink;
