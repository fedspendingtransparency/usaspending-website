export const mockAvailableOC = {
    results: [
        {
            id: 1,
            name: 'Major OC 1',
            minor_object_class: [
                {
                    id: 10,
                    name: 'Minor OC 10'
                },
                {
                    id: 20,
                    name: 'Minor OC 20'
                }
            ]
        }
    ]
};

export const mockReduxActions = {
    toggleObjectClass: jest.fn(),
    setAvailableObjectClasses: jest.fn(),
    bulkObjectClassesChange: jest.fn()
};
