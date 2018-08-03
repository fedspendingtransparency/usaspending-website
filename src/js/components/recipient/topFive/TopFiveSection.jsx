/**
 * TopFiveSection.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';

import { recipientCategories as topCategories } from 'dataMapping/recipients/topCategories';
import TopFiveContainer from 'containers/recipient/topFive/TopFiveContainer';

export default class TopFiveSection extends React.Component {
    chunk(array, size) {
        return array.reduce((chunks, item, i) => {
            if (i % size === 0) {
                chunks.push([item]);
            }
            else {
                chunks[chunks.length - 1].push(item);
            }
            return chunks;
        }, []);
    }
    htmldraw() {
        const myarr = [];
        topCategories.map((category) => (
            myarr.push(<TopFiveContainer
                key={category}
                category={category} />)
        ));

        return (
            this.chunk(myarr, 2).map((row) => (
                <div className="category-row">
                    {
                        row.map((col) => (
                            <div className="category-table">{ col }</div>
                        ))
                    }
                </div>
            ))
        );
    }
    render() {
        return (
            <div
                className="recipient-section topfive"
                id="recipient-top-five">
                <h3 className="state-section__title">
                    Top 5
                </h3>
                <hr className="results-divider" />
                <div className="state-section__description">
                    The set of tables below provide a summary of awards to this recipient through multiple angles. To see more than the top 5, you can visit our Advanced Search page.
                </div>
                <div className="topfive__content">
                    {this.htmldraw()}
                </div>
            </div>
        );
    }
}
