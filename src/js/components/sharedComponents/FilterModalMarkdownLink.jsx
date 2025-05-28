

import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showModal } from "../../redux/actions/modal/modalActions";

export default () => {
    const dispatch = useDispatch();

    return (
        <div
            className="collapsible-sidebar--dsm-wrapper--text-section"
            style={{ marginTop: "1.5em" }}>
            <Button
                onClick={(e) => {
                    e.persist();
                    dispatch(showModal(window.location.href, 'filter'));
                }}
                onKeyUp={(e) => {
                    e.persist();
                    if (e.key === 'Enter') {
                        dispatch(showModal(window.location.href, 'filter'));
                    }
                }}
                copy="Learn how active filters work"
                buttonTitle="filter modal"
                buttonSize="sm"
                buttonType="text"
                backgroundColor="light"
                imageAlignment="right"
                image={<FontAwesomeIcon icon="window-restore" />}
                additionalClassnames="collapsible-sidebar--dsm-wrapper--text-section--button" />
        </div>
    );
};
