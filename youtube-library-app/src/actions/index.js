export function toogleIsDataLoaded(panel) {
    switch(panel) {

        case 'leftPanel':
            return {
                type: 'TOOGLE_ISDATALOADED_LEFTPANEL'
            }

        case 'rightPanel':
            return {
                type: 'TOOGLE_ISDATALOADED_RIGHTPANEL'
            }

        default:
            return;
    }
}

export function showWelcomePanel(lastDisp) {

    var rep = {}
    rep.type = 'SHOW_WELCOME';
    rep.payload[lastDisp] = 0;
    return rep;

}

export function showSearchAndResults(lastDisp) {

    var rep = {};
    rep.type = 'SHOW_SEARCH_AND_RESULTS';
    rep.payload[lastDisp] = 0;
    return rep;

}

export function showVideoPlayer(lastDisp) {

    var rep = {}
    rep.type = 'SHOW_VIDEO_PLAYER';
    rep.payload[lastDisp] = 0;
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