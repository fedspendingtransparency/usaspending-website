/**
 * AboutTheDataDrilldown.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React from 'react';
import Gtas from "content/about-the-data/descriptions/gtas.md";

const AboutTheDataDrilldown = ({ section, name }) => {
    return (<>
        <div className="atd__overline">{ section }</div>
        <div className="atd__heading">{ name }</div><hr />
        <div className="atd__body"><Gtas /></div>
    </>);
};

export default AboutTheDataDrilldown;
