import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

class Header extends Component {
    render() {
        return (
            <View style={style.container}>
            <Image
                style={{flex: 1, width: null, height: null}}
                source={require('../images/rsz_1rsz_500px_logo.png')}
                resizeMode="contain"
            />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
    },
    headerText: {
        color: 'white',
        fontFamily: 'Tahoma',
        fontSize: 32,
        fontWeight: 'bold',
    }
})

export default Header