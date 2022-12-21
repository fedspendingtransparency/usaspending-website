/**
 * VideoMetadata.js
 * Created by Andrea Blackwell 12/20/22
 */

const VideoMetadata = {
    populate(data) {
        this.id = data.id || '';
        this.title = data.snippet.title || '';
        this.description = data.snippet.description || '';
        this.publishedAt = data.snippet.publishedAt || '';
        this.duration = data.contentDetails.duration || '';
        this.thumbnails = data.snippet.thumbnails || '';
        this._url = data.url || '';
    },
    get url() {
        return `https://www.youtube.com/watch?v=${this.id}`;
    }
};

export default VideoMetadata;
