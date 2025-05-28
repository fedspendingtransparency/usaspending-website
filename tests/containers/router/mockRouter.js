class MockRouter {
    constructor() {
        this.state = {
            path: '/agency/department-of-sandwiches',
            parent: '/agency',
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
