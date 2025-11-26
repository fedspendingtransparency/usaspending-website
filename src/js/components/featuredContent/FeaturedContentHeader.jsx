import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import React from "react";

const FeaturedContentHeader = ({ isMobile, isTablet, chosenArticle }) => (<>
    <FlexGridRow
        className="featured-content__header-wrapper"
        style={{ backgroundColor: ((isMobile || isTablet) && chosenArticle?.fill) ? chosenArticle.fill : 'none' }}>
        {!isMobile &&
                !isTablet &&
                <img
                    src={chosenArticle?.hero}
                    alt="hero"
                    name="featured-content-hero"
                    id="featured-content-hero" />
        }
        <FlexGridCol
            desktopxl={{ span: 4, offset: 1 }}
            desktop={{ span: 5, offset: 1 }}
            tablet={{ span: 10, offset: 2 }}
            mobile={{ span: 10, offset: 1 }}
            className={`featured-content__header-block usa-dt-flex-grid__row ${chosenArticle?.black_text ? "black-text" : ""}`}>
            <span
                className="featured-content__label"
                style={{ backgroundColor: chosenArticle?.secondary }}>
                {chosenArticle?.taxonomy}
            </span>
            <span className="featured-content__title">
                {chosenArticle?.banner_title}
            </span>
            <span className="featured-content__subtitle">
                {chosenArticle?.banner_subtitle}
            </span>
        </FlexGridCol>
    </FlexGridRow></>);

export default FeaturedContentHeader;
