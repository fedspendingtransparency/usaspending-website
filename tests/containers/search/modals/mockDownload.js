export const mockRequest = {
    location: "",
    status: "message",
    request_checksum: "abcd",
    request_path: "path"
};

export const mockReady = {
    location: "url",
    status: "done",
    request_checksum: "abcd",
    request_path: "path"
};

export const mockParams = {
    filters: [{
        field: "type",
        operation: "in",
        value: ["A", "B", "C", "D"]
    }],
    order: ["-abc"],
    fields: ["abc"]
};
