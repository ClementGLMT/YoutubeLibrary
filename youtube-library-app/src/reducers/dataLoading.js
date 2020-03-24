import initialState from '../store/initialState';

const dataLoading = (state = initialState, action) => {

    switch(action.type) {

        case 'UPDATE_LEFTPANEL':
            var rep = state;
            rep.leftPanel.videos = action.payload.videos;
            console.log("Received by Data reducer for toogle left : "+JSON.stringify(rep));
            return rep;

        case 'UPDATE_RIGHTPANEL':
            var rep = state;
            rep.rightPanel.videos = action.payload.videos;
            //console.log("Received by Data reducer : "+rep);
            return rep;

        default:
            //state;
            //console.log("Returning by default : "+JSON.stringify(state));
            return state;
    }

}

export default dataLoading;