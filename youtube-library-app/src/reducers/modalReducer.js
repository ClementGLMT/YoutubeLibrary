import initialState from '../store/initialState';

const modalReducer = (state = initialState, action) => {

    var rep;

    switch(action.type) {

        case 'OPEN_MODAL':
            rep = state;
            rep.dimmer = 'blurring';
            rep.isModalOpen= true;
            rep.video = action.payload;
            return rep;

        case 'CLOSE_MODAL':
            rep = state;
            rep.dimmer = 'blurring';
            rep.isModalOpen= false;
            //console.log("Received by Data reducer : "+rep);
            return rep;

        default:
            //state;
            //console.log("Returning by default : "+JSON.stringify(state));
            return state;
    }

}

export default modalReducer;