import React from 'react';
import 'react-native-gesture-handler'
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import MainScreen from './components/MainScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: MainScreen,
  },
});

export default createAppContainer(AppNavigator);

// export default function App() {
//   const users: { name: string, avatar: string }[] = [
//     {
//       name: 'brynn',
//       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
//     },
//     {
//       name: 'brynn',
//       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
//     },
//     {
//       name: 'brynn',
//       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
//     },        
//   ];

//   return (
//     <View style={styles.container}>
//       <Text>MainScreen</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
