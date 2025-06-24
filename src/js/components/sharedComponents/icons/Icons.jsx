/**
  * Icons.jsx
  * Created by Kevin Li 4/25/2016
  */

import React from 'react';
import PropTypes from "prop-types";

import BaseIcon from './BaseIcon';

const propTypes = {
    iconName: PropTypes.string,
    iconClass: PropTypes.string,
    alt: PropTypes.string
};

export const AddFilter = ({
    iconName = "usa-da-icon-add-filter",
    iconClass = "usa-da-icon-add-filter",
    alt = "Icon Depicting a Filter With a Plus Symbol"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
AddFilter.propTypes = propTypes;

export const AngleDown = ({
    iconName = "usa-da-icon-angle-down",
    iconClass = "usa-da-icon-angle-down",
    alt = "Arrow Pointing Down Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
AngleDown.propTypes = propTypes;

export const AngleLeft = ({
    iconName = "usa-da-icon-angle-left",
    iconClass = "usa-da-icon-angle-left",
    alt = "Arrow Pointing Left Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
AngleLeft.propTypes = propTypes;

export const AngleRight = ({
    iconName = "usa-da-icon-angle-right",
    iconClass = "usa-da-icon-angle-right",
    alt = "Arrow Pointing Right Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
AngleRight.propTypes = propTypes;

export const AngleUp = ({
    iconName = "usa-da-icon-angle-up",
    iconClass = "usa-da-icon-angle-up",
    alt = "Arrow Pointing Up Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
AngleUp.propTypes = propTypes;

export const ArrowDown = ({
    iconName = "usa-da-icon-arrow-down",
    iconClass = "usa-da-icon-arrow-down",
    alt = "Icon Depicting an Arrow Pointed Down"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
ArrowDown.propTypes = propTypes;

export const ArrowUp = ({
    iconName = "usa-da-icon-arrow-up",
    iconClass = "usa-da-icon-arrow-up",
    alt = "Icon Depicting an Arrow Pointed Up"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
ArrowUp.propTypes = propTypes;

export const AwardLoop = ({
    iconName = "usa-da-award-history",
    iconClass = "usa-da-award-history",
    alt = "Icon Depicting Award History"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
AwardLoop.propTypes = propTypes;

export const Check = ({
    iconName = "usa-da-icon-check",
    iconClass = "usa-da-icon-check",
    alt = "Checkmark Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Check.propTypes = propTypes;

export const CheckCircle = ({
    iconName = "usa-da-icon-check-circle",
    iconClass = "usa-da-icon-check-circle",
    alt = "Checkmark or Successful Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
CheckCircle.propTypes = propTypes;

export const CircleArrowUp = ({
    iconName = "usa-da-circle-arrow-up",
    iconClass = "usa-da-circle-arrow-up",
    alt = "Icon Depicting an Arrow in a Circle Pointing Up"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
CircleArrowUp.propTypes = propTypes;

export const Close = ({
    iconName = 'usa-da-icon-close',
    iconClass = 'usa-da-icon-close',
    alt = 'Icon Depicting an X'
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Close.propTypes = propTypes;

export const ExclamationCircle = ({
    iconName = "usa-da-icon-exclamation-circle",
    iconClass = "usa-da-icon-exclamation-circle",
    alt = "Exclamation Mark Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
ExclamationCircle.propTypes = propTypes;

export const ExclamationTriangle = ({
    iconName = "usa-da-icon-exclamation-triangle",
    iconClass = "usa-da-icon-exclamation-triangle",
    alt = "Exclamation Mark Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
ExclamationTriangle.propTypes = propTypes;

export const Filter = ({
    iconName = "usa-da-icon-filter",
    iconClass = "usa-da-icon-filter",
    alt = "Icon Depicting a Filter"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Filter.propTypes = propTypes;

export const Glossary = ({
    iconName = "usa-da-icon-guide",
    iconClass = "usa-da-icon-guide",
    alt = "Icon Depicting a Glossary Book"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Glossary.propTypes = propTypes;

export const Home = ({
    iconName = "usa-da-home",
    iconClass = "usa-da-home",
    alt = "Icon Depicting a Building Representing Home"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Home.propTypes = propTypes;

export const InfoCircle = ({
    iconName = "usa-da-icon-info-circle",
    iconClass = "usa-da-icon-info-circle",
    alt = "Information"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
InfoCircle.propTypes = propTypes;

export const Search = ({
    iconName = 'usa-da-icon-search',
    iconClass = 'usa-da-icon-search',
    alt = 'Icon Depicting a Magnifying Glass'
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Search.propTypes = propTypes;

export const SpeechBubble = ({
    iconName = "usa-da-speech-bubble",
    iconClass = "usa-da-speech-bubble",
    alt = "Icon Depicting a Speech Bubble"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
SpeechBubble.propTypes = propTypes;

// TODO: All the icons listed below are not currently being used in this project (6/24/2025)
export const Agency = ({
    iconName = "usa-da-agency",
    iconClass = "usa-da-agency",
    alt = "Icon Depicting a Building Representing an Agency"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Agency.propTypes = propTypes;

export const AngleDownCircle = ({
    iconName = "usa-da-icon-angle-down-circle",
    iconClass = "usa-da-icon-angle-down-circle",
    alt = "Arrow Pointing Down Icon in Circle"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
AngleDownCircle.propTypes = propTypes;

export const AngleLeftCircle = ({
    iconName = "usa-da-icon-angle-left-circle",
    iconClass = "usa-da-icon-angle-left-circle",
    alt = "Arrow Pointing Left Icon in a Circle"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
AngleLeftCircle.propTypes = propTypes;

export const AngleRightCircle = ({
    iconName = "usa-da-icon-angle-right-circle",
    iconClass = "usa-da-icon-angle-right-circle",
    alt = "Arrow Pointing Right Icon in a Circle"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
AngleRightCircle.propTypes = propTypes;

export const AngleUpCircle = ({
    iconName = "usa-da-icon-angle-up-circle",
    iconClass = "usa-da-icon-angle-up-circle",
    alt = "Arrow Pointing Up Icon in a Circle"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
AngleUpCircle.propTypes = propTypes;

export const Award = ({
    iconName = "usa-da-award",
    iconClass = "usa-da-award",
    alt = "Icon Depicting Paper Currency Representing Awards"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Award.propTypes = propTypes;

export const Bar = ({
    iconName = "usa-da-icon-bar",
    iconClass = "usa-da-icon-bar",
    alt = "Bar Graph Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Bar.propTypes = propTypes;

export const BudgetFunction = ({
    iconName = "usa-da-budget-function",
    iconClass = "usa-da-budget-function",
    alt = "Icon Depicting a List Representing Budget Function"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
BudgetFunction.propTypes = propTypes;

export const Building = ({
    iconName = "usa-da-icon-building",
    iconClass = "usa-da-icon-building",
    alt = "Icon Depicting a Building"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Building.propTypes = propTypes;

export const Calendar = ({
    iconName = "usa-da-icon-calendar",
    iconClass = "usa-da-icon-calendar",
    alt = "Icon Depicting a Calendar"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Calendar.propTypes = propTypes;

export const CaretRight = ({
    iconName = "usa-da-caret-right",
    iconClass = "usa-da-caret-right",
    alt = "Icon Depicting an Caret Pointing Right"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
CaretRight.propTypes = propTypes;

export const CircleArrowLeft = ({
    iconName = "usa-da-circle-arrow-left",
    iconClass = "usa-da-circle-arrow-left",
    alt = "Icon Depicting an Arrow in a Circle Pointing Left"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
CircleArrowLeft.propTypes = propTypes;

export const CloseCircle = ({
    iconName = "usa-da-icon-close-circle",
    iconClass = "usa-da-icon-close-circle",
    alt = "Close"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
CloseCircle.propTypes = propTypes;

export const CloudDownload = ({
    iconName = "usa-da-icon-cloud-download",
    iconClass = "usa-da-icon-cloud-download",
    alt = "Download Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
CloudDownload.propTypes = propTypes;

export const CloudUpload = ({
    iconName = "usa-da-icon-cloud-upload",
    iconClass = "usa-da-icon-cloud-upload",
    alt = "Upload Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
CloudUpload.propTypes = propTypes;

export const Cog = ({
    iconName = "usa-da-icon-cog",
    iconClass = "usa-da-icon-cog",
    alt = "Admin Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Cog.propTypes = propTypes;

export const Envelope = ({
    iconName = "usa-da-envelope",
    iconClass = "usa-da-envelope",
    alt = "Icon Depicting an Envelope"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Envelope.propTypes = propTypes;

export const FederalAccount = ({
    iconName = "usa-da-federal-account",
    iconClass = "usa-da-federal-account",
    alt = "Icon Depicting a Credit Card Representing a Federal Account"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
FederalAccount.propTypes = propTypes;

export const File = ({
    iconName = "usa-da-icon-file",
    iconClass = "usa-da-icon-file",
    alt = "Icon Depicting a File"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
File.propTypes = propTypes;

export const FlagLogo = ({
    iconName = "usa-da-flag-logo",
    iconClass = "usa-da-flag-logo",
    alt = "USASpending Flag Logo"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
FlagLogo.propTypes = propTypes;

export const Globe = ({
    iconName = "usa-da-icon-globe",
    iconClass = "usa-da-icon-globe",
    alt = "Icon Depicting a Globe or the Earth"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Globe.propTypes = propTypes;

export const HandDrawnArrow = ({
    iconName = "usa-da-hand-drawn-arrow",
    iconClass = "usa-da-hand-drawn-arrow",
    alt = "Hand Drawn Arrow Pointing to the Next Section"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
HandDrawnArrow.propTypes = propTypes;

export const Info = ({
    iconName = "usa-da-icon-info",
    iconClass = "usa-da-icon-info",
    alt = "Icon Depicting an (i) For Information"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Info.propTypes = propTypes;

export const Line = ({
    iconName = "usa-da-icon-line",
    iconClass = "usa-da-icon-line",
    alt = "Line Graph Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Line.propTypes = propTypes;

export const Lock = ({
    iconName = "usa-da-icon-lock",
    iconClass = "usa-da-icon-lock",
    alt = "Lock or Password Requirement Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Lock.propTypes = propTypes;

export const MapMarker = ({
    iconName = "usa-da-icon-map-marker",
    iconClass = "usa-da-icon-map-marker",
    alt = "Icon Depicting a Map Marker"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
MapMarker.propTypes = propTypes;

export const MoreOptions = ({
    iconName = "usa-da-icon-more-options",
    iconClass = "usa-da-icon-more-options",
    alt = "More Options Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
MoreOptions.propTypes = propTypes;

export const ObjectClass = ({
    iconName = "usa-da-object-class",
    iconClass = "usa-da-object-class",
    alt = "Icon Depicting Shapes Representing Object Class"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
ObjectClass.propTypes = propTypes;

export const PauseCircle = ({
    iconName = "usa-da-icon-pause-circle",
    iconClass = "usa-da-icon-pause-circle",
    alt = "Icon Depicting a Pause Button"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
PauseCircle.propTypes = propTypes;

export const Pie = ({
    iconName = "usa-da-icon-pie",
    iconClass = "usa-da-icon-pie",
    alt = "Pie Graph Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Pie.propTypes = propTypes;

export const ProgramActivity = ({
    iconName = "usa-da-program-activity",
    iconClass = "usa-da-program-activity",
    alt = "Icon Depicting Shapes Representing a Program Activity"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
ProgramActivity.propTypes = propTypes;

export const QuestionCircle = ({
    iconName = "usa-da-icon-question-circle",
    iconClass = "usa-da-icon-question-circle",
    alt = "Question Mark Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
QuestionCircle.propTypes = propTypes;

export const Recipient = ({
    iconName = "usa-da-recipient",
    iconClass = "usa-da-recipient",
    alt = "Icon Depicting a Person Representing Recipients"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Recipient.propTypes = propTypes;

export const Refresh = ({
    iconName = "usa-da-refresh",
    iconClass = "usa-da-refresh",
    alt = "Icon Depicting an Arrow Curved in the Shape of a Circle"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Refresh.propTypes = propTypes;

export const Sort = ({
    iconName = "usa-da-icon-sort",
    iconClass = "usa-da-icon-sort",
    alt = "Icon Depicting six small circles"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Sort.propTypes = propTypes;

export const Table = ({
    iconName = "usa-da-icon-table",
    iconClass = "usa-da-icon-table",
    alt = "Icon Depicting a Table"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Table.propTypes = propTypes;

export const TableClosed = ({
    iconName = "usa-da-icon-table-closed",
    iconClass = "usa-da-icon-table-closed",
    alt = "Icon Depicting a Table"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
TableClosed.propTypes = propTypes;

export const TableOpen = ({
    iconName = "usa-da-icon-table-open",
    iconClass = "usa-da-icon-table-open",
    alt = "Icon Depicting a Table"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
TableOpen.propTypes = propTypes;

export const Trash = ({
    iconName = "usa-da-icon-trash",
    iconClass = "usa-da-icon-trash",
    alt = "Icon Depicting a Trash Can"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Trash.propTypes = propTypes;

export const Tree = ({
    iconName = "usa-da-icon-tree",
    iconClass = "usa-da-icon-tree",
    alt = "Tree Graph Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Tree.propTypes = propTypes;

export const Unlock = ({
    iconName = "usa-da-icon-unlock",
    iconClass = "usa-da-icon-unlock",
    alt = "Unlock Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
Unlock.propTypes = propTypes;

export const User = ({
    iconName = "usa-da-icon-user",
    iconClass = "usa-da-icon-user",
    alt = "User Icon"
}) => (
    <BaseIcon
        iconName={iconName}
        iconClass={iconClass}
        alt={alt} />
);
User.propTypes = propTypes;
