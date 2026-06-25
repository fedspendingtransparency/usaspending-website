export const getPeriodTitle = (title) => {
    switch (title) {
        case "1":
        case "2":
        case "1 - 2": return "Oct-Nov";
        case "3": return "Dec";
        case "4": return "Jan";
        case "5": return "Feb";
        case "6": return "Mar";
        case "7": return "Apr";
        case "8": return "May";
        case "9": return "Jun";
        case "10": return "Jul";
        case "11": return "Aug";
        case "12": return "Sep";
        case "1 - 3": return "Oct-Dec";
        case "4 - 6": return "Jan-Mar";
        case "7 - 9": return "Apr-Jun";
        case "10 - 12": return "Jul-Sep";
        default: return title;
    }
}