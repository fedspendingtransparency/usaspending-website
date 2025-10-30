import articles from "../../config/featuredContent/featuredContentMetadata";
import { transformString } from "./featuredContent/featuredContentHelper";

// get the sprint number and week number from today's date and start date
const date = new Date();
const firstFeaturedContentDay = new Date(2025, 10, 12);
const weekDifference = (date - firstFeaturedContentDay) > 0 ?
    Math.ceil(((date - firstFeaturedContentDay) / 604800000)) :
    1;
const featureSprintNum = weekDifference > 0 ? Math.ceil(weekDifference / 3) : 1;
const featureWeekNum = weekDifference - ((featureSprintNum - 1) * 3);

// get the current sprint's articles and partition based on content_type === 'Marketing'
const currentArticles = articles.filter((article) => article.feature_sprint === featureSprintNum);
const partition = (array, isValid) => array.reduce(
    ([pass, fail], elem) => (isValid(elem) ?
        [[...pass, elem], fail] :
        [pass, [...fail, elem]]), [[], []]
);
const [marketingArticles, otherArticles] = partition(
    currentArticles,
    (article) => article.content_type === 'Marketing'
);

// get current week's articles and add relevant key/values
const currentMarketingArticle = marketingArticles[0];
const currentOtherArticle = otherArticles[featureWeekNum - 1];
const [marketingArticle, otherArticle] = [currentMarketingArticle, currentOtherArticle]
    .map((article) => {
        const titleIndex = article.title.indexOf(":");

        if (titleIndex > 0 && (titleIndex + 2) < article.title.length) {
            return {
                url: `/featured-content/${
                    transformString(currentMarketingArticle.taxonomy)
                }/${transformString(currentMarketingArticle.title)}`,
                title: article.title.substring(titleIndex + 2),
                overline: article.title.substring(0, titleIndex),
                ...article
            };
        }

        return {
            url: `/featured-content/${
                transformString(currentMarketingArticle.taxonomy)
            }/${transformString(currentMarketingArticle.title)}`,
            overline: article.taxonomy.toUpperCase(),
            ...article
        };
    });

// TODO: make this into a function that takes 'first content release day' as an argument
export { marketingArticle, otherArticle };
