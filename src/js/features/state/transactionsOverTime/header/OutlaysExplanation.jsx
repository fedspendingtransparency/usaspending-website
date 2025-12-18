/**
 * OutlaysExplanation.jsx
 * Created on 12/17/2025 by Josue Aguilar
 */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GlossaryLink from "components/sharedComponents/GlossaryLink";


const OutlaysExplanation = ({ outlayWhatOpen }) => (
    <>
        { outlayWhatOpen &&
                <div className="state__what-content">
                    <FontAwesomeIcon icon="info-circle" className="state__info-icon" />
                    <p className="state__what-heading">What is an outlay?</p>
                    <p className="state__what-text">An <span className="state__emphasis">outlay</span> <GlossaryLink term="outlay" /> is money that has been paid out from a federal account. This should not be confused with an <span className="state__emphasis">obligation&nbsp;<GlossaryLink term="obligation" /></span> , which is money the federal government has promised to pay (for example, when signing a contract or awarding a grant). Outlays are the transactions that pay off the federal government&apos;s obligations.</p>
                    <p className="state__what-second-heading">Why are the obligation and budgetary resource amounts no longer visible on the chart?</p>
                    <p className="state__what-text">Remember, the <span className="state__emphasis">budgetary resources</span> <GlossaryLink term="budgetary-resources" /> and obligations on this chart refer to available amounts and promised amounts for spending in your selected fiscal year. However, agencies may make outlays to pay off obligations made in your selected year or in previous years. This means outlays on this chart should <span className="state__emphasis">not</span> be compared to the obligations or budgetary resources within any single fiscal year.</p>
                </div>
        }
    </>
);

export default OutlaysExplanation;
