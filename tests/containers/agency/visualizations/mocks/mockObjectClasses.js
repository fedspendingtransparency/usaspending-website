/**
 * Created by michaelbray on 6/14/17.
 */

export const mockMajorObjectClasses = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        previous: null
    },
    req: "abc",
    results: [
        {
            major_object_class_code: "90",
            major_object_class_name: "Other",
            obligated_amount: "50"
        },
        {
            major_object_class_code: "30",
            major_object_class_name: "Acquisition of assets",
            obligated_amount: "300"
        },
        {
            major_object_class_code: "20",
            major_object_class_name: "Contractual services and supplies",
            obligated_amount: "1000"
        },
        {
            major_object_class_code: "10",
            major_object_class_name: "Personnel compensation and benefits",
            obligated_amount: "80"
        },
        {
            major_object_class_code: "40",
            major_object_class_name: "Grants and fixed charges",
            obligated_amount: "120"
        },
        {
            major_object_class_code: "00",
            major_object_class_name: "Other",
            obligated_amount: "-30"
        }
    ]
};

export const mockMinorObjectClasses = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        previous: null
    },
    req: "abc",
    results: [
        {
            object_class_code: "232",
            object_class_name: "Rental payments to others",
            obligated_amount: "100"
        },
        {
            object_class_code: "253",
            object_class_name: "Other goods and services from Federal sources",
            obligated_amount: "200"
        }
    ]
};
