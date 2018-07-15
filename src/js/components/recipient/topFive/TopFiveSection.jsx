/**
 * TopFiveSection.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';

import { recipientCategories as topCategories } from 'dataMapping/recipients/topCategories';
import TopFiveContainer from 'containers/recipient/topFive/TopFiveContainer';

export default class TopFiveSection extends React.Component {
    render() {
        const content = topCategories.map((category) => (
            <TopFiveContainer
                key={category}
                category={category} />
        ));

        return (
            <div
                className="recipient-section topfive"
                id="recipient-top-five">
                <h3 className="state-section__title">
                    Top 5
                </h3>
                <hr className="results-divider" />
                <div className="state-section__description">
                    The set of tables below gives a summary of key attributes for this recipient. To see more than the top 5, you can launch directly to our Advanced Search page.
                </div>
                <div className="topfive__content">
                    {content}
                </div>
            </div>
        );
    }
}
