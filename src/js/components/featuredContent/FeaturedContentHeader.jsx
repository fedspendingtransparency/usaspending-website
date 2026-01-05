import React from "react";
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import { getPrimaryFill, getSecondaryFill } from 'helpers/featuredContent/featuredContentHelper';

const heroPath = "../../img/featuredContent/banner/desktop/banner-";

const FeaturedContentHeader = ({ isMobile, isTablet, chosenArticle }) => (
    <FlexGridRow
        className="featured-content__header-wrapper"
        style={{ backgroundColor: (isMobile || isTablet) && getPrimaryFill(chosenArticle) }}>
        { !isMobile &&
            !isTablet &&
            <img
                src={chosenArticle?.slug ? `${heroPath}${chosenArticle?.slug}.webp` : null}
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
                style={{ backgroundColor: getSecondaryFill(chosenArticle) }}>
                {chosenArticle?.taxonomy}
            </span>
            <span className="featured-content__title">
                {chosenArticle?.title}
            </span>
            <span className="featured-content__subtitle">
                {chosenArticle?.banner_subtitle}
            </span>
        </FlexGridCol>
    </FlexGridRow>);

export default FeaturedContentHeader;
