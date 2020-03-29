import {store} from '../store';
const axios = require('axios');

//Update left and right lists

export function updateListReducerAction(panel, videos) {
    switch(panel) {

        case 'leftPanel':
            return {
                type: 'UPDATE_LEFTPANEL',
                payload: {
                    videos
                }
            }

        case 'rightPanel':
            return {
                type: 'UPDATE_RIGHTPANEL',
                payload: {
                    videos
                }
            }

        default:
            return;
    }
}

//For right panel transitions 

export function toggleVisibleAction() {
    var rep = {
        type: 'TOOGLE_VISIBLE'
    }
    return rep;
}

//Right pannel display actions

export function showWelcomePanelAction(payload) {

    var rep = {
        type: 'SHOW_WELCOME',
        payload
    }
    return rep;

}

export function showSearchAndResultsAction(payload) {

    var rep = {
        type: 'SHOW_SEARCH_AND_RESULTS',
        payload
    };    
    return rep;

}

export function showVideoPlayerAction(payload) {

    var rep = {
        type: 'SHOW_VIDEO_PLAYER',
        payload
    }
    return rep;

}

//Set user

export function setUserAction(value) {
    return {
        type: 'SET_USER',
        payload: {
            user: value
        }
    }
}

//Open or close the modal

export function openCloseModalAction(action, payload) {

    switch(action) {

        case 'open':
            return {
                type: 'OPEN_MODAL',
                payload
            }

        case 'close':
            return {
                type: 'CLOSE_MODAL'
            }

        default: 
            return;
    }
}

//Set is searching with the maximum results asked

export function isSearchingAction(bool, maxRes) {

    return {
        type: 'IS_SEARCHING',
        payload: {
            isSearching: bool,
            maxRes
        }
    }
}

//Loading search results actions

export function resultsAreLoadingAction(bool) {
    return {
        type: 'RESULTS_ARE_LOADING',
        payload: {
            isLoading: bool
        }
    };
}

export function resultsFetchDataSuccessAction(results) {
    return {
        type: 'RESULTS_FETCH_DATA_SUCCESS',
        payload: {
            results,
        }
    };
}

export function resultsHasErroredAction(bool) {
    return {
        type: 'RESULTS_HAS_ERRORED',
        payload: {
            hasErrored: bool
        }
    };
}

export function errorAfterFiveSecondsAction() {
    return () => {
        setTimeout(() => {
            store.dispatch(resultsHasErroredAction(true));
        }, 5000);
    };
}

//Middleware for supporting async states setting

export function resultsFetchDataAction(url, body) {
    return () => {
        store.dispatch(resultsAreLoadingAction(true));
        axios.post(url, body)
        .then(function(response) {
            if(response.status !== 200){
                store.dispatch(resultsHasErroredAction(true));

            }
            store.dispatch(resultsAreLoadingAction(false));
            if(response.data.status === 'No results') {
                store.dispatch(resultsHasErroredAction(true));
            }
            else {
                var data = response.data;
                for (let i = 0; i < data.videos.length; i++) {
                    data.videos[i]['subtitle'] = '';
                    data.videos[i]['isParsed'] = false;
                }
                store.dispatch(resultsHasErroredAction(false));
                store.dispatch(resultsFetchDataSuccessAction(data.videos));
            }
        })
        .catch( function(err) {
            console.log(err);
        })
    };
}
