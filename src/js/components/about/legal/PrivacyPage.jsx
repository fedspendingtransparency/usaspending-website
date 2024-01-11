/**
 * PrivacyPage.jsx
 * Created by Kevin Li 2/22/18
 */

import React from 'react';
import LegalPage from './common/LegalPage';

const PrivacyPage = () => (
    <LegalPage
        activePage="privacy"
        title="Privacy Policy">
        <p>
            USASpending.gov is committed to protecting the privacy and security of its users.
            Our online privacy policy is outlined below.  If you have questions about this policy,
            please <a href="mailto:usaspending.help@fiscal.treasury.gov?subject=Contact%20Us">contact us</a>.
        </p>
        <h3 className="about-subtitle">
            Collection and disclosure of information
        </h3>
        <p>
            The site collects personal information (e.g., names, email addresses, telephone numbers)
            only from those individuals who share this information with us.
            You are <strong>not</strong> required to provide personal information to visit
            USASpending.gov. If you choose to provide us with this information through an email,
            form, or survey, we maintain the information only as long as necessary to respond to
            your question or to fulfill the stated purpose of the communication. It is our general
            policy not to make personal information available to anyone other than our employees,
            staff, and agents. We want to make it clear that we will not obtain personal information
            (e.g., names, email addresses, telephone numbers) about you when you visit our site
            unless you choose to provide such information to us.
        </p>
        <h3 className="about-subtitle">
            Information collected and stored automatically
        </h3>
        <p>
            When you browse, read pages, or download information, the site gathers and stores
            certain technical information about your visit:
        </p>
        <ul>
            <li>The internet domain (for example, &quot;xcompany.com&quot; if you use a private internet
                access account, or &quot;yourschool.edu&quot; if you connect from a university&#39;s domain)
                and IP address (an IP address is a number that&#39;s automatically assigned to your
                computer whenever you&#39;re online) from which you access USASpending.gov
            </li>
            <li>The browser (e.g., Firefox, Safari, or Internet Explorer) and operating system
                (e.g., Windows, Mac, Unix) you used to access our site
            </li>
            <li>The date and time you visit the site</li>
            <li>The pages you visit</li>
            <li>If you linked to USASpending.gov from another website, the address of that website</li>
        </ul>
        <p>
            We gather this information to help make the site more useful for all visitors. We
            never track or record information about individuals and their visits.
        </p>
        <h3 className="about-subtitle">
            Cookies
        </h3>
        <p>
            The Office of Management and Budget (OMB) Memo M-10-22, Guidance for Online Use of Web
            Measurement and Customization Technologies, allows federal agencies to use session and
            persistent cookies.
        </p>
        <p>
            When you visit the site, its server may generate a piece of text known as a cookie to
            place on your computer. The cookie allows the server to &quot;remember&quot; specific information
            about your visit, and makes it easier for you to use the site&#39;s dynamic features.
            Requests to send cookies from the site&#39;s pages are designed to collect information
            about your browser session only; they do not collect personal information about you.
        </p>
        <p>
            There are two types of cookies: single session (temporary) and multi-session
            (persistent). Session cookies last only as long as your browser is open. Once you close
            your browser, the cookie disappears. Persistent cookies are stored on your computer for
            longer periods.
        </p>
        <p>
            The site uses session cookies for technical purposes, such as improving site navigation.
            These cookies let us know whether you continue to visit our site. Session cookies
            are <strong>not</strong> permanently stored on your computer; the cookie and the information
            about your visit are automatically destroyed shortly after you close your browser and
            end the session.
        </p>
        <p>
            The OMB Memo defines our use of session cookies as &quot;Usage Tier 1 - Single Session.&quot;
            The policy says, &quot;This tier encompasses any use of single session Web measurement and
            customization technologies.&quot;
        </p>
        <p>
            The site uses persistent cookies to help us recognize new and returning visitors.
            Persistent cookies remain on your computer until they expire. We do not use this
            technology to identify you or any other individual site visitor.
        </p>
        <p>
            The OMB Memo defines our use of persistent cookies as &quot;Usage Tier 2 - Multi-session
            without Personally Identifiable Information (PII).&quot; The policy says, &quot;This tier
            encompasses any use of multi-session Web measurement and customization technologies
            when no PII is collected.&quot;
        </p>
        <p>
            If you do not wish to have session or persistent cookies placed on your computer, you
            can disable them within your browser. If you disable cookies, you will still have access
            to all the information and resources USASpending.gov provides.
        </p>
        <p>
            If you&#39;d like to disable cookies,{' '}
            <a
                className="about-section-content do-wrap"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.usa.gov/optout-instructions">
                use these instructions provided by usa.gov
            </a>; these instructions cover most popular browsers. Please note that by following
            the instructions to opt out of cookies, you will disable cookies from all sources,
            not just those from this site.
        </p>
        <h3 className="about-subtitle">
            Security
        </h3>
        <p>
            The site maintains a variety of physical, electronic, and procedural safeguards to
            protect personal information - for example, commercially reasonable tools and
            techniques to protect against unauthorized access to the site&#39;s systems. Personal
            Information is restricted to those who need such access in the course of their duties.
        </p>
        <h3 className="about-subtitle">
            Linking
        </h3>
        <p>
            The site may contain links to websites created and maintained by other public and/or
            private organizations. The site provides these links as a service to our users. When
            users link to an outside website, they are leaving the site and are subject to the
            privacy and security policies of the owners/sponsors of the outside website(s).
        </p>
        <h3 className="about-subtitle">
            Changes to this policy
        </h3>
        <p>
            As practices change, this policy may change, as well. Changes to the policy shall not
            apply retroactively.
        </p>
        <p>
            <strong>NOTE:</strong> View or print the{' '}
            <a
                className="about-section-content do-wrap"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.fiscal.treasury.gov/pia.html">
                Privacy Impact Assessment (PIA)
            </a>{' '}performed on USAspending.gov.
        </p>
    </LegalPage>
);

export default PrivacyPage;
