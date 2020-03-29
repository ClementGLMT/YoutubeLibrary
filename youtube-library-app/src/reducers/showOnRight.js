import initialState from '../store/initialState';


const showOnRight = (state = initialState, action) => {

    var rep;

    switch(action.type) {


        case 'TOOGLE_VISIBLE':
            rep = state;
            rep.visible = !state.visible;
            console.log("%c Updating state in toogle visible reducer with : "+JSON.stringify(state), 'color:green')
            return rep;


        case 'SHOW_WELCOME':
            rep = state;
            rep = action.payload;
            rep.rightShowWelcome= true;
            console.log("%c Received by right reducer SHOW WELCOME: "+rep, 'color:green');
            return rep;
        
        case 'SHOW_SEARCH_AND_RESULTS':
            rep = state;
            console.log("%c State gave in right reducer SHOW SEARCH AND RESULTS : "+JSON.stringify(rep), 'color:green');
            rep = action.payload;
            rep.rightShowSearchAndResults= true;
            console.log("%c Sending by right reducer SHOW SEARCH AND RESULTS : "+JSON.stringify(rep), 'color:green');
            return rep;

        case 'SHOW_VIDEO_PLAYER':
            rep = state;
            console.log("%c State gave in right reducer SHOW_VIDEO_PLAYER : "+JSON.stringify(rep), 'color:green');
            rep = action.payload;
            rep.rightShowVideo = true;

            //console.log("%c Sending by right reducer SHOW VIDEO PLAYER ACTION : "+JSON.stringify(action), 'color:green');

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