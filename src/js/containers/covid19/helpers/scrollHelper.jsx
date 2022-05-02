export const isElementVisible = (ref) => {
    const rect = ref.current.getBoundingClientRect();
    const verticallyVisible = (rect.top <= window.innerHeight) && ((rect.top + rect.height) >= 0);
    const horizontallyVisible = (rect.left <= window.innerWidth) && ((rect.left + rect.width) >= 0);
    return (verticallyVisible && horizontallyVisible);
};

const isElementVisibleAndRoomExists = (ref) => (
    isElementVisible(ref) &&
    window.pageYOffset > 0
);

const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

// this function does not work in IE11
export const scrollIntoView = (loading, error, wrapperRef, wrapperReadyRef, margin, scrollIntoViewOptions, moreOptionsTabsRef) => {
    if (isIE11) {
        return;
    }

    if ((loading || error) && wrapperRef.current && moreOptionsTabsRef.current && isElementVisibleAndRoomExists(wrapperRef)) {
        moreOptionsTabsRef.current.scrollIntoView(scrollIntoViewOptions);
        const scrollToCurrentYPos = document.documentElement.scrollTop;
        window.scrollTo(0, scrollToCurrentYPos - margin);
    }
    else if (wrapperReadyRef.current && moreOptionsTabsRef.current && isElementVisibleAndRoomExists(wrapperReadyRef)) {
        moreOptionsTabsRef.current.scrollIntoView(scrollIntoViewOptions);
        const scrollToCurrentYPos = document.documentElement.scrollTop;
        window.scrollTo(0, scrollToCurrentYPos - margin);
    }
};
