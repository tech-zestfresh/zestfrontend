import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "./src/Screens/Splash";
import Emaillogin from "./src/Screens/Emaillogin";
import Emailsignup from './src/Screens/Emailsignup';
import Enternumber from './src/Screens/Enternumber';
import Emailotp from './src/Screens/Enterotp';
import Homescreen from "./src/Screens/Homescreen";






const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator   screenOptions={{headerShown:false}} initialRouteName='Splash' >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Emailotp" component={Emailotp} />
      <Stack.Screen name="Enternumber" component={Enternumber} />
      <Stack.Screen name="Emaillogin" component={Emaillogin} />
      <Stack.Screen name="Emailsignup" component={Emailsignup} />
      <Stack.Screen name="Homescreen" component={Homescreen} />
      
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
