import React  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native';
import Colors from "../ColorPalet";
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import ProgressiveImage from "../ProgressiveImage";
 
const width=Dimensions.get('window').width;
const ProfileIcon =props=>{
    
    const{colors}=useTheme();
 

    return (

        <>
        <View style={{marginLeft:10,width:70,height:70,margin:5,justifyContent:'center',alignItems:'center'}}>
    
           {props.source.uri?
           
           <Image 
               style={{width:40,height:40,borderRadius:50,margin:5,}}
               source={{
                 uri: props.uri
               }}
               size={50}
            />  

            :
            
            <Image 
               style={{width:40,height:40,borderRadius:50,margin:5,}}
               source={require('../../assets/images/profile.png')}
               size={50}
            />  
           
        }
            
            <Text  numberOfLines={1}>{props.title}</Text>
       

        </View>

       

        </>
        
      );



}

export default ProfileIcon;



const styles = StyleSheet.create({
  
   
  });


