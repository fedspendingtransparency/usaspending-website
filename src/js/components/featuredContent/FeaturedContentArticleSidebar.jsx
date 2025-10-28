import React from 'react';
import { FlexGridCol } from "data-transparency-ui";
import PropTypes from "prop-types";

import ExploreMore from "./ExploreMore";
import RelatedTerms from "./RelatedTerms";

const propTypes = { chosenArticle: PropTypes.object.isRequired };

const FeaturedContentArticleSidebar = ({ chosenArticle }) => (
    <FlexGridCol
        tablet={12}
        mobile={12}
        desktop={4}
        className="featured-content__column-two">
        <div>share</div>
        {chosenArticle?.explore_more.length > 0 &&
            <ExploreMore
                header="Explore More"
                citations={chosenArticle?.explore_more} />
        }
        {chosenArticle?.related_terms.length > 0 &&
            <RelatedTerms
                header="Related Terms"
                citations={chosenArticle?.related_terms} />
        }
    </FlexGridCol>
);

FeaturedContentArticleSidebar.propTypes = propTypes;
export default FeaturedContentArticleSidebar;
