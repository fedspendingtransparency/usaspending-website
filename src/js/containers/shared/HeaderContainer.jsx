import { connect } from 'react-redux';

import { showModal } from 'redux/actions/modal/modalActions';
import Header from 'components/sharedComponents/header/Header';

export default connect(
    null,
    (dispatch) => ({
        showModal: (url, modalType) => dispatch(showModal(url, modalType))
    }))(Header);
