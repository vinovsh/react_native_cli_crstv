import React  from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from "../ColorPalet";
import { useNavigation } from '@react-navigation/native';

const MenuIcon = () => {
  const navigation = useNavigation();
    
    return (
    
   
             <TouchableOpacity  > 
                <Icon  
                style={{fontSize:35,fontWeight:700}}
                onPress={() =>  navigation.openDrawer()}
             
    
               name="reorder-three-outline"  color={Colors.theamSecondary} />
          
             </TouchableOpacity>
             
   
     
      );

}

export default MenuIcon;