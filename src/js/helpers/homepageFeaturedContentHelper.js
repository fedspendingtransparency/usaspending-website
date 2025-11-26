import articles from "../../config/featuredContent/featuredContentMetadata";
import { transformString } from "./featuredContent/featuredContentHelper";

// TODO: move partition to a more general helper file
const partition = (array, isValid) => array.reduce(
    ([pass, fail], elem) => (isValid(elem) ?
        [[...pass, elem], fail] :
        [pass, [...fail, elem]]), [[], []]
);

const fallbackMarketingArticle = {
    title: "Exploring America's Finances Has Never Been Easier",
    fill: '#1b2b85',
    thumbnail_path: "../../img/featuredContent/cards/exploring-americas-finances.webp",
    taxonomy: "Exploring America's Finances"
};

const fallbackOtherArticle = {
    title: "What is an Award?",
    fill: '#783cb9',
    thumbnail_path: "../../img/featuredContent/cards/data-definitions.webp",
    taxonomy: "Data Definitions"
};

const getOtherArticle = (otherArticleCadence, otherArticles, featureWeekNum, featureSprintNum) => {
    let otherArticle;

    if (otherArticles.length > 0 && otherArticleCadence === 'week') {
        otherArticle = otherArticles.filter(
            (article) => article.feature_week === featureWeekNum
        )[0];
    }
    else if (otherArticles.length > 0 && otherArticleCadence === 'sprint') {
        otherArticle = otherArticles.filter(
            (article) => (article.feature_sprint - 1) + article.feature_week === featureSprintNum
        )[0];
    }
    else {
        otherArticle = fallbackOtherArticle;
    }
    return otherArticle;
};

/* eslint-disable max-len */
/**
 *
 * @param otherArticleCadence - determines the cadence calculation based on a `week` or `sprint`
 * @param dayOneString - determines the start date for the date calculations
 * @returns {[(*&{url: string, title: *, overline: *})|(*&{url: string, overline: *})|*|{title: string, fill: string, thumbnail_path: string, taxonomy: string},(*&{url: string, title: *, overline: *})|(*&{url: string, overline: *})|*|{title: string, fill: string, thumbnail_path: string, taxonomy: string}]}
 */
const getCurrentArticles = (otherArticleCadence = 'sprint', dayOneString = '11/13/2025') => {
    /* eslint-enable max-len */
    // get the sprint number and week number from today's date and start date
    const today = new Date();
    const dayOne = new Date(dayOneString);
    const weekDifference = (today - dayOne) > 0 ?
        Math.ceil(((today - dayOne) / 604800000)) :
        1;
    const featureSprintNum = weekDifference > 0 ? Math.ceil(weekDifference / 3) : 1;
    const featureWeekNum = weekDifference - ((featureSprintNum - 1) * 3);

    // get the current sprint's articles and partition based on content_type === 'Marketing'
    const currentArticles = articles
        .filter((article) => article.feature_sprint === featureSprintNum);
    const [marketingArticles, otherArticles] = partition(
        currentArticles,
        (article) => article.content_type === 'Marketing'
    );

    // get current week's articles and add relevant key/values
    const currentMarketingArticle = marketingArticles.length > 0 ?
        marketingArticles[0] :
        fallbackMarketingArticle;
    const currentOtherArticle = getOtherArticle(
        otherArticleCadence, otherArticles, featureWeekNum, featureSprintNum
    );

    const [marketingArticle, otherArticle] = [currentMarketingArticle, currentOtherArticle]
        .map((article) => {
            if (article?.title && article?.taxonomy) {
                const titleIndex = article.title.indexOf(":");

                if (titleIndex > 0 && (titleIndex + 2) < article.title.length) {
                    return {
                        url: `/featured-content/${
                            transformString(article.taxonomy)
                        }/${transformString(article.title)}`,
                        title: article.title.substring(titleIndex + 2),
                        overline: article.title.substring(0, titleIndex),
                        ...article
                    };
                }

                return {
                    url: `/featured-content/${
                        transformString(article.taxonomy)
                    }/${transformString(article.title)}`,
                    overline: article.taxonomy.toUpperCase(),
                    ...article
                };
            }

            return article;
        });

    return [marketingArticle, otherArticle];
};

export default getCurrentArticles;
