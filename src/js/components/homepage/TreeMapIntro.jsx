/**
 * TreeMapIntro.jsx
 * Created by Destin Frasier 03/20/2017
 **/

import React from 'react';

export default class TreeMapIntro extends React.Component {
    render() {
        return (
            <div className="treemap-intro-wrap" id="scroll-to-breakdown">
                <div className="treemap-intro-background" />
                <div className="treemap-intro-inner-wrap">
                    <div className="treemap-intro-text">
                        <div className="treemap-intro-top">
                            To track and manage the spending, <br />the United States government breaks
                            down the<br /> budget into <strong>19 categories</strong> called
                        </div>
                        <h3
                            className="treemap-intro-bottom"
                            id="budget-function-section-title"
                            tabIndex={-1}>
                            Budget Functions
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
}
