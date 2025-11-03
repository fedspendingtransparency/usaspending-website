/**
 * @jest-environment jsdom
 */
import getCurrentArticles from "../../src/js/helpers/homepageFeaturedContentHelper";

describe('getCurrentArticles', () => {
    it('should return a marketing and a non-marketing article', () => {
        const [marketing, other] = getCurrentArticles();

        expect(marketing).toHaveProperty('url');
        expect(marketing).toHaveProperty('fill');
        expect(marketing).toHaveProperty('thumbnail_path');
        expect(marketing).toHaveProperty('taxonomy');
        expect(marketing).toHaveProperty('title');

        expect(other).toHaveProperty('url');
        expect(other).toHaveProperty('fill');
        expect(other).toHaveProperty('thumbnail_path');
        expect(other).toHaveProperty('taxonomy');
        expect(other).toHaveProperty('title');
    });

    it('should return articles if the start date is far in the future', () => {
        const [marketing, other] = getCurrentArticles('12/31/2050');

        expect(marketing).toHaveProperty('url');
        expect(marketing).toHaveProperty('fill');
        expect(marketing).toHaveProperty('thumbnail_path');
        expect(marketing).toHaveProperty('taxonomy');
        expect(marketing).toHaveProperty('title');

        expect(other).toHaveProperty('url');
        expect(other).toHaveProperty('fill');
        expect(other).toHaveProperty('thumbnail_path');
        expect(other).toHaveProperty('taxonomy');
        expect(other).toHaveProperty('title');
    })

    it('should return the default articles if start date is far in the past', () => {
        const [marketing, other] = getCurrentArticles('1/1/2000');

        expect(marketing).toHaveProperty('url');
        expect(marketing).toHaveProperty('fill');
        expect(marketing).toHaveProperty('thumbnail_path');
        expect(marketing).toHaveProperty('taxonomy');
        expect(marketing).toHaveProperty('title');

        expect(other).toHaveProperty('url');
        expect(other).toHaveProperty('fill');
        expect(other).toHaveProperty('thumbnail_path');
        expect(other).toHaveProperty('taxonomy');
        expect(other).toHaveProperty('title');

        const { url, fill, thumbnail_path, taxonomy, title } = marketing;

        expect(url).toBe('/featured-content/exploring-americas-finances/exploring-americas-finances-has-never-been-easier')
        expect(fill).toBe('#1b2b85')
        expect(thumbnail_path).toBe('../../img/featuredContent/cards/exploring-americas-finances.webp')
        expect(taxonomy).toBe('Exploring America\'s Finances')
        expect(title).toBe('Exploring America\'s Finances Has Never Been Easier')

        const {
            url: url_other,
            fill: fill_other,
            thumbnail_path: thumbnail_path_other,
            taxonomy: taxonomy_other,
            title: title_other
        } = other;

        expect(url_other).toBe('/featured-content/data-definitions/what-is-an-award')
        expect(fill_other).toBe('#783cb9')
        expect(thumbnail_path_other).toBe('../../img/featuredContent/cards/data-definitions.webp')
        expect(taxonomy_other).toBe('Data Definitions')
        expect(title_other).toBe('What is an Award?')
    })
})
