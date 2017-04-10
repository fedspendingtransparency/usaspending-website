/**
 * AboutData.jsx
 * Created by Rickey An 04/01/2017
 **/

import React from 'react';


export default class AboutData extends React.Component {

    render() {
        return (
            <div className="aboutdata-wrap">
                <div className="img-placeholder" />
                <div className="aboutdata-inner-wrap">
                    <h3>About the Data</h3>
                    <hr className="results-divider" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet risus sed urna cursus mollis.
                    Donec sagittis nunc pretium dui congue, id gravida purus lobortis. Nunc sed varius massa.
                     Nam blandit cursus metus a maximus. Vivamus pretium augue sed est aliquam mollis.
                     Mauris efficitur arcu vitae venenatis sodales. Nulla et massa nibh. Duis ut eleifend augue.
                     Suspendisse elit lacus, bibendum non felis eu, accumsan consectetur augue. Phasellus id aliquet nulla.
                     Vivamus tristique, mauris et suscipit luctus, mi sapien imperdiet risus, quis condimentum
                     libero neque vel risus.
                    </p>
                    <a href="#">Not enough for you? Click here for more discussion of the data</a>
                </div>
            </div>
        );
    }
}
