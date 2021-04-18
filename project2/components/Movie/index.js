import React from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { movie } from '../../mockData'
import Ratings from './rating'
import { getMovie } from '../../api'

const Row = props => <View style={styles.row}>{props.children}</View>
const {height, width} = Dimensions.get('window')
const imgWidth = Math.min(height, width) - (2 * 10)

export default class Movie extends React.Component {
    state = {
        movie: null
    }

    componentDidMount() {
        getMovie(this.props.navigation.getParam('imdbID', null)).then(movie => {
            if(!movie) {
                return
            }
            this.setState({
                movie: movie
            })
        })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title,
        }
    }

    render() {
        if(!this.state.movie) return(<Text>Không tìm thấy dữ liệu</Text>)
        return(
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Image style={{width: imgWidth, height: imgWidth}} source={{uri: this.state.movie.Poster}} />
                <Row>
                    <Text style={styles.title}>{this.state.movie.Title}</Text>
                    <Text style={styles.year}>({this.state.movie.Year})</Text>
                </Row>
                <Row>
                    <Text>{this.state.movie.Rated}, {this.state.movie.Runtime}</Text>
                </Row>
                <Row>
                    <Text style={styles.italic}>{this.state.movie.Plot}</Text>
                </Row>
                <Ratings ratings={this.state.movie.Ratings} />
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: 10,
      alignItems: 'stretch',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop: 10,
    },
    italic: {
      fontStyle: 'italic',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    year: {
      marginLeft: 10,
      paddingBottom: 3,
    },
  })