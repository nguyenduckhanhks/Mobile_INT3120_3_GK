import React from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import {fetchData} from '../../api';
import { Ionicons } from '@expo/vector-icons';

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Homes'
    }

    state = {
        search: '',
        listMovie: [],
        page: 1
    }

    updateSearchText = text => {
        this.setState({
            search: text,
            page: 1
        })
    }

    fetchMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1
        }))
        this.search(this.state.page + 1)
    }

    onPressSearch = () => {
        this.setState({
            page: 1
        })
        this.search(1)
    }

    search = (page) => {
        fetchData(this.state.search, page).then(SearchData => {
            if((!SearchData || SearchData.length <= 0) && page == 1) {
                this.setState({
                    listMovie: []
                })
                return;
            }
            if((!SearchData || SearchData.length <= 0) && page != 1) return
            
            if(this.state.page == 1) {
                this.setState({
                    listMovie: SearchData
                })
            } else {
                this.setState({
                    listMovie: [...this.state.listMovie, ...SearchData]
                })
            }
        })
    }

    renderItem = onSelect => ({item}) => {
        return (
            <TouchableOpacity style={styles.movieRow} onPress={() => {onSelect(item.imdbID, item.Title)}}>
                <Image style={styles.image} source={{uri: item.Poster}} />
                <View style={styles.movieMetadata}>
                <Text style={styles.title}>{item.Title}</Text>
                <Text>{item.Year} ({item.Type})</Text>
                </View>
            </TouchableOpacity>
        )
    }

    handelSelectMovie = (imdbID, title) => {
        this.props.navigation.navigate('MovieScreen', {imdbID, title})
    }

    getKey = ({imdbID}) => { return imdbID}

    render() {
        return(
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        value={this.state.search}
                        onChangeText={this.updateSearchText}
                    />
                    <TouchableOpacity onPress={() => this.onPressSearch()}>
                        <Ionicons name="search-outline" size={32} color="green" />
                    </TouchableOpacity>
                </View>

                {this.state.listMovie && this.state.listMovie.length > 0 ?
                    <FlatList
                        data={this.state.listMovie}
                        renderItem={this.renderItem(this.handelSelectMovie)}
                        keyExtractor={this.getKey}
                        onEndReached={this.fetchMore}
                    />: 
                    <Text style={{
                        marginLeft:'5%',
                        marginTop: 30
                    }}>
                        Không có dữ liệu
                    </Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        marginLeft: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '80%',
        height: 40
    },
    title: {
        fontWeight: 'bold',
    },
    image: {
        flex: 0,
        width: 50,
        height: 50,
        marginRight: 20,
    },
    movieMetadata: {
        flex: 1,
    },
    movieRow: {
        padding: '5%',
        flexDirection: 'row',
    },
});
  