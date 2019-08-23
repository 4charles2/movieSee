import React from 'react'
import { StyleSheet, View, Button, TextInput} from 'react-native'

class Alignement extends React.Component{
    render(){
        return (
            <View style={{ flex: 1, backgroundColor: 'yellow', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 50, width: 50, backgroundColor: 'red'}}></View>
                <View style={{ height: 50, width: 50, backgroundColor: 'green'}}></View>
                <View style={{ height: 50, width: 50, backgroundColor: 'blue'}}></View>
            </View>
        )
    }
}

export default Alignement