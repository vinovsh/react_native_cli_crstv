import React  from "react";
import {View,Text,StyleSheet,Image} from 'react-native';


const Logo =props=>{

  
    return (
        <View >
           
           <Image
        style={{ width:100,height:50 }}
        source={require('../../assets/images/logo.png')}
      />
       
        </View>
      );

}

export default Logo;
