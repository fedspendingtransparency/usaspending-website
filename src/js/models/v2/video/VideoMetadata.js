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
        this._duration = data.contentDetails.duration || '';
        this.thumbnails = data.snippet.thumbnails || '';
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
    },
    get durationInSecs() {
        const str = this._duration.toUpperCase();
        let hours = ''; let min = ''; let sec = '';
        let duration = str.replace('PT', '');
        let totalDuration = 0;

        if (duration.indexOf('H') > -1) {
            hours = duration.split('H');
            duration = hours[1];
            totalDuration += parseInt(hours[0], 10) * 3600;
        }

        if (duration.indexOf('M') > -1) {
            min = duration.split('M');
            duration = min[1];
            totalDuration += parseInt(min[0], 10) * 60;
        }

        if (duration.indexOf('S') > -1) {
            sec = duration.replace('S', '');
            if (sec.length > 0) {
                totalDuration += parseInt(sec, 10);
            }
        }

        return totalDuration;
    },
    get duration() {
        const str = this._duration.toUpperCase();
        let hours = ''; let min = ''; let sec = '';
        let duration = str.replace('PT', '');

        // if hours exist get value, add colon
        if (duration.indexOf('H') > -1) {
            hours = duration.split('H');
            duration = hours[1];
            hours = `${hours[0]}:`;
        }

        // if minutes exist get value, else set value to 0; duration should always show minutes
        if (duration.indexOf('M') > -1) {
            min = duration.split('M');
            duration = min[1];
            min = min[0];
        }
        else {
            min = `0`;
        }

        // if hours exist get value, and mins is only 1 digit add a 0 in front
        if (hours && min?.length < 2) {
            min = `0${min}`;
        }

        if (min) {
            min = `${min}:`;
        }

        // secs will always exist, so if no S in duration make S 00
        if (duration.indexOf('S') > -1) {
            sec = duration.replace('S', '');
            if (sec.length < 2) {
                sec = `0${sec}`;
            }
        }
        else {
            sec = `00`;
        }

        return `${hours}${min}${sec}`;
    }
};

export default VideoMetadata;
