/**
 * SearchPage.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react'
import Header from '../sharedComponents/Header.jsx'
import Footer from '../sharedComponents/Footer.jsx'
import NavBar from '../sharedComponents/NavBar.jsx'
import SearchSidebar from './SearchSidebar.jsx'
import SearchResults from './SearchResults.jsx'

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-wrapper search-page">
                <Header/>
                <NavBar/>
                <SearchSidebar/>
                <SearchResults/>
                <Footer/>
            </div>
        );
    }

}
