import initialState from '../store/initialState';

const dataLoading = (state = initialState, action) => {

    switch(action.type) {

        case 'TOOGLE_ISDATALOADED_LEFTPANEL':
            var rep = state;
            rep.isLeftDataLoaded= !state.isLeftDataLoaded;
            console.log("Received by Data reducer : "+JSON.stringify(rep));
            return rep;

        case 'TOOGLE_ISDATALOADED_RIGHTPANEL':
            var rep = state;
           rep.isRightDataLoaded= !state.isRightDataLoaded;
            console.log("Received by Data reducer : "+rep);
            return rep;

        default:
            //state;
            console.log("Returning by default : "+JSON.stringify(state));
            return state;
    }

}

export default dataLoading;