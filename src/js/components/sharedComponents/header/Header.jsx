import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GlossaryContainer from 'containers/glossary/GlossaryContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import AboutTheDataContainer from "containers/aboutTheDataSidebar/AboutTheDataContainer";
import bannerContent from "ActiveBanners";
import MegaMenuWrapper from '../megaMenu/MegaMenuWrapper';
import GovBanner from "./GovBanner";
import InfoBanner from './InfoBanner';

const Header = () => {
    const location = useLocation();

    const siteBannersArray = bannerContent?.filter(
        (banner) => banner.isActive && banner.page === "site wide"
    );
    const pageBannersArray = bannerContent?.filter(
        (banner) => banner.isActive && location?.pathname === banner.page
    );

    const [activeSiteBanners, setActiveSiteBanners] = useState([]);
    const [activePageBanners, setActivePageBanners] = useState([]);

    const skippedNav = (e) => {
    // don't update the URL due to potential React Router conflicts
        e.preventDefault();
        // scroll to the main-content id
        const mainContent = document.getElementById('main-content');
        const mainFocus = document.querySelector('#main-content h1');
        const yPos = mainContent.getBoundingClientRect().top;
        window.scrollTo(0, yPos);
        // focus on the element
        if (mainFocus) {
            mainFocus.focus();
        }
    };

    const getIcon = (type) => {
        let icon = "";

        switch (type) {
            case "general":
                icon = <FontAwesomeIcon size="lg" icon="info-circle" color="#59b9de" />;
                break;

            case "warning":
                icon = <FontAwesomeIcon size="lg" icon="exclamation-triangle" color="#FA9441" />;
                break;

            case "warning-resolved":
                icon = <FontAwesomeIcon size="lg" icon="check-circle" color="#21C834" />;
                break;

            default:
                break;
        }


        return icon;
    };

    const getBanners = () => {
        const siteBannerComponents = [];
        const pageBannerComponents = [];

        siteBannersArray?.forEach((banner) => {
            siteBannerComponents.push(
                <InfoBanner
                    icon={getIcon(banner.type)}
                    type={banner.type}
                    title={banner.title}
                    content={banner.content} />
            );

            setActiveSiteBanners(siteBannerComponents);
        });

        pageBannersArray?.forEach((banner) => {
            pageBannerComponents.push(
                <InfoBanner
                    icon={getIcon(banner.type)}
                    type={banner.type}
                    title={banner.title}
                    content={banner.content} />
            );

            setActivePageBanners(pageBannerComponents);
        });
    };

    useEffect(() => {
        getBanners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="site-header">
            <a
                href="#main-content"
                className="skip-nav"
                onClick={skippedNav}>
                    Skip to main content
            </a>
            <header
                className="site-header__wrapper"
                aria-label="Site header">
                <GovBanner />
                <MegaMenuWrapper />
            </header>
            {activeSiteBanners}
            {activePageBanners}
            <AboutTheDataContainer />
            <GlossaryContainer />
            <GlobalModalContainer />
        </div>
    );
};

export default Header;
