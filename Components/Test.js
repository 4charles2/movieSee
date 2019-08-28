import React from 'react'
import {StyleSheet, View, Platform, Animated, Easing} from 'react-native'
import HelloWord from "./HelloWord";

class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topPosition: new Animated.Value(0),
            leftPosition: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.stagger(350,[
            Animated.parallel([
                Animated.spring(
                    this.state.topPosition, {
                        toValue: 100,
                        // tension: 8,
                        // friction: 3,
                        speed: 4,
                        bounciness: 30
                    }
                ),
                Animated.timing(
                    this.state.leftPosition,
                    {
                        toValue: 100,
                        duration: 1000,
                        easing: Easing.elastic(10)
                    }
                )
            ]),
            Animated.parallel([
                Animated.timing(
                    this.state.topPosition,
                    {
                        toValue: 60,
                        duration: 0,
                        easing: Easing.elastic(8)
                    }
                ),
                Animated.timing(
                    this.state.leftPosition,
                    {
                        toValue: 0,
                        duration: 0,
                        easing: Easing.elastic(8)
                    }
                )
            ])

        ])
        .start()
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Animated.View style={[styles.animation_view, {top: this.state.topPosition, left: this.state.leftPosition}]}>
                </Animated.View>
                <HelloWord/>
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