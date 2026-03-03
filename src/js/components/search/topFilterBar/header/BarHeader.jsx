import React, { useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "data-transparency-ui";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { showModal } from "redux/actions/modal/modalActions";

const propTypes = { filterCount: PropTypes.number };

const BarHeader = ({ filterCount }) => {
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
        <div className="search-top-filter-header">
            <div className="above-line">
                <div className="title-container">
                    <div className="title">Search Results</div>
                    <div className="subtitle">
                        {/* TODO: change these icons to font awesome 7 */}
                        <FontAwesomeIcon icon="lightbulb" />
                      To remove active filters, select the individual filter labels.
                      Then, once the button appears, click "Remove selected filters".
                    </div>
                </div>
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
            <h2
                className="header-title"
                id="top-filter-bar-title">
                {`${filterCount} Active Filter${filterCount !== 1 ? 's' : ''}:`}
            </h2>
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
    );
};

BarHeader.propTypes = propTypes;
export default BarHeader;
