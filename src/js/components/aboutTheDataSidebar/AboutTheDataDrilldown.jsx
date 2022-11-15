/**
 * AboutTheDataDrilldown.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import ReactMarkdown from 'react-markdown';
import file from 'content/about-the-data/descriptions/file-a.md';

const propTypes = {
    section: PropTypes.string
};

const AboutTheDataDrilldown = ({ entry }) => {

    const [content, setContent] = useState('');

    useEffect(() => {
        // eslint-disable-next-line import/no-unresolved

        import(`content/about-the-data/descriptions/file-a.md`)
            .then((res) => {
                fetch(res.default)
                    .then((res) => res.text())
                    .then((res) => setContent(res))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);

    // eslint-disable-next-line import/no-dynamic-require,global-require
    return (<>
        <div className="atd__heading">Placeholder Heading</div><hr />
        <ReactMarkdown source={content} />
    </>);
};

AboutTheDataDrilldown.propTypes = propTypes;
export default AboutTheDataDrilldown;
