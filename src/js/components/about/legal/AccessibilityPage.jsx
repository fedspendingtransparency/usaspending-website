/**
 * AccessibilityPage.jsx
 * Created by Kevin Li 2/21/18
 */

import React from 'react';
import LegalPage from './common/LegalPage';

const AccessibilityPage = () => (
    <LegalPage
        activePage="accessibility"
        title="Accessibility">
        <p>
            The U.S. Department of the Treasury is committed to making USASpending.gov accessible
            to all members of the public and ensuring that it meets or exceeds the
            requirements of{' '}
            <a
                className="about-section-content do-wrap"
                target="_blank"
                rel="noopener noreferrer"
                href="https://section508.gov/">
                Section 508 of the Rehabilitation Act
            </a>.
        </p>
        <p>
            To help users who are visually impaired users more easily distinguish content,
            we regularly test contrast and color schemes using a tool called&nbsp;
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://webaim.org/resources/contrastchecker/">
                Web Accessibility in Mind
            </a>. To ensure the site is accessible, we evaluate the site regularly using screen
            readers to check the accuracy and quality of the content and navigation. We use a
            variety of other techniques to ensure that all users can easily access the site;
            some of these include providing methods for skipping repetitive navigation and
            alternate text.
        </p>
        <p>
            In addition, we&#39;ve incorporated the following throughout the site:
        </p>
        <ul>
            <li>Text equivalents provided for non-text elements</li>
            <li>Colored information made available without color</li>
            <li>Documents can be read without a style sheet</li>
            <li>Text-only versions of data appear to comply with Section 508 standards,
                with the exception of maps
            </li>
            <li>Forms are formatted to work with assistive technology to access the information,
                field elements, and functionality required to complete and submit forms
            </li>
        </ul>
        <p>
            <a href="mailto:usaspending.help@fiscal.treasury.gov?subject=Contact%20Us">Contact us</a>
            &nbsp;if you have any difficulty accessing information on USASpending.gov.
        </p>
    </LegalPage>
);

export default AccessibilityPage;
