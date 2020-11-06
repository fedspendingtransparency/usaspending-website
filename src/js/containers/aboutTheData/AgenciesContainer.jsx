import React from 'react';
import Header from 'containers/shared/HeaderContainer';
import Footer from 'containers/Footer';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Note from 'components/sharedComponents/Note';

require('pages/aboutTheData/agenciesPage.scss');

const message = 'Data in this table will be updated whenever the underlying data submissions change or new submissions are added.';

const AgenciesContainer = () => (
    <div className="usa-da__about-the-data__agencies-page">
        <Header />
        <StickyHeader>
            <div className="sticky-header__title">
                <h1 tabIndex={-1}>
                    Agency Submission Data
                </h1>
            </div>
        </StickyHeader>
        <main id="main-content" className="main-content">
            <div className="heading-container">
                <h2 className="header">Submission Data</h2>
                <h3 className="sub-header">All Agencies</h3>
                <Note message={message} />
            </div>
        </main>
        <Footer />
    </div>
);

export default AgenciesContainer;
