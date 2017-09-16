import React, { Component } from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'

const FullScreenImage = ({nextScreen, navigation}) => {
    return (
    <View style={{flex: 1}}>
        <TouchableWithoutFeedback style={{flex: 1}}
        onPress={nextScreen}
        >
            <Image
            style={{flex: 1, backgroundColor: '#000000', width: null, height: null}}
            source={{uri: navigation.state.params.link}}
            resizeMode='contain'
            />
        </TouchableWithoutFeedback>
    </View>
)};

const mapDispatchToProps = dispatch => ({
    nextScreen: () => dispatch({type: 'GO_BACK'})
})

export default connect(null, mapDispatchToProps)(FullScreenImage)