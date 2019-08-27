import React from 'react';
import {StyleSheet, View, Text, ScrollView, Image, Button, TouchableOpacity, Share, Platform} from 'react-native';
import {getFilmDetailFromApi, getImageFromApi} from "../API/TMDBApi";
import DisplayLoading from './DisplayLoading';
import Numeral from 'numeral';
import moment from "moment";

import {connect} from 'react-redux';


class FilmDetail extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        if (params.film != undefined && Platform.OS === 'ios') {
            return {
                headerRight: <TouchableOpacity
                    style={styles.share_touchable_headerrightbutton}
                    onPres={() => params.shareFilm()}
                    title={'Info'}
                    color={'#fff'}
                >
                    <Image
                        style={styles.share_image}
                        source={require('../assets/ic_share.png')}
                    />
                </TouchableOpacity>
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: false
        }
    }

    componentDidMount() {
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
        if (favoriteFilmIndex !== -1) {//Film déjà dans nos favoris, on a déjà son détail
            //Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
            this.setState({
                film: this.props.favoritesFilm[favoriteFilmIndex]
            }, () => { this._updateNavigationParams()})
            return
        }
        ;
        //Le film n'est pas dans nos favoris, on n'a pas son détail
        //On appelle L'api pour récupérer son détail
        this.setState({isLoading: true});
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            }, () => { this._updateNavigationParams() })
        })
    }

    _toggleFavorite() {
        const action = {type: "TOGGLE_FAVORITE", value: this.state.film}
        this.props.dispatch(action);
        //Définition de notre action ici
    }

    _displayFavoriteImage() {
        let sourceImage = require('../assets/notFavoris.png');
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1)
            sourceImage = require('../assets/favoris.png')
        return (
            <Image
                source={sourceImage}
                style={styles.favorite_image}
            />
        )

    }

    componentDidUpdate() {
        console.log(this.props.favoritesFilm);
    }

    _displayFilm() {
        const {film} = this.state;
        if (film != undefined)
            return (
                <ScrollView style={styles.main_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />

                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={[styles.date, {textAlign: 'center'}]}>Genre: {film.genres.map(function (genre) {
                        return genre.name
                    }).join('/')}</Text>
                    <View style={styles.money_contain}>
                        <Text>Budget : {Numeral(film.budget).format('0,0[.]00$')}</Text>
                        <Text>Revenue : {Numeral(film.revenue).format('0,0[.]00$')}</Text>
                    </View>
                    <Text style={styles.date}>Sortie le
                        : {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>

                    <View style={styles.description_contain}>
                        <Text style={styles.description}>{film.overview}</Text>
                    </View>
                    <View style={styles.vote_contain}>
                        <Text style={styles.vote_text}>Nb Votes: {film.vote_count}</Text>
                        <Text style={styles.vote_text}>Note : {film.vote_average}</Text>
                    </View>
                </ScrollView>
            )
    }

    _shareFilm = () => {
        const {film} = this.state;
        const result = Share.share({title: film.title, message: film.overview})
    }
    _updateNavigationParams(){
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }
    _displayFloatingActionButton() {
        const {film} = this.state
        if (film != undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}
                >
                    <Image
                        style={styles.share_image}
                        source={require('../assets/ic_share.png')}/>
                </TouchableOpacity>
            )
        }
    }

    render() {
        //console.log(this.props);
        //const idFilm = this.props.navigation.getParam('idFilm');
        //console.log(this.state.film);
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this.state.isLoading ? <DisplayLoading/> : null}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginBottom: 10
    },
    header_contain: {
        flex: 4
    },
    image: {
        width: "100%",
        height: 200,
        backgroundColor: 'gray'
    },
    title_text: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24,
        flex: 1,
        flexWrap: 'wrap',
        padding: 10
    },
    money_contain: {
        flex: 1,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    description_contain: {
        flex: 4,
        flexWrap: 'wrap',
        margin: 10

    },
    date: {
        fontWeight: 'bold'
    },
    description: {
        fontSize: 18,
        textAlign: 'justify',
    },
    vote_contain: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    vote_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#858585'
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 40
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_touchable_headerrightbutton: {
        marginRight: 8
    },
    share_image: {
        width: 30,
        height: 30
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    };
};

export default connect(mapStateToProps)(FilmDetail);