import React  from "react";
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import Colors from "./ColorPalet";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const CategoryTitle =props=>{
  const{colors}=useTheme();
  const navigation = useNavigation();
    
    return (
        <View  >
          <Text style={[styles.CategoryTitle,{color:colors.custom_text}]}>{props.title}</Text>

          
              <TouchableOpacity
                 onPress={()=>{navigation.navigate(props.navigate_to,{ title: props.title})}}
              style={{
             
                marginTop:10,
                right:10,
                position:"absolute",
                fontFamily:"Montserrat-Medium",
                color:Colors.pink,
                display:props.display
                }}
              ><Text 

              style={{
             
                fontFamily:"Montserrat-Medium",
                color:Colors.pink,
               
                }}
          
             > See All <Icon name="angle-right" size={15} color={Colors.pink} />
             </Text>
             </TouchableOpacity>
            
       
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
