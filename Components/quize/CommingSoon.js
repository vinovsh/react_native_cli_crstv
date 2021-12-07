import React from "react";
import {View,TouchableOpacity,StyleSheet,Text} from 'react-native';
import Colors from "../ColorPalet";
import { useNavigation } from '@react-navigation/native';


const CommingSoon=()=>{

    const navigation = useNavigation();
    
   return(

    <View style={styles.container}>
        
      <Text style={{fontSize:18}}>Coming Soon...</Text>
      <View style={[styles.button,{backgroundColor:Colors.primary}]}>
          <TouchableOpacity onPress={()=>{navigation.goBack()}} activeOpacity={0.6}>
             <Text style={{color:'#fff',fontSize:15,fontFamily:'Montserrat-Bold'}}>Go Back</Text>
           </TouchableOpacity>
      </View>
    
   </View>
   )

}

export default CommingSoon;
const styles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:'center',
        alignItems:'center',
    },
    button:{

        width:120,
        height:30,
       
        borderRadius:5,
        margin:10,
        justifyContent:'center',
        alignItems:'center'
    }
    
})