function reducerProfil(state, action){
    let nextState;
    switch(action.type){
        case 'ADD_PROIFIL':
            //Ajout du profil contenu dans acton.value au state de mon application
            return nextState;
        case 'UPDATE_PROFIL':
            //Modification du profil contenu dans action.value dans le state de mon application
            return nextState;
        case 'DELETE_PROFIL':
            //Supression du profil contenu dans action.value du state de l'application
            return nextState;
        default:
            return state;
    }

}