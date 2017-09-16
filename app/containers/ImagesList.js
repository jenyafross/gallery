import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableHighlight, ViewPagerAndroid, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Images from '../components/Images'
import store from '../storage'
import { fetchData } from '../actions'

class ImagesList extends Component {
    constructor(props) {
        super(props)
    }

    _pager (options) {
        const { position, nextLink, previousLink, link, context, dispatch } = options;
        if(position == 2) {
            if(nextLink == link) {
                context.setPage(1);
                return false;
            }
            dispatch(fetchData(nextLink));
        }

        if(position == 0) {
            if(previousLink == link) {
                context.setPage(1);
                return false;
            }
         dispatch(fetchData(previousLink));   
        }
    }   

    componentWillMount() {
        const {link, dispatch } = this.props;
        dispatch(fetchData(link));
    }

    render() {
        const {items, isFetching, isLoadError, link, currentPage, linkTemplate, dispatch} = this.props;
        var nextLink = linkTemplate + (currentPage < 1000 ? currentPage + 1 : 1000);
        var previousLink = linkTemplate + (currentPage > 1 ? currentPage - 1 : 1);
        
        if(isFetching) {
            return (
            <View style={style.notification}>
                <ActivityIndicator size="large"></ActivityIndicator>
                </View>
            )
        }

        if(isLoadError) {
            return (
                <TouchableHighlight style={style.notification}
                onPress={() => dispatch(fetchData(link))}>
                <Text>Ooops...Not loaded! Press on screen to update</Text>
                </TouchableHighlight>
            )
        }

        return (
            <ViewPagerAndroid style={{flex:1}}
            ref="Pager"
            initialPage={1}

            onPageSelected={(event) => {
                    this._pager({
                        position: event.nativeEvent.position,
                        link,
                        nextLink,
                        previousLink,
                        dispatch,
                        context: this.refs.Pager,
                        }
                    );
                }
            }
            >
                <View>
                </View>

                <View>
                    <ScrollView style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <Images 
                                    items={items}
                                    toFullScreen={(e) => console.log(e)}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <View>
                </View>
            </ViewPagerAndroid>
        )
    }
}

const style = StyleSheet.create({
    notification : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = store => {
    return {
        items: store.data.items,
        isFetching: store.data.isFetching,
        link: store.data.link,
        currentPage: store.data.currentPage,
        linkTemplate: store.data.linkTemplate,
        isLoadError: store.data.isLoadError
    }
};



export default connect(mapStateToProps)(ImagesList);