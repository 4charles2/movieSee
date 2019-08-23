import React from 'react'
import { View, Button, TextInput, StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from "../API/TMDBApi";
import DisplayLoading from './DisplayLoading'
import {connect} from "react-redux";


class Search extends React.Component{
    constructor(props){
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }
        this.searchedText = ""
    }
    _loadFilms(){
        this.setState({isLoading: true})
        if(this.searchedText.length > 0)
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                    this.page = data.page
                    this.totalPages = data.total_pages
                    this.setState({
                        films: [...this.state.films, ...data.results ],
                         isLoading: false
                    })
                }
            )

    }
    _searchFilms(){
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => this._loadFilms())
    }
    _searchTextInputChanged(text){
        this.searchedText = text
    }
    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {
            idFilm: idFilm
        })
    }
    render(){
        return(
            <View style={styles.main_container}>
                <TextInput keyboardAppearance={'dark'} onSubmitEditing={() => this._searchFilms()} clearTextOnFocus={true} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textInput} placeholder={"Titre du film"}

                />
                <Button  title={"Rechercher"} onPress={() => this._searchFilms()}/>
                <FlatList
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachThreashold={0.5}
                    onEndReached={()=>{
                        if(this.page < this.totalPages)
                            this._loadFilms()
                    }}
                    renderItem={({item}) => <FilmItem displayDetailForFilm={this._displayDetailForFilm}
                                                      film={item}
                                                      isFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true: false}
                    />}
                />
                {this.state.isLoading ? <DisplayLoading /> : null}

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
const mapStateToProps = (state) =>{
    return {
        favoritesFilm: state.favoritesFilm
    }
};

export default connect(mapStateToProps)(Search);
