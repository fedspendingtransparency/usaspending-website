/**
 * searchSubAwardTableReducer.js
 * Created by Jonathan Hill 12/05/19
 */


const initialState = {
    subAwardIDClicked: false
};

const searchSubAwardTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBAWARD_ID_CLICKED':
            return Object.assign({}, state, {
                subAwardIDClicked: action.value
            });
        default:
            return state;
    }
};

export default searchSubAwardTableReducer;
