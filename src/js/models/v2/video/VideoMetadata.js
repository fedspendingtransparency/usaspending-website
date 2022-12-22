/**
 * VideoMetadata.js
 * Created by Andrea Blackwell 12/20/22
 */

const VideoMetadata = {
    populate(data) {
        this.id = data.id || '';
        this.title = data.snippet.title || '';
        this.description = data.snippet.description || '';
        this._publishedAt = data.snippet.publishedAt || '';
        this.duration = data.contentDetails.duration || '';
        this.thumbnails = data.snippet.thumbnails || '';
        this._url = data.url || '';
    },
    get url() {
        return `https://www.youtube.com/watch?v=${this.id}`;
    },

    get publishedAt() {
        const options = {
            weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
        };
        const date = new Date(this._publishedAt);
        const formattedDate = date.toLocaleDateString('en-us', options).replace(/^\w+,\s*/g, '');
        return formattedDate;
    }
};

export default VideoMetadata;
