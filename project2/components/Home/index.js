import React from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import {search, movie} from '../../mockData'
import {fetchData} from '../../api'

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Homes'
    }

    state = {
        search: '',
        listMovie: [],
        page: 1
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.search !== this.state.search && this.state.search.length > 1) {
            this.search(1)
        }
    }

    updateSearch = text => {
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

    search = (page) => {
        fetchData(this.state.search, page).then(Search => {
            if(!Search) return
            if(this.state.page == 1) {
                this.setState({
                    listMovie: Search
                })
            } else {
                this.setState(prevState => ({
                    listMovie: [...prevState.listMovie, ...Search]
                }))
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
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    value={this.state.search}
                    onChangeText={this.updateSearch}
                />
                {this.state.listMovie.length > 0 ?
                <FlatList
                    data={this.state.listMovie}
                    renderItem={this.renderItem(this.handelSelectMovie)}
                    keyExtractor={this.getKey}
                    onEndReached={this.fetchMore}
                /> : <Text>Không có dữ liệu</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        padding: 5,
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
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
        padding: 10,
        flexDirection: 'row',
      },
  });
  