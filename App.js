import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CurrencyList from './screens/CurrencyList';


const Stack = createStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cyrpto-Tracker">
        <Stack.Screen  name="Cyrpto-Tracker" component={CurrencyList} />
        
     </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;