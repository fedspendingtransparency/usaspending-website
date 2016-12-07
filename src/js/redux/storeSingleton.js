// we'll hold onto a reference to the Redux store here for our helpers to use
let instance = null;
let store = null;

const setStore = (parentStore) => {
    store = parentStore;
};

export default class StoreSingleton {
    constructor() {
        if (!instance) {
            instance = this;
        }

        instance.setStore = setStore;
        instance.store = store;

        return instance;
    }
}
