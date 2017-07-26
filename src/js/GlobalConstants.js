/**
 * GlobalConstants.js
 * Created by Kevin Li 6/20/17
 */

// use the correct GlobalConstants file based on the current environment

let isDev = true;
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    isDev = false;
}

const kGlobalConstants = isDev ?
    require('../../GlobalConstants_dev').default : require('../../GlobalConstants_prod').default;

export default kGlobalConstants;
