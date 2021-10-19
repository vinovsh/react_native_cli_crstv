import React  from "react";
import {View,Text,StyleSheet,Image} from 'react-native';
import Colors from "./ColorPalet";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';



const CategoryTitle =props=>{
  const{colors}=useTheme();
    
    return (
        <View  >
          <Text style={[styles.CategoryTitle,{color:colors.custom_text}]}>{props.title}</Text>

          <Text 
           style={{
             
             marginTop:10,
             right:10,
             position:"absolute",
             fontFamily:"Montserrat-Medium",
             color:Colors.pink,
             display:props.display
             }}
             >
               See All <Icon name="angle-right" size={15} color={Colors.pink} />
            </Text>
       
        </View>
      );

}

export default CategoryTitle;

const styles = StyleSheet.create({
 
    CategoryTitle:{
     marginTop:10,
     
     fontSize:15,
    
     paddingHorizontal:20,
     fontFamily:"Montserrat-SemiBold",
     
   
 
     
    }
   
   
  });
