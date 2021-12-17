import React  from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from "../ColorPalet";
import { useNavigation } from '@react-navigation/native';
import {useTheme} from 'react-native-paper';

const MenuIcon = () => {
  const navigation = useNavigation();
  const{colors}=useTheme();
    
    return (
    
   
             <TouchableOpacity  > 
                <Icon  
                style={{fontSize:35,fontWeight:700,color:colors.custom_text}}
                onPress={() =>  navigation.openDrawer()}
             
    
               name="reorder-three-outline" 
               />
          
             </TouchableOpacity>
             
   
     
      );

}

export default MenuIcon;