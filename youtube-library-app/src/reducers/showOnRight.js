import initialState from '../store/initialState';


const showOnRight = (state = initialState, action) => {

    switch(action.type) {

        case 'SHOW_WELCOME':
            var rep = state;
            rep.rightShowWelcome= true;
            rep.ShowOnRight = action.payload;
            console.log("%c Received by right reducer SHOW WELCOME: "+rep, 'color:green');
            return rep;
        
        case 'SHOW_SEARCH_AND_RESULTS':
            var rep = state;
            rep = action.payload;
            rep.rightShowSearchAndResults= true;
            console.log("%c Sending by right reducer SHOW SEARCH AND RESULTS : "+JSON.stringify(rep), 'color:green');
            return rep;

        case 'SHOW_VIDEO_PLAYER':
            var rep = state;
            rep = action.payload;
            rep.rightShowVideo = true;

            console.log("%c Sending by right reducer SHOW VIDEO PLAYER ACTION : "+JSON.stringify(action), 'color:green');

            //rep.rightShowVideo[action.payload]
            console.log("%c Sending by right reducer SHOW VIDEO PLAYER: "+JSON.stringify(rep), 'color:green');
            return rep;

        default: 
            //state = initialState;
            //console.log("Returning by default : "+JSON.stringify(state));
            return state;
        
    }

}

export default showOnRight;