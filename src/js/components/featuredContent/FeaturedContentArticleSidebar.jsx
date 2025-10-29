import React from 'react';
import { FlexGridCol } from "data-transparency-ui";
import PropTypes from "prop-types";

import ExploreMore from "./ExploreMore";
import RelatedTerms from "./RelatedTerms";
import NewShare from "./NewShare";

const propTypes = { chosenArticle: PropTypes.object.isRequired };

const FeaturedContentArticleSidebar = ({ chosenArticle }) => (
    <FlexGridCol
        tablet={12}
        mobile={12}
        desktop={4}
        className="featured-content__column-two">
        <div>share</div>
        <NewShare />
        {chosenArticle?.related_terms.length > 0 &&
            <RelatedTerms
                header="Related Terms"
                citations={chosenArticle?.related_terms} />
        }
        {chosenArticle?.explore_more.length > 0 &&
            <ExploreMore
                header="Explore More"
                citations={chosenArticle?.explore_more} />
        }
    </FlexGridCol>
);

FeaturedContentArticleSidebar.propTypes = propTypes;
export default FeaturedContentArticleSidebar;
