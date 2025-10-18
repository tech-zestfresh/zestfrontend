import { View, Text, StatusBar, ScrollView, Image, TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { myColors } from '../Utils/Mycolors'
import { StyleSheet } from 'react-native';

const Enternumber = () => {
  return (
       <SafeAreaView style={{flex:1,backgroundColor:myColors.secondary}}>
         <StatusBar></StatusBar>
  <ScrollView  style={{flex:1,paddingTop:30}}  >
    <Image 
      style={{alignSelf:"center", height:"140", width:"200"   }}    
      source={require("../assets/zestfresh.png")}></Image>

<View style={{paddingHorizontal:20,  }}>
  <Text style={{fontSize:22,fontWeight:'bold',  marginBottom:20}}>             
    Enter Your Mobile Number
  </Text>
  <View  style={{flexDirection: 'row', alignItems: 'center', borderColor: "#ccc",
      borderWidth: 2,borderRadius: 5,}}>
   <Text style={styles.prefix}>+91</Text>
   <TextInput  maxLength={10 }     placeholderTextColor="black" 
    keyboardType="number-pad" 
    style={{   flex: 1,
      
      color: "black",
      fontSize: 16,
      marginTop: 2,
      paddingBottom:10
      
 }
   }></TextInput>
  </View>
     <TouchableOpacity style={styles.button} >
           <Text style={styles.buttonText}>Send OTP</Text>
         </TouchableOpacity>

</View>



  </ScrollView>



       </SafeAreaView>
         
        
    
  );
};


const styles = StyleSheet.create({
  prefix: {
    fontSize: 16,
    marginRight: 5,
    color: '#333',
    paddingLeft:"15"
  },
    button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 5,   
    alignItems: 'center',
    marginTop:30,
    width:120
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },





});
export default Enternumber;