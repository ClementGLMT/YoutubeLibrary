import initialState from '../store/initialState';

export default function dataLoading (state = initialState, action)  {

    var rep;

    switch(action.type) {

        case 'UPDATE_LEFTPANEL':
            rep = state;
            rep.leftPanel.videos = action.payload.videos;
            return rep;

        case 'UPDATE_RIGHTPANEL':
            rep = state;
            rep.rightPanel.videos = action.payload.videos;
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
            rep.rightPanel.videos = action.payload.results;
            return rep;

        case 'IS_SEARCHING': 
            rep = state;
            rep.rightPanel.isSearching.search = action.payload.isSearching;
            rep.rightPanel.isSearching.maxRes = action.payload.maxRes;
            return rep;


        default:
            return state;
    }

}
