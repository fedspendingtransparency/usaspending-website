/**
 * SearchPage.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import Header from '../sharedComponents/Header';
import Footer from '../sharedComponents/Footer';
import NavBar from '../sharedComponents/NavBar';
import SearchSidebar from './SearchSidebar';
import SearchResults from './SearchResults';

export default class SearchPage extends React.Component {
    render() {
        return (
            <div className="flex-wrapper search-page">
                <Header />
                <NavBar />
                <SearchSidebar {...this.props} />
                <SearchResults {...this.props} />
                <Footer />
            </div>
        );
    }

}
