/**
 * Landing.jsx
 * Created by Destin Frasier 04/11/2017
 **/

import React from 'react';

export default class MapTopBar extends React.Component {

    render() {
        return (
            <div className="map-top-bar-wrap ">
                <div className="content-wrap">
                    <div className="visualization-period">
                        <ul>
                            <li>
                                <button className="active">Map View</button>
                            </li>
                            <li>
                                <button className="">List View</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
