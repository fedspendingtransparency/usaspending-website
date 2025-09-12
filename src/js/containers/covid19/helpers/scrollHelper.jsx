export const isElementVisible = (ref) => {
    const rect = ref.current.getBoundingClientRect();
    const verticallyVisible = (rect.top <= window.innerHeight) && ((rect.top + rect.height) >= 0);
    const horizontallyVisible = (rect.left <= window.innerWidth) && ((rect.left + rect.width) >= 0);
    return (verticallyVisible && horizontallyVisible);
};

const isElementVisibleAndRoomExists = (ref) => (
    isElementVisible(ref) &&
    window.scrollY > 0
);

// this function does not work in IE11
export const scrollIntoView = (loading, error, wrapperRef, wrapperReadyRef, margin,
    scrollIntoViewOptions, moreOptionsTabsRef) => {
    if (((loading || error) && wrapperRef.current && moreOptionsTabsRef.current &&
    isElementVisibleAndRoomExists(wrapperRef)) ||
    (wrapperReadyRef.current && moreOptionsTabsRef.current &&
    isElementVisibleAndRoomExists(wrapperReadyRef))) {
        moreOptionsTabsRef.current.scrollIntoView(scrollIntoViewOptions);
        const scrollToCurrentYPos = document.documentElement.scrollTop;
        window.scrollTo(0, scrollToCurrentYPos - margin);
    }
};
