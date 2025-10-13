import { View, Text, StatusBar, ScrollView, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { myColors } from '../Utils/Mycolors'

const Signup = () => {
  return (
       <SafeAreaView style={{flex:1,backgroundColor:myColors.secondary}}>
         <StatusBar></StatusBar>
  <ScrollView  style={{flex:1,paddingTop:30}}  >
    <Image 
      style={{alignSelf:"center", height:"140", width:"200"   }}    
      source={require("../assets/zestfresh.png")}></Image>

<View style={{paddingHorizontal:20}}>
  <Text style={{fontSize:24,fontWeight:500 }}>
    Sign Up
  </Text>
   <Text  style={{fontSize:16,fontWeight:"500" ,color:"grey",marginTop:40    }} >
     Username
   </Text>
   <TextInput  maxLength={10 }  keyboardType="name-phone-pad" style={{ borderColor:"#aaa7a7ff",borderBottomWidth:2,  color:"black", fontSize:16, marginTop:15   }
   }>

   </TextInput>

</View>



  </ScrollView>



       </SafeAreaView>
         
        
    
  )
}

export default Signup