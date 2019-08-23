import React from 'react'
import {ActivityIndicator, StyleSheet, View} from "react-native";

export default class DisplayLoading extends React.Component {
    render(){
        return(
            <View style={styles.loading_container}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 150,
        alignItems: 'center',
        justifyContent: 'center'
    }
});