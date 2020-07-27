export const isElementVisible = (ref) => {
    const rect = ref.current.getBoundingClientRect();
    const verticallyVisible = (rect.top <= window.innerHeight) && ((rect.top + rect.height) >= 0);
    const horizontallyVisible = (rect.left <= window.innerWidth) && ((rect.left + rect.width) >= 0);
    return (verticallyVisible && horizontallyVisible);
};


// this function does not work in IE11
export const scrollIntoView = (loading, error, wrapperRef, wrapperReadyRef, margin, scrollIntoViewOptions, moreOptionsTabsRef) => {
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    if ((loading || error) && !isIE11 && wrapperRef.current && moreOptionsTabsRef.current && isElementVisible(wrapperRef) && window.pageYOffset > 0) {
        moreOptionsTabsRef.current.scrollIntoView(scrollIntoViewOptions);
        const scrollToCurrentYPos = document.documentElement.scrollTop;
        window.scrollTo(0, scrollToCurrentYPos - margin);
    }
    if ((!loading || !error) && !isIE11 && wrapperReadyRef.current && moreOptionsTabsRef.current && isElementVisible(wrapperReadyRef) && window.pageYOffset > 0) {
        moreOptionsTabsRef.current.scrollIntoView(scrollIntoViewOptions);
        const scrollToCurrentYPos = document.documentElement.scrollTop;
        window.scrollTo(0, scrollToCurrentYPos - margin);
    }
};
