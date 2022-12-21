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
    }
    //
    // get name() {
    //     const abbreviation = this._abbreviation ? ` (${this._abbreviation})` : '';
    //     return `${this._name}${abbreviation}`;
    // }
};

export default VideoMetadata;
