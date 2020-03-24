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

    var rep = {}
    rep.type = 'SHOW_WELCOME';
    rep.payload[lastDisp] = false;
    return rep;

}

export function showSearchAndResults(lastDisp) {

    var rep = {
        type: 'SHOW_VIDEO_PLAYER',
        payload: {

        }
    };
    rep.type = 'SHOW_SEARCH_AND_RESULTS';
    rep.payload[lastDisp] = false;
    console.log("Action created: "+JSON.stringify(rep));
    return rep;

}

export function showVideoPlayer(lastDisp) {

    var rep = {
        type: 'SHOW_VIDEO_PLAYER',
        payload: {

        }
    }
    rep.type = 'SHOW_VIDEO_PLAYER';
    rep.payload[lastDisp] = false;
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