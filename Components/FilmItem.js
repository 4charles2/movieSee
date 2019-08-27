import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {getImageFromApi} from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn'



class FilmItem extends React.Component{

    _displayFavorite(){
            if(this.props.isFavorite)
            return (<Image style={styles.favorite} source={require('../assets/favoris.png')} />)
    }
    render(){
        const { film, displayDetailForFilm} = this.props;
        //Ci-dessus la version simplifié des créations de const ci-dessous
        //const film = this.props.film;
        //const displaydetailFoFilm = this.props.displayDetailForFilm;
        return (
            <FadeIn>
            <TouchableOpacity

                onPress={() => displayDetailForFilm(film.id)}
                style={styles.main_container}>
                    <Image  style={styles.image} resizeMode={'stretch'} source={{uri: getImageFromApi(film.poster_path)}}/>
                <View style={styles.info_contain}>
                    <View style={styles.title_contain}>
                        {this._displayFavorite()}
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description_contain}>
                        <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.date_contain}>
                        <Text style={styles.date_text}>Sortie le : {film.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        height: 190,
        backgroundColor: "#fbfbfb"
    },
    image:{
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    info_contain:{
        flex: 1,
        margin: 5
    },
    title_contain:{
        flex: 3,
        flexDirection: 'row',
    },
    title_text:{
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text:{
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_contain:{
        flex: 7,
        flexWrap: 'wrap'
    },
    description_text:{
        fontStyle: 'italic',
        color: '#666666'
    },
    date_contain:{
        flex: 1,
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite:{
        width: 25,
        height: 25
    }
});

export default FilmItem;