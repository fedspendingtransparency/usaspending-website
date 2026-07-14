/**
 * GlobalModalContainer.jsx
 * Created by Lizzie Salita 2/22/18
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '-redux/actions/modal/modalActions';
import FilterModal from "components/sharedComponents/FilterModal";
import RedirectModal from 'components/sharedComponents/RedirectModal';
import InterimDataDisclaimerModal from 'components/covid19/InterimDataDisclaimerModal';
import CovidModalContainer from 'containers/covid19/CovidModalContainer';
import TrainingVideoModal from "components/sharedComponents/TrainingVideoModal";
import UEIModalContainer from "containers/shared/UEIModalContainer";



const  GlobalModalContainer = () => {
    const globalModal = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    if (globalModal.modal === "redirect") {
        return (
            <RedirectModal
                mounted={globalModal.display}
                hideModal={dispatch(hideModal)}
                url={globalModal.url} />
        );
    }
    if (globalModal.modal === "covid") {
        return (
            <CovidModalContainer
                mounted={globalModal.display}
                hideModal={dispatch(hideModal)} />
        );
    }
    if (globalModal.modal === "covid-data-disclaimer") {
        return (
            <InterimDataDisclaimerModal
                mounted={globalModal.display}
                hideModal={dispatch(hideModal)} />
        );
    }
    if (globalModal.modal === "uei") {
        return (
            <UEIModalContainer
                mounted={globalModal.display}
                hideModal={dispatch(hideModal)} />
        );
    }
    if (globalModal.modal === "training-videos") {
        return (
            <TrainingVideoModal
                mounted={globalModal.display}
                hideModal={dispatch(hideModal)}
                title={globalModal.title}
                description={globalModal.description}
                duration={globalModal.duration}
                publishedAt={globalModal.publishedAt}
                id={globalModal.id} />
        );
    }

    if (globalModal.modal === "filter") {
        return (
            <FilterModal
                mounted={globalModal.display}
                hideModal={dispatch(hideModal)} />
        );
    }
    return null;
}

export default GlobalModalContainer;

