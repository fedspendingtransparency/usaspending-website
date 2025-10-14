/**
 * featuredContentHelper.js
 * Created by Nick Torres 9/23/2025
*/

export const transformString = (input) => input.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase();

export const transformDate = (input) => {
    const options = {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    };
    const date = new Date(input);
    const formattedDate = date.toLocaleDateString('en-us', options).replace(/^\w+,\s*/g, '');
    return formattedDate;
};
