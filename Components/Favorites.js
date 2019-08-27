//Components/Favorites.js

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import FilmList from "./FilmList";
import {connect} from "react-redux"


class Favorites extends React.Component{

    render() {
        return (
            <FilmList
                    films={this.props.favoritesFilm}
                    navigation={this.props.navigation}
                    favoriteList={true} //Ici on est dans le cas de la liste des favoris Ce boolen a true permettra d'empêcher de lancer la recherche de plus de film après un scroll lorsqu'on est sur la vue Favoris
                />
        )
    }

}

const styles = StyleSheet.create({})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Favorites);