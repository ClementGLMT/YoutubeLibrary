import initialState from '../store/initialState';


const showOnRight = (state = initialState, action) => {

    var rep;

    switch(action.type) {


        case 'TOOGLE_VISIBLE':
            rep = state;
            rep.visible = !state.visible;
            return rep;


        case 'SHOW_WELCOME':
            rep = state;
            rep = action.payload;
            rep.showWelcome= true;
            return rep;
        
        case 'SHOW_SEARCH_AND_RESULTS':
            rep = state;
            rep = action.payload;
            rep.showSearchAndResults= true;
            return rep;

        case 'SHOW_VIDEO_PLAYER':
            rep = state;
            rep = action.payload;
            rep.showVideo = true;
            return rep;

        default: 
            return state;
        
    }

}

export default showOnRight;