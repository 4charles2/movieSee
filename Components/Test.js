import React from 'react'
import { StyleSheet, View, Platform, Animated} from 'react-native'
import HelloWord from "./HelloWord";

class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topPosition: new Animated.Value(0)
        }
    }
    componentDidMount() {
        Animated.spring(
            this.state.topPosition,{
                toValue: 100,
                speed: 4,
                bounciness: 30
            }
        ).start()
    }

    render() {
        return (
            <View style={styles.main_container} >
                <Animated.View style={[styles.animation_view, {top: this.state.topPosition}]}>
                </Animated.View>
                <HelloWord />
            </View>
        )
            ;
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation_view: {
        backgroundColor: 'red',
        width: 100,
        height: 100
    },
    subview_container: {
        ...Platform.select({
            ios: {
                backgroundColor: 'red'
            },
            android: {
                backgroundColor: 'blue'
            }
        }),

        width: 50,
        height: 50
    }
})

export default Test