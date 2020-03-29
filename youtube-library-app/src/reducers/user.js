import initialState from '../store/initialState';


const setUser = (state = initialState , action) => {

    switch(action.type) {
        case 'SET_USER':
            var rep = state;
            rep.user= action.payload.user;
            return rep;

        default: 
            return state;
    }

}

export default setUser;