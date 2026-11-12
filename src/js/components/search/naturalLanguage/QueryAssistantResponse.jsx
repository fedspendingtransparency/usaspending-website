/**
 * QueryAssistantResponse.jsx
 * Shows the result of the query assistant step: a message for queries Smart Assist cannot search,
 * or the reworded query for the user to approve or edit.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NLSearchSuggestionsIcon from './NLSearchSuggestionsIcon';
import NLDefaultHint from '../collapsibleSidebar/NLDefaultHint';
import {
    QUERY_ASSISTANT_VERDICT,
    QUERY_ASSISTANT_STATUS,
    VARIANT
} from '../collapsibleSidebar/NLConstants';

const DEFAULT_SUGGESTIONS_HEADING = 'Examples of searches Smart Assist can run:';

const propTypes = {
    status: PropTypes.string,
    result: PropTypes.shape({
        verdict: PropTypes.string,
        message: PropTypes.string,
        rewritten_query: PropTypes.string,
        suggestions: PropTypes.arrayOf(PropTypes.string),
        suggestions_heading: PropTypes.string
    }),
    onApprove: PropTypes.func,
    onEdit: PropTypes.func,
    onSelectSuggestion: PropTypes.func
};

const QueryAssistantResponse = ({
    status,
    result,
    onApprove,
    onEdit,
    onSelectSuggestion
}) => {
    if (status === QUERY_ASSISTANT_STATUS.CHECKING) {
        return (
            <div className="query-assistant-response">
                <div className="query-assistant-response__section">
                    <NLSearchSuggestionsIcon
                        variant={VARIANT.START}
                        icon="sparkles"
                        label="Checking your question..." />
                </div>
            </div>
        );
    }

    if (!result || result.verdict === QUERY_ASSISTANT_VERDICT.ANSWERABLE) {
        return null;
    }

    const {
        verdict,
        message,
        rewritten_query: rewrittenQuery,
        suggestions = [],
        suggestions_heading: suggestionsHeading
    } = result;
    const isApproved = status === QUERY_ASSISTANT_STATUS.APPROVED;

    if (verdict === QUERY_ASSISTANT_VERDICT.REPHRASE) {
        return (
            <div className="query-assistant-response">
                <div className="query-assistant-response__section">
                    {message && (
                        <p className="query-assistant-response__reason">
                            <FontAwesomeIcon className="query-assistant-response__reason-icon" icon="info-circle" />
                            {message}
                        </p>
                    )}
                    <div className="query-assistant-response__card">
                        <span className="query-assistant-response__label">
                            {isApproved ? 'Searching for' : 'Suggested search'}
                        </span>
                        <p className="query-assistant-response__rewrite">{rewrittenQuery}</p>
                        {!isApproved && (
                            <div className="query-assistant-response__actions">
                                <button
                                    type="button"
                                    className="query-assistant-response__approve"
                                    onClick={() => onApprove(rewrittenQuery)}>
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    className="query-assistant-response__edit"
                                    onClick={() => onEdit(rewrittenQuery)}>
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="query-assistant-response">
            <div className="query-assistant-response__section">
                <p className="query-assistant-response__reason">
                    <FontAwesomeIcon className="query-assistant-response__reason-icon" icon="info-circle" />
                    {message}
                </p>
                {suggestions.length > 0 && (
                    <span className="query-assistant-response__label">
                        {suggestionsHeading || DEFAULT_SUGGESTIONS_HEADING}
                    </span>
                )}
            </div>
            {suggestions.length > 0 && (
                <>
                    {/* same wrapper the start page uses, so its padding and hint styles apply unchanged */}
                    <div className="sidebar-body-row">
                        {suggestions.map((suggestion) => (
                            <NLDefaultHint
                                key={suggestion}
                                onClick={() => onSelectSuggestion(suggestion)}
                                hint={<p>{suggestion}</p>} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

QueryAssistantResponse.propTypes = propTypes;
export default QueryAssistantResponse;
