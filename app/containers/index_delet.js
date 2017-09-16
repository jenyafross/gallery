import React, { Component } from 'react'
import { View, ScrollView, Button, Text } from 'react-native'
import { connect } from 'react-redux'
import reducers from '../reducers'
import { fetchData } from '../actions'
import store from '../storage'

import Images from '../components/Images'


class Btn extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { linkTemplate, currentPage } = this.props;
        console.log(linkTemplate, currentPage);
        return(
            <View>
                <Button 
                title="Fetch Data"
                onPress={() => {
                    if(store.getState().data.isFetching) {
                        console.log("Data is already fetching")
                        return false;
                    }
                    return store.dispatch(fetchData(linkTemplate + currentPage));
                }}
                />
            </View>
            )
    }
}

export class FetchBtn extends Component {
    render() {
        const state = store.getState();
        return (
            <Btn 
                linkTemplate = {state.data.linkTemplate}
                currentPage  = {state.data.currentPage}
            />
        )
    }
}

class ImagesList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {items} = this.props;
        return (
            <ScrollView>
                <Images 
                items={items}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = store => {
    return {
        items: store.data.items
    }
}

ImagesList = connect(mapStateToProps)(ImagesList);

export { ImagesList };
