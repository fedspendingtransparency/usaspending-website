/**
 * @jest-environment jsdom
 */
import doParamsContainInitialApplicationLoadForDAPGoogleAnalytics from 'helpers/analytics/doParamsContainInitialApplicationLoadForDAPGoogleAnalytics';

test('should return false if string is not present in params', () => {
    expect(doParamsContainInitialApplicationLoadForDAPGoogleAnalytics(['', null, 'yolo', 'isNotInitialApplicationLoadForDAPGoogleAnalytics'])).toEqual(false);
});

test('should return false if params are not an array', () => {
    expect(doParamsContainInitialApplicationLoadForDAPGoogleAnalytics('isInitialApplicationLoadForDAPGoogleAnalytics')).toEqual(false);
});

test('should return true if string is present in params', () => {
    expect(doParamsContainInitialApplicationLoadForDAPGoogleAnalytics(['', null, 'yolo', 'isInitialApplicationLoadForDAPGoogleAnalytics'])).toEqual(true);
});
