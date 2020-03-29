import initialState from '../store/initialState';

export default function dataLoading (state = initialState, action)  {

    var rep;

    switch(action.type) {

        case 'UPDATE_LEFTPANEL':
            rep = state;
            rep.leftPanel.videos = action.payload.videos;
            console.log("Received by Data reducer for toogle left : "+JSON.stringify(rep));
            return rep;

        case 'UPDATE_RIGHTPANEL':
            rep = state;
            rep.rightPanel.videos = action.payload.videos;
            //console.log("Received by Data reducer : "+rep);
            return rep;

        case 'RESULTS_HAS_ERRORED':
            rep = state;
            rep.rightPanel.hasErrored = action.payload.hasErrored;
            return rep;

        case 'RESULTS_ARE_LOADING':
            rep = state;
            rep.rightPanel.isLoading = action.payload.isLoading;
            return rep;

        case 'RESULTS_FETCH_DATA_SUCCESS':
            rep = state;
            //rep
            rep.rightPanel.videos = action.payload.results;
            //rep.rightPanel.isLoaded = true;
            return rep;

        case 'IS_SEARCHING': 
            rep = state;
            rep.rightPanel.isSearching.search = action.payload.isSearching;
            rep.rightPanel.isSearching.maxRes = action.payload.maxRes;
            return rep;


        default:
            //state;
            //console.log("Returning by default : "+JSON.stringify(state));
            return state;
    }

}

/*export function resultsHasErrored(state = false, action) {
    switch (action.type) {
        case 'RESULTS_HAS_ERRORED':
            return action.payload.hasErrored;
        default:
            return state;
    }
}
export function resultsAreLoading(state = false, action) {
    switch (action.type) {
        case 'RESULTS_ARE_LOADING':
            return action.payload.isLoading;
        default:
            return state;
    }
}
export function results(state = [], action) {
    switch (action.type) {
        case 'RESULTS_FETCH_DATA_SUCCESS':
            return action.payload.items;
        default:
            return state;
    }
}*/

