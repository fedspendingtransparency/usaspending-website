/**
 * recipient.js
 * Created by Jonathan Hill 06/08/20
 */

const tabs = [
    {
        type: 'recipient_locations',
        label: 'Recipient Locations',
        question: 'Where are the recipients that received COVID-19 response funds?'
    },
    {
        type: 'recipients',
        label: 'Recipients',
        question: 'Who are the recipients that received COVID-19 response funding?',
        disabled: true
    },
    {
        type: 'recipient_types',
        label: 'Recipient Types',
        question: 'Which types of businesses have received COVID-19 response funds?',
        disabled: true
    }
];

export default tabs;
