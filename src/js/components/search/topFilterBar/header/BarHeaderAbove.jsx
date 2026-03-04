import React, { memo, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "data-transparency-ui";
import { useDispatch } from "react-redux";
import { showModal } from "redux/actions/modal/modalActions";

// eslint-disable-next-line prefer-arrow-callback
const BarHeaderAbove = memo(function BarHeaderAbove() {
    const dispatch = useDispatch();

    const onClick = useCallback((e) => {
        e.persist();
        dispatch(showModal(window.location.href, 'filter'));
    }, [dispatch]);

    const onKeyUp = useCallback((e) => {
        e.persist();
        if (e.key === 'Enter') {
            dispatch(showModal(window.location.href, 'filter'));
        }
    }, [dispatch]);

    const image = useMemo(() => (<FontAwesomeIcon icon="window-restore" />), []);

    return (
        <div className="above-line">
            <div className="title-container">
                <h1 className="title">Search Results</h1>
                <Button
                    onClick={onClick}
                    onKeyUp={onKeyUp}
                    copy="Learn how active filters work"
                    buttonTitle="filter modal"
                    buttonSize="sm"
                    buttonType="text"
                    backgroundColor="light"
                    imageAlignment="right"
                    image={image} />
            </div>
            <h2 className="subtitle">
                {/* TODO: change these icons to font awesome 7 */}
                <FontAwesomeIcon icon="lightbulb" />
                To <span>remove active filters</span>, select the individual filter labels.
                Then, once the button appears, click "Remove selected filters".
            </h2>
        </div>
    );
});

export default BarHeaderAbove;
