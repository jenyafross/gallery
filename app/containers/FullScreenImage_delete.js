import React, { Component } from 'react'
import { Image } from 'react-native'

export default class FullScreenImage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { link } = this.props;
        return (
            <Image 
            source={{uri: "https://drscdn.500px.org/photo/227985195/m%3D900_k%3D1_a%3D1/v2?client_application_id=27071&user_id=23468911&webp=true&sig=208e391119de436ebe4204749bf07540ac56a604d10815dc659eb0ba65cad8ce"}}
            resizeMode='contain'
            />
        )
    }
}