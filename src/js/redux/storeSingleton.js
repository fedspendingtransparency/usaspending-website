// we'll hold onto a reference to the Redux store here for our helpers to use
const storeSingleton = {
    setStore(store) {
        this.store = store;
    }
};

export default storeSingleton;
