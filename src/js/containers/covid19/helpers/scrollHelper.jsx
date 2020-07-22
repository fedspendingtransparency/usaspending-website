export const isElementVisible = (ref) => {
    const rect = ref.current.getBoundingClientRect();
    const verticallyVisible = (rect.top <= window.innerHeight) && ((rect.top + rect.height) >= 0);
    const horizontallyVisible = (rect.left <= window.innerWidth) && ((rect.left + rect.width) >= 0);
    return (verticallyVisible && horizontallyVisible);
};


// this function does not work in IE11
export const scrollIntoView = (loading, error, targetRef, targetReadyRef, wrapperRef, wrapperReadyRef, margin) => {
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    if ((loading || error) && targetRef.current && wrapperRef.current && window.pageYOffset > 0 && !isIE11) {
        if (isElementVisible(wrapperRef)) {
            wrapperRef.current.scrollIntoView(false);

            // add margin to current Y position so that the glossary icon doesn't overlap
            const scrollToCurrentYPos = document.documentElement.scrollTop;
            window.scrollTo(0, scrollToCurrentYPos + margin);
        }
    } else if ((!loading || !error) && targetReadyRef.current && wrapperReadyRef.current && window.pageYOffset > 0 && !isIE11) {
        if (isElementVisible(wrapperReadyRef)) {
            wrapperReadyRef.current.scrollIntoView(false);

            // add margin to current Y position so that the glossary icon doesn't overlap
            const scrollToCurrentYPos = document.documentElement.scrollTop;
            window.scrollTo(0, scrollToCurrentYPos + margin);
        }
    }
};
