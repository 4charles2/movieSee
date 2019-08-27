import React from 'react'
import {View, Button, TextInput, StyleSheet} from 'react-native'
import FilmList from './FilmList'
import {getFilmsFromApiWithSearchedText} from "../API/TMDBApi";

import DisplayLoading from './DisplayLoading'


class Search extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }
    }

    _loadFilms = () => {
        if (this.searchedText.length > 0) {
            this.setState({isLoading: true})
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                    this.page = data.page
                    this.totalPages = data.total_pages
                    this.setState({
                        films: [...this.state.films, ...data.results],
                        isLoading: false
                    })
                }
            )
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => this._loadFilms())
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    keyboardAppearance={'dark'}
                    onSubmitEditing={() => this._searchFilms()}
                    clearTextOnFocus={true}
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    style={styles.textInput}
                    placeholder={"Titre du film"}

                />
                <Button title={"Rechercher"} onPress={() => this._searchFilms()}/>
                <FilmList
                    films={this.state.films} //C'est bien le composant Search qui récupère les films depuis l'API et
                    //on les transmet ici pour que le component FilmList les affiches
                    navigation={this.props.navigation} //Ici on transmet les informations de navigation pour permettre
                    //au component FilmList de naviguer vers le détail d'un film
                    loadFilms={this._loadFilms}//_loadFilm charge les films suivants, ça concerne l'API,
                    //le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les
                    //films et c'est le composent Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages}//les infos page et totalPages vont être utile, côté component FilmList,
                    //pour ne pas déclencher l'évènement pour charger plus de film si on a atteind la dernière page
                    favoriteList={false} //ICI j'ai juste indiqué qu'on n'est pas le cas de l'affichage de la liste
                    //des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle
                />
                {this.state.isLoading ? <DisplayLoading/> : null}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    button: {
        height: 50,
    },
    textInput: {
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
});

export default Search;
