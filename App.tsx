import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "./src/Screens/Splash";
import Login from "./src/Screens/Login";
import Signup from './src/Screens/Signup';






const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator   screenOptions={{headerShown:false}} initialRouteName='Splash' >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
const app = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}

export default app

const styles = StyleSheet.create({})
