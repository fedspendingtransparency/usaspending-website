/**
 * GuideListenerSingleton.js
 * Created by Kevin Li 5/1/17
 */

import Router from 'containers/router/Router';

class GuideListenerSingleton {
    constructor() {
        this.guideContainer = null;

        this.currentValue = '';
    }

    subscribe(container) {
        this.guideContainer = container;
    }

    updateGuideValue(value) {
        let newValue = '';
        if (value && value.guide) {
            newValue = value.guide;
        }

        if (this.currentValue !== newValue) {
            this.currentValue = newValue;
            this.guideChanged(newValue);
        }
    }

    guideChanged(value) {
        if (this.guideContainer) {
            this.guideContainer.detectedUrlChange(value);
        }

        // remove the query for guide
        const currentLocation = Router.state;
        if (currentLocation.query && currentLocation.query.guide) {
            const removedQuery = Object.assign({}, currentLocation.query);
            delete removedQuery.guide;

            Router.history.replace({
                pathname: currentLocation.path,
                query: removedQuery
            });
        }
    }

    unsubscribe() {
        this.guideContainer = null;
    }
}


// create a single instance of the singleton and use that from now on
const singletonInstance = new GuideListenerSingleton();

export default singletonInstance;
