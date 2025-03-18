import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalConstants from 'GlobalConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlossaryContainer from 'containers/glossary/GlossaryContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import AboutTheDataContainer from "containers/aboutTheDataSidebar/AboutTheDataContainer";
import NavbarWrapper from './NavbarWrapper';
import GovBanner from "./GovBanner";
import InfoBanner from './InfoBanner';

const Header = () => {
    const location = useLocation();
    const activeBannersArray = GlobalConstants?.BANNER?.filter(
        (banner) => banner.isActive && location.pathname.includes(banner.page)
    );
    const [activeBanners, setActiveBanners] = useState([]);

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
        const activeBannerComponents = [];

        activeBannersArray.forEach((banner) => {
            activeBannerComponents.push(
                <InfoBanner
                    icon={getIcon(banner.type)}
                    type={banner.type}
                    title={banner.title}
                    content={banner.content} />
            );

            setActiveBanners(activeBannerComponents);
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
                <NavbarWrapper />
            </header>
            {activeBanners}
            <AboutTheDataContainer />
            <GlossaryContainer />
            <GlobalModalContainer />
        </div>
    );
};

export default Header;
