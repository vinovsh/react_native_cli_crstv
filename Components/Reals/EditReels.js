import React  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native';
import Colors from "../ColorPalet";

import ProgressiveImage from "../ProgressiveImage";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { color } from "react-native-reanimated";
import {useTheme} from 'react-native-paper';


const width=Dimensions.get("window").width;
const EditReels =props=>{
    const navigation = useNavigation();
    const paperTheme = useTheme();

    const modalControll=()=>{

      props.modalControll();
    }
  
    
    return (
        
        <View style={[styles.container,{borderColor:paperTheme.colors.light}]}>

          <View style={styles.image_card}>
            <Image
              style={styles.image}
              
              source={{uri:'https://lumiere-a.akamaihd.net/v1/images/p_blackwidow_21043_v2_6d1b73b8.jpeg'}}
            
            />
          </View>
          <View style={styles.content}>

              <View style={styles.upper}>
                 
                 <Text numberOfLines={3} style={{fontSize:16,fontFamily:"Montserrat-Medium",margin:5,color:paperTheme.colors.custom_text}}>I was able to achieve a result close to what I'm looking for by applying a scale transform to the</Text>

              </View>
              <View style={styles.lower}>

                     <Feather 
                       name="thumbs-up"
                       color={'#15d212'}
                       size={20}
                     /> 
                     <Text style={{fontSize:20,color:paperTheme.colors.custom_text}}>{' '}30</Text>
                     <Icon
                     
                       name="share"
                       color={Colors.primary}
                       style={{paddingLeft:5}}
                       size={20}
                      
                     />
                    
                     <Text style={{fontSize:20,color:paperTheme.colors.custom_text}}>{' '}30</Text>

                     <Icon
                     
                     name="clock"
                     color={'orange'}
                     style={{paddingLeft:5}}
                     size={20}
                    
                   />
                  
                   <Text style={{fontSize:15,color:'orange'}}>{' '}In review</Text>
                  </View>
                  
            </View>
            <TouchableOpacity onPress={()=>{modalControll()}} style={{position:'absolute',top:5,right:0}}>
            <Icon 
                  
                  name="dots-vertical"
                  color={paperTheme.colors.custom_text}
                  size={30}
            />
            </TouchableOpacity>


        </View>
       
      );

}

export default EditReels;
const styles = StyleSheet.create({

    container:{

        width:'95%',
        height:100,
      
        borderRadius:10,
        margin:'2.5%',
        flexDirection:'row',
        borderWidth:0.2,
        
    },
    image_card:{
        
        borderRadius:10,
        width:'45%',
        height:'100%',
       backgroundColor:'#000'
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
     
       borderTopLeftRadius:10,
        borderBottomLeftRadius:10
     
     
    },
    content:{
        width:'50%',
        height:'100%',
        flexDirection:'column'
       
    },
    upper:{
      
        width:'100%',
        height:'70%',
    },
    lower:{
      
        width:'100%',
        height:'30%',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:5
    }

});
