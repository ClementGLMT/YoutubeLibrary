import initialState from '../store/initialState';


const showOnRight = (state = initialState, action) => {

    switch(action.type) {

        case 'SHOW_WELCOME':
            var rep = state;
            rep.ShowOnRight.rightShowWelcome= 1;
            rep.ShowOnRight = action.payload;
            //console.log("Received by right reducer : "+rep);
            return rep;
        
        case 'SHOW_SEARCH_AND_RESULTS':
            var rep = state;
            rep.ShowOnRight.rightShowSearchAndResults= 1;
            rep.ShowOnRight = action.payload;
            //console.log("Received by right reducer : "+rep);
            return rep;

        case 'SHOW_VIDEO_PLAYER':
            var rep = state;
            rep.ShowOnRight.rightShowVideo= 1;
            rep.ShowOnRight = action.payload;
            //console.log("Received by right reducer : "+rep);
            return rep;

        default: 
            //state = initialState;
            console.log("Returning by default : "+JSON.stringify(state));
            return state;
        
    }

}

export default showOnRight;