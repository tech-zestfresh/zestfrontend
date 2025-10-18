import { View, Text, TurboModuleRegistry, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import {myColors} from "./../Utils/Mycolors";
import { useNavigation } from '@react-navigation/native';


const Splash = () => {

const nav=useNavigation()


useEffect(()=>{
  setTimeout(()=>{
     nav.replace('Homescreen')

  },2000);
},[]);





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