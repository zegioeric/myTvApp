import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import List from './Screens/List';
import Details from './Screens/Details';
import { createStore } from 'redux';
import FilmReducer from './reducers/FilmReducer';

const Stack = createStackNavigator();
const store = createStore(FilmReducer)

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="Lista" component={List} />
          <Stack.Screen name="Dettaglio" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
