/**
 * buttonsExample.jsx
 * Created by Destin Frasier 3/16/17
 */

import React from 'react';

export default class ButtonsExample extends React.Component {
    render() {
        return (
            <div>
                <h3>Buttons</h3>
                <div className="component-wrap">
                    <div className="component-item">
                        <input className="usa-button" type="submit" value="Primary Button" />
                    </div>
                    <div className="component-code">
                        <pre>
                            <code>code will go here</code>
                        </pre>
                    </div>
                </div>
                <div className="component-wrap">
                    <div className="component-item">
                        <input className="usa-button-primary-alt" type="submit" value="Primary-alt Button" />
                    </div>
                    <div className="component-code">
                        <pre>
                            <code>code will go here</code>
                        </pre>
                    </div>
                </div>
                <div className="component-wrap">
                    <div className="component-item">
                        <input className="usa-button-secondary" type="submit" value="Secondary Button" />
                    </div>
                    <div className="component-code">
                        <pre>
                            <code>code will go here</code>
                        </pre>
                    </div>
                </div>
                <div className="component-wrap">
                    <div className="component-item">
                        <input className="usa-button-secondary-danger" type="submit" value="Secondary-danger Button" />
                    </div>
                    <div className="component-code">
                        <pre>
                            <code>code will go here</code>
                        </pre>
                    </div>
                </div>
                <div className="component-wrap">
                    <div className="component-item">
                        <input className="usa-button-gray" type="submit" value="Gray Button" />
                    </div>
                    <div className="component-code">
                        <pre>
                            <code>code will go here</code>
                        </pre>
                    </div>
                </div>
                <div className="component-wrap">
                    <div className="component-item">
                        <input className="usa-button-outline" type="submit" value="Outline Button" />
                    </div>
                    <div className="component-code">
                        <pre>
                            <code>code will go here</code>
                        </pre>
                    </div>
                </div>
                <div className="component-wrap">
                    <div className="component-item">
                        <input className="usa-button-outline-inverse" type="submit" value="Outline-inverse Button" />
                    </div>
                    <div className="component-code">
                        <pre>
                            <code>code will go here</code>
                        </pre>
                    </div>
                </div>
                <div className="component-wrap">
                    <div className="component-item">
                        <input className="usa-button-disabled" type="submit" value="Disabled Button" />
                    </div>
                    <div className="component-code">
                        <pre>
                            <code>code will go here</code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}
