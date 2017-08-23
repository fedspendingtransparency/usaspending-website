/**
 * FakeScreens.jsx
 * Created by Kevin Li 8/23/17
 */

import React from 'react';

import FakeScreen from './FakeScreen';

export default class FakeScreens extends React.Component {
    render() {
        const fakes = [];
        for (let i = 0; i < Math.abs(this.props.transitionSteps); i++) {
            fakes.push(<FakeScreen key={i} />);
        }
        return (
            <div
                className={`fake-screens ${this.props.position}`}
                ref={(div) => {
                    this.div = div;
                }}>
                {fakes}
            </div>
        );
    }
}