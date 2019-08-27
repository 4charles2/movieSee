import React from 'react'
import {StyleSheet, Image} from "react-native";
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from "../Components/Favorites";
import Test from "../Components/Test";


const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: "Détails du film"
        }
    }
});
const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: "Favoris"
        },
        FilmDetail: {
            screen: FilmDetail,
            navigationOptions: {
                title: "Détails du film"
            }
        }
    }
})
const MoviesTabNavigator = createBottomTabNavigator({
        Test: {
            screen: Test
        },
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => { //On définie le rendu de nos icônes par les images récemment ajoutés au projet
                    return <Image
                        source={require('../assets/ic_search.png')}
                        style={styles.icon} //Style appliquer pour les redimensionner comme il faut
                    />
                }
            }
        },
        Favorites: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../assets/favoris.png')}
                        style={styles.icon}
                    />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', //Couleur d'arriere-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', //Couleur d'arriere-plan des onglets non sélectionnés
            showLabel: false, //On masque les titres
            showIcon: true //On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }
);

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
});

// export default createAppContainer(SearchStackNavigator)
export default createAppContainer(MoviesTabNavigator)