/**
 * KeywordPage.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import ResultsTableSection from './table/ResultsTableSection';
import KeywordHeader from './header/KeywordHeader';
import KeywordSearchBar from './KeywordSearchBar';

const propTypes = {
    updateKeyword: PropTypes.func,
    keywordApplied: PropTypes.bool,
    summary: PropTypes.object,
    error: PropTypes.bool,
    inFlight: PropTypes.bool,
    results: PropTypes.array,
    columns: PropTypes.object,
    sort: PropTypes.object,
    tableTypes: PropTypes.array,
    currentType: PropTypes.string,
    tableInstance: PropTypes.string,
    switchTab: PropTypes.func,
    updateSort: PropTypes.func,
    loadNextPage: PropTypes.func
};

export class KeywordPage extends React.Component {
    render() {
        return (
            <div
                className="usa-da-keyword-page">
                <MetaTags {...MetaTagHelper.keywordPageMetaTags} />
                <Header />
                <main id="main-content">
                    <KeywordHeader
                        summary={this.props.summary} />
                    <div className="keyword-content">
                        <div className="search-bar-section">
                            <KeywordSearchBar
                                submitText={this.props.updateKeyword} />
                            <div className="info-text">
                                Donec id elit non mi porta gravida at eget metus. Nullam quis risus eget urna mollis
                                ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
                                Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
                                massa justo sit amet risus.
                            </div>
                        </div>
                        <ResultsTableSection
                            inFlight={this.props.inFlight}
                            error={this.props.error}
                            keywordApplied={this.props.keywordApplied}
                            tableTypes={this.props.tableTypes}
                            currentType={this.props.currentType}
                            switchTab={this.props.switchTab}
                            results={this.props.results}
                            columns={this.props.columns}
                            sort={this.props.sort}
                            updateSort={this.props.updateSort}
                            tableInstance={this.props.tableInstance} />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}


KeywordPage.propTypes = propTypes;

export default KeywordPage;
