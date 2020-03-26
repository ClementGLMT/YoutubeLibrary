import {store} from '../store';
const axios = require('axios');

export function updateListReducer(panel, videos) {
    switch(panel) {

        case 'leftPanel':
            console.log('left Action created');
            return {
                type: 'UPDATE_LEFTPANEL',
                payload: {
                    videos
                }
            }

        case 'rightPanel':
            //console.log('')
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

export function showWelcomePanel(lastDisp) {

    var rep = {
        type: 'SHOW_WELCOME',
        payload: {

        }
    }
    rep.payload[lastDisp] = false;
    return rep;

}

export function showSearchAndResults(lastDisp) {

    var rep = {
        type: 'SHOW_SEARCH_AND_RESULTS',
        payload: {

        }
    };
    
    rep.payload[lastDisp] = false;
    console.log("Action created: "+JSON.stringify(rep));
    return rep;

}

export function showVideoPlayer(payload) {

    var rep = {
        type: 'SHOW_VIDEO_PLAYER',
        payload
    }

    //rep.payload[lastDisp] = false;
    console.log("Action created: "+JSON.stringify(rep));

    return rep;

}

export function setUser(value) {
    return {
        type: 'SET_USER',
        payload: {
            user: value
        }
    }
}

export function modalAction(action, payload) {

    switch(action) {

        case 'open':
            console.log("Returning action : "+JSON.stringify({
                type: 'OPEN_MODAL',
                payload
            }));
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

export function isSearching(bool, maxRes) {

    return {
        type: 'IS_SEARCHING',
        payload: {
            isSearching: bool,
            maxRes
        }
    }
}

export function resultsAreLoading(bool) {
    console.log("Results are loading: "+JSON.stringify({
        type: 'RESULTS_ARE_LOADING',
        payload: {
            isLoading: bool,
        }
    }));
    return {
        type: 'RESULTS_ARE_LOADING',
        payload: {
            isLoading: bool
        }
    };
}

export function resultsFetchDataSuccess(results) {
    console.log("Results are fetch: "+JSON.stringify({
        type: 'RESULTS_FETCH_DATA_SUCCESS',
        payload: {
            results,
        }
    }));
    return {
        type: 'RESULTS_FETCH_DATA_SUCCESS',
        payload: {
            results,
        }
    };
}

export function resultsHasErrored(bool) {
    console.log('%c Error retrieving data', 'color: red');
    return {
        type: 'RESULTS_HAS_ERRORED',
        payload: {
            hasErrored: bool
        }
    };
}

export function errorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            store.dispatch(resultsHasErrored(true));
        }, 5000);
    };
}

export function resultsFetchData(url, body) {
    return (dispatch) => {
        store.dispatch(resultsAreLoading(true));
        console.log("Fetching with body = "+JSON.stringify(body))
        axios.post(url, body)
        .then(function(response) {
            if(response.status !== 200){
                console.log(response.statusText);
                store.dispatch(resultsHasErrored(true));

            }
            store.dispatch(resultsAreLoading(false));
            if(response.data.status === 'No results') {
                store.dispatch(resultsHasErrored(true));
            }
            else {
                console.log("Got raw rfesponse : "+JSON.stringify(response.data));
                var data = response.data;
                for (let i = 0; i < data.videos.length; i++) {
                    data.videos[i]['subtitle'] = '';
                    data.videos[i]['isParsed'] = false;
                }
                store.dispatch(resultsHasErrored(false));
                store.dispatch(resultsFetchDataSuccess(data.videos));
            }
        })
        .catch( function(err) {
            console.log(err);
        })
    };
}
