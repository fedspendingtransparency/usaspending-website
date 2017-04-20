/**
 * ContactUs.jsx
 * Created by Rickey An 04/03/2017
 **/

import React from 'react';

export default class ContactUs extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <div className="inner-wrap-left">
                    <img src="url(../../img/about_us_contact_us.jpg" alt="Contact Us" />
                    <h3>Contact Us</h3>
                    <hr className="results-divider" />
                    <p>Contact Us. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet risus sed urna cursus mollis.
                     Donec sagittis nunc pretium dui congue, id gravida purus lobortis. Nunc sed varius massa. Nam blandit cursus metus a maximus.
                     Vivamus pretium augue sed est aliquam mollis. Mauris efficitur arcu vitae venenatis sodales.</p>
                    <a href="#">
                        <button
                            className="usa-button-primary"
                            title="Contact Us"
                            aria-label="Contact Us">
                            Contact Us
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}
