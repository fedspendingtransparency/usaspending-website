/**
 * Heading.jsx
 * Created by Jonathan Hill 06/10/20
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlossaryLink from 'components/sharedComponents/GlossaryLink';
import ExternalLink from 'components/sharedComponents/ExternalLink';
import ReadMore from './ReadMore';

const Heading = () => (
    <div className="heading__container information-body">
        <div className="heading__top information-top" />
        <div className="heading__title">
            The Federal Response to <span className="color-purple">COVID-19</span>.
        </div>
        <div className="heading__description">
            <p>In early 2020, the U.S. Congress appropriated funds in response to the COVID-19 pandemic. These funds were made possible through the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other supplemental legislation.</p>
            <ReadMore>
                <p>
                    In response to guidance from the Office of Management and Budget (OMB), we updated our data model to capture the journey of COVID-19 dollars from appropriation to <strong>obligation</strong> <GlossaryLink currentUrl="disaster/covid-19" term="obligation" /> and <strong>outlay</strong> <GlossaryLink currentUrl="disaster/covid-19" term="outlay" /> by federal agencies.<sup>1 2</sup> See who received funding, which agencies spent the funds, which programs were funded, and more.
                </p>
                <p>
                    Visit our Data Sources & Methodology and Other Resources sections to learn more about the underlying data and find resources about COVID-19 from other agencies.
                </p>
                <p className="footnotes">
                    <sup>1</sup> <ExternalLink url="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf">OMB’s memorandum M-20-21 prescribes guidance to agencies on tracking COVID supplemental funds</ExternalLink>.<br />
                    <sup>2</sup> USAspending’s data model is called the <a href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html" target="_blank" rel="noopener noreferrer">DATA Act Information Model Schema (DAIMS) <FontAwesomeIcon icon="external-link-alt" /></a> and is available to review.
                </p>
            </ReadMore>
        </div>
    </div>
);

export default Heading;
