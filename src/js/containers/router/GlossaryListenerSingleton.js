/**
 * GlossaryListenerSingleton.js
 * Created by Kevin Li 5/1/17
 */

class GlossaryListenerSingleton {
    constructor() {
        this.glossaryContainer = null;

        this.currentValue = '';
    }

    subscribe(container) {
        this.glossaryContainer = container;
    }

    updateGlossaryValue(value) {
        let newValue = '';
        if (value && value.glossary) {
            newValue = value.glossary;
        }

        if (this.currentValue !== newValue) {
            this.currentValue = newValue;
            this.glossaryChanged(newValue);
        }
    }

    glossaryChanged(value) {
        if (this.glossaryContainer) {
            this.glossaryContainer.detectedUrlChange(value);
        }

        // remove the query for glossary
        // const currentLocation = Router.state;
        // if (currentLocation.query && currentLocation.query.glossary) {
        //     const removedQuery = Object.assign({}, currentLocation.query);
        //     delete removedQuery.glossary;

        //     Router.history.replace({
        //         pathname: currentLocation.path,
        //         query: removedQuery
        //     });
        // }
    }

    unsubscribe() {
        this.glossaryContainer = null;
    }
}


// create a single instance of the singleton and use that from now on
const singletonInstance = new GlossaryListenerSingleton();

export default singletonInstance;
