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

const getCurrentArticles = (dayOneString = '11/13/2025') => {
    // get the sprint number and week number from today's date and start date
    const today = new Date('11/12/2026');
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
    const currentOtherArticle = otherArticles.length > 0 ?
        otherArticles[featureWeekNum - 1] :
        fallbackOtherArticle;
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
