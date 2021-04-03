import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  Button
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setFilm } from '../actions/FilmActions';

export default function List({ navigation }) {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [enteredFilm, setEnteredFilm] = useState('');

  const apiFilms = () => {
    fetch('http://api.tvmaze.com/schedule')
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }

  const apiSearchFilms = (name) => {
    fetch('http://api.tvmaze.com/search/shows?q='+name)
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }

  const fetchDataFilms = async () => {
    const resData = await apiFilms()
    setData(resData)
  }

  const onChangeHandler = async enteredText => {
    setEnteredFilm(enteredText);
    if(enteredText){
      const resData = await apiSearchFilms(enteredText)
      setData(resData)
    } else {
      fetchDataFilms()
    }
  };

  useEffect(() => {
    fetchDataFilms()
  }, []);

  const clickFilm = (film) => {
    dispatch(setFilm({
      name: film.show.name,
      image: film.show.image.medium,
    }))
    navigation.navigate('Dettaglio')
  }

  return (
    
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Cerca film"
          style={styles.input}
          onChangeText={onChangeHandler}
          value={enteredFilm}
        />
      </View>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          style={styles.flatList}
          keyExtractor={({ show }, index) => index}
          data={data}
          renderItem={itemData => (
            <View style={styles.listItem}>
              <Image style={styles.image} source={{
                uri: (itemData.item.show.image) ? 
                        itemData.item.show.image.medium
                      : ' ',
              }} />
              <Text>{itemData.item.show.name}</Text>
              <Button
                title="Vedi"
                onPress={() => clickFilm(itemData.item)}
              />
            </View>
          )}
        /> 
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  flatList: {
    marginTop: 20
  },
  listItem: {
    padding: 10,
    flex: 0.1,
    marginVertical: 2,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  },
  image: {
    width: 50,
    height: 50,
  },
});
