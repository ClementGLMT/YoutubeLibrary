import initialState from '../store/initialState';

const modalReducer = (state = initialState, action) => {

    var rep;

    switch(action.type) {

        case 'OPEN_MODAL':
            rep = state;
            rep.dimmer = 'blurring';
            rep.isOpen= true;
            rep.video = action.payload;
            return rep;

        case 'CLOSE_MODAL':
            rep = state;
            rep.dimmer = 'blurring';
            rep.isOpen= false;
            return rep;

        default:
            return state;
    }

}

export default modalReducer;