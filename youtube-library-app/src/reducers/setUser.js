import initialState from '../store/initialState';


const setUser = (state = initialState , action) => {

    switch(action.type) {
        case 'SET_USER':
            var rep = state;
            console.log("Received by user reducer : "+JSON.stringify(rep));
            rep.user= action.payload.user;
            console.log("Received by user reducer : "+JSON.stringify(rep));
            return rep;

        default: 
            //state = initialState;
            console.log("Returning by default : "+state);
            return state;
    }

}

export default setUser;