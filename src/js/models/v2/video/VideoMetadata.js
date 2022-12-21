/**
 * VideoMetadata.js
 * Created by Andrea Blackwell 12/20/22
 */

const VideoMetadata = {
    populate(data) {
        this.name = data.name || '';
        this.title = data.title || '';
        this.description = data.description || '';
        // eslint-disable-next-line camelcase
        this.id = data.id || '';
        this.duration = data.duration || '';
        this.thumbnail = data.thumbnail || '';
    }
    //
    // get name() {
    //     const abbreviation = this._abbreviation ? ` (${this._abbreviation})` : '';
    //     return `${this._name}${abbreviation}`;
    // }
};

export default VideoMetadata;
