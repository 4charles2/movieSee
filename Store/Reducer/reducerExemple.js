function reducerProfil(state, action){
    let nextState;

    switch(action.type) {
        case 'ADD_PROFIL':
        nextState = {
            ...state,
            profil: action.value
        }
            return nextState
        case 'UPDATE_PROFIL':

            return nextState
        case 'DELETE_PROFIL':

            return nextState
        default:
            return nextState
    }

    return nextState
}