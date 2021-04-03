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
import { useSelector } from 'react-redux';

export default function Details({ navigation }) {

  const film = useSelector(state => state.film)

  return (
    
    <View style={styles.screen}>
      <Text>{film.name}</Text>
      <Image style={styles.image} source={{
        uri: (film.image) ? 
                film.image
              : ' ',
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  image: {
    width: 150,
    height: 150,
  },
});
