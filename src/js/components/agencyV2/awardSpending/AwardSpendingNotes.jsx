/**
 * AwardSpendingNotes.jsx
 * Created by Brian Petway 11/18/21
 */

import React from "react";

const AwardSpendingNotes = () => (
    <div className="award-spending__notes-wrapper">
        <div className="award-spending__notes-text">
            <b>NOTE:</b> The sub-agencies presented in this section represent
            awarding organizations and were sourced from the General Services
            Administration (GSA) Federal Hierarchy (available at{ ' ' }
            <a
                href="https://sam.gov/content/hierarchy"
                target="_blank"
                rel="noopener noreferrer">
                https://sam.gov/content/hierarchy
            </a>
            ). This award hierarchy establishes the relationship between a
            department or independent agency’s sub-tiers and its offices and is used
            by federal agencies as the authoritative source for managing federal
            funding and awarding organizations.
        </div>
    </div>
);

export default AwardSpendingNotes;
