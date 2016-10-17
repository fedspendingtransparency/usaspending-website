/**
 * SearchPage.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import NavBar from '../NavBar.jsx'
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
