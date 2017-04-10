/**
 * BudgetProcess.jsx
 * Created by Rickey An 04/03/2017
 **/

import React from 'react';

export default class SubmissionFiles extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <div className="inner-wrap-right">
                    <img src="url(../../img/about_us_submission_files.jpg" alt="Agency Raw Submission Files" />
                    <h3>Agency Raw Submission Files</h3>
                    <hr className="results-divider" />
                    <p>Agency Raw Submission Files. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                     Sed sit amet risus sed urna cursus mollis. Donec sagittis nunc pretium dui congue, id gravida purus lobortis.
                     Nunc sed varius massa. Nam blandit cursus metus a maximus. Vivamus pretium augue sed est aliquam mollis. Mauris
                     efficitur arcu vitae venenatis sodales.</p>
                    <a href="#">
                        <button
                            className="usa-button-primary"
                            title="View FAQs"
                            aria-label="View FAQs">
                            Raw Submission Files
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}
