class MockRouter {
    constructor() {
        this.state = {
            path: '/path',
            parent: '/parent',
            params: {},
            query: {},
            silentlyUpdate: false
        };
    }

    startRouter() {
        jest.fn();
    }

    logPageView() {
        jest.fn();
    }

}

const mockInstance = new MockRouter();
export default mockInstance;
