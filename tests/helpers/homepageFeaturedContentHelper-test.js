/**
 * @jest-environment jsdom
 */
import getCurrentArticles from "../../src/js/helpers/homepageFeaturedContentHelper";

describe('getCurrentArticles', () => {
    it('should return a marketing and a non-marketing article', () => {
        const [marketing, other] = getCurrentArticles('week');

        expect(marketing).toHaveProperty('url');
        expect(marketing).toHaveProperty('taxonomy');
        expect(marketing).toHaveProperty('title');

        expect(other).toHaveProperty('url');
        expect(other).toHaveProperty('taxonomy');
        expect(other).toHaveProperty('title');
    });

    it('should return articles if the start date is far in the future', () => {
        const [marketing, other] = getCurrentArticles('week', '12/31/2050');

        expect(marketing).toHaveProperty('url');
        expect(marketing).toHaveProperty('taxonomy');
        expect(marketing).toHaveProperty('title');

        expect(other).toHaveProperty('url');
        expect(other).toHaveProperty('taxonomy');
        expect(other).toHaveProperty('title');
    });

    it('should return the default articles if start date is far in the past', () => {
        const [marketing, other] = getCurrentArticles('week', '1/1/2000');

        expect(marketing).toHaveProperty('url');
        expect(marketing).toHaveProperty('taxonomy');
        expect(marketing).toHaveProperty('title');

        expect(other).toHaveProperty('url');
        expect(other).toHaveProperty('taxonomy');
        expect(other).toHaveProperty('title');

        const {
            url, fill, thumbnail_path: thumbnailPath, taxonomy, title
        } = marketing;

        expect(url).toBe('/featured-content/exploring-americas-finances/exploring-americas-finances-has-never-been-easier');
        expect(fill).toBe('#1b2b85');
        expect(thumbnailPath).toBe('../../img/featuredContent/cards/exploring-americas-finances.webp');
        expect(taxonomy).toBe('Exploring America\'s Finances');
        expect(title).toBe('Exploring America\'s Finances Has Never Been Easier');

        const {
            url: urlOther,
            fill: fillOther,
            thumbnail_path: thumbnailPathOther,
            taxonomy: taxonomyOther,
            title: titleOther
        } = other;

        expect(urlOther).toBe('/featured-content/data-definitions/what-is-an-award');
        expect(fillOther).toBe('#783cb9');
        expect(thumbnailPathOther).toBe('../../img/featuredContent/cards/data-definitions.webp');
        expect(taxonomyOther).toBe('Data Definitions');
        expect(titleOther).toBe('What is an Award?');
    });
});
