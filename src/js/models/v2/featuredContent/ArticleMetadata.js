/**
 * ArticleMetadata.js
 * Created by Nick Torres 9/17/2025
 */
import { transformDate } from "../../../helpers/featuredContent/featuredContentHelper";

const ArticleMetadata = {
    populate(data) {
        this.content_type = data.content_type || '';
        this.taxonomy = data.taxonomy || '';
        this.fill = data.fill || '';
        this.title = data.title || '';
        this.alt_title = data.alt_title || '';
        this.created_date = data.created_date || '';
        this.description = data.description || '';
        this.mdx_path = data.mdx_path || '';
        this.thumbnail_path = data.thumbnail_path || '';
        this.mobile_hero = data.mobile_hero || '';
        this.hero = data.hero || '';
        this.slug = data.slug || '';
        this.explore_more = data.explore_more || '';
        this.related_terms = data.related_terms || '';
    },
    get publishedAt() {
        return transformDate(this.created_date);
    }
};

export default ArticleMetadata;
