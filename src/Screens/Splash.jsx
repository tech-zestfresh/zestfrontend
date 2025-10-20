import { View, Text, TurboModuleRegistry, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import {myColors} from "./../Utils/Mycolors";
import { useNavigation } from '@react-navigation/native';


const Splash = () => {

const nav=useNavigation()


useEffect(()=>{
  setTimeout(()=>{
     nav.replace('Enternumber')

  },2000);
},[]);

useEffect(() => {
  const checkLogin = async () => {
    const session = await loadSession();
    if (session) {
      nav.replace('Home'); // or your logged-in screen
    } else {
      nav.replace('Login'); // or phone entry screen
    }
  };
  checkLogin();
}, []);




  return (
      <View style={{   backgroundColor:myColors.primary ,flex:1,justifyContent:'center' }}>
        <StatusBar style='dark'/>
         <View style={{flexDirection:'row',alignItems:"center", justifyContent:'center'}}>
           <Image style={{height:150,width:220}} source={require('../assets/zestfresh.png')}/>
         </View>
       </View>
   
  )
}

export default Splash