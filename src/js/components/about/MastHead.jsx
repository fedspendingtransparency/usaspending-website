/**
 * MastHead.jsx
 * Created by Destin Frasier 03/30/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

export default class MastHead extends React.Component {

    render() {
        return (
            <div className="masthead-wrap">
                <div className="inner-wrap">
                    <h1>About</h1>
                    <ul>
                        <li>Better Data.</li>
                        <li>Better Decisions.</li>
                        <li>Better Government.</li>
                    </ul>
                </div>
            </div>
        );
    }
}
