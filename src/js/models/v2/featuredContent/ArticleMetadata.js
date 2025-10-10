/**
 * ArticleMetadata.js
 * Created by Nick Torres 9/17/2025
 */

const ArticleMetadata = {
    populate(data) {
        this.content_type = data.content_type || '';
        this.fill = data.fill || '';
        this.title = data.title || '';
        this.alt_title = data.alt_title || '';
        this.created_date = data.created_date || '';
        this.description = data.description || '';
        this.mdx_path = data.mdx_path || '';
        this.thumbnail_path = data.thumbnail_path || '';
        this.landing_header_path = data.landing_header_path || '';
        this.explore_more = data.explore_more || '';
        this.related_terms = data.related_terms || '';
    },
    get publishedAt() {
        const options = {
            weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
        };
        const date = new Date(this.created_date);
        const formattedDate = date.toLocaleDateString('en-us', options).replace(/^\w+,\s*/g, '');
        return formattedDate;
    }
};

export default ArticleMetadata;
