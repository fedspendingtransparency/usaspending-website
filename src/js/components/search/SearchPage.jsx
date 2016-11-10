/**
 * SearchPage.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import SearchHeader from './header/SearchHeader';
import SearchSidebar from './SearchSidebar';
import SearchResults from './SearchResults';

export default class SearchPage extends React.Component {
    render() {
        return (
            <div className="usa-da-search-page">
                <Header />
                <main id="main-content">
                    <SearchHeader />
                    <SearchSidebar {...this.props} />
                    <SearchResults {...this.props} />
                </main>
                <Footer />
            </div>
        );
    }

}
