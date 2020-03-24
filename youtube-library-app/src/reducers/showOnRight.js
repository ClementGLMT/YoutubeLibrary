import initialState from '../store/initialState';


const showOnRight = (state = initialState, action) => {

    switch(action.type) {

        case 'SHOW_WELCOME':
            var rep = state;
            rep.rightShowWelcome= true;
            rep.ShowOnRight = action.payload;
            //console.log("Received by right reducer : "+rep);
            return rep;
        
        case 'SHOW_SEARCH_AND_RESULTS':
            var rep = state;
            rep = action.payload;
            rep.rightShowSearchAndResults= true;
            console.log("Sending by right reducer : "+JSON.stringify(rep));
            return rep;

        case 'SHOW_VIDEO_PLAYER':
            var rep = state;
            rep = action.payload;
            rep.rightShowVideo= true;
            console.log("Sending by right reducer : "+JSON.stringify(rep));
            return rep;

        default: 
            //state = initialState;
            //console.log("Returning by default : "+JSON.stringify(state));
            return state;
        
    }

}

export default showOnRight;