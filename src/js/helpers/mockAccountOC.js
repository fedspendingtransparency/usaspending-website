class MockAPI {
    generateResponse() {
        return new Promise((resolve) => {
            const data = {
                results: [
                    {
                        id: 1,
                        name: "First major object class",
                        minor_object_class: [
                            {
                                id: 2,
                                name: "First minor object class"
                            },
                            {
                                id: 3,
                                name: "Second minor object class"
                            },
                            {
                                id: 4,
                                name: "Third minor object class"
                            }
                        ]
                    },
                    {
                        id: 5,
                        name: "Second major object class",
                        minor_object_class: [
                            {
                                id: 6,
                                name: "First minor object class in second"
                            },
                            {
                                id: 7,
                                name: "Second minor object class in second"
                            }
                        ]
                    },
                    {
                        id: 8,
                        name: "Major OC without children",
                        minor_object_class: []
                    }
                ]
            };

            setTimeout(() => {
                resolve({
                    data
                });
            }, 1500);
        });
    }
}

const instance = new MockAPI();
export default instance;
