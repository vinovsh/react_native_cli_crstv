import React from "react";
import {View,StyleSheet,Image,Text,Dimensions} from "react-native";
import * as Animatable from "react-native-animatable";
import {useTheme} from 'react-native-paper';
import Colors from "../ColorPalet";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const width=Dimensions.get('window').width;
const Reward=(props)=>{

    const colors = useTheme().colors;
  

    return(

   
        <Animatable.View  animation='fadeIn' style={[styles.card,{backgroundColor:colors.white}]}>
          <View style={{width:40,justifyContent:'center',alignItems:'center',borderColor:colors.light,borderWidth:0.2,borderRadius:10}}>
             
          <Image 
             
             style={styles.image}
             source={require('../../assets/images/dollar.png')}
         
           />

          </View>
         

           
        
       
          

          <View style={styles.textBox}>
              <Text numberOfLines={1} style={[styles.name,{color:colors.custom_text}]}>{props.item.name}</Text>
          </View>

          <View style={styles.buttonCard}>
            <View style={[styles.button,{backgroundColor:Colors.success}]}>
                          
                          <Icon 
                           name="hexagram" 
                           color='#ffff'
                           size={20}
                           />
                           <Text style={{fontSize:15,color:'#ffff'}}>{props.item.stars}</Text>
                         
              </View>
          </View>

       
        </Animatable.View>

    )
  
    

}

export default Reward;

const styles = StyleSheet.create({

    card:{

        flex:1,
        flexDirection:'row',
        margin:5,
        borderBottomWidth:0.1,
        borderRadius:15
        
    },
    image:{
        width:60,
        height:60,
        borderRadius:50,
        margin:10

    },
    textBox:{
        flex:1,
        flexDirection:'row',
        justifyContent:"flex-start",
        alignItems:'center'
    },
    name:{
        fontSize:18,
        marginLeft:10,
        fontFamily:'Montserrat-Medium',

    },
    buttonCard:{
        flex:1,
        flexDirection:'row',
      
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:100,
        height:30,
       
        borderRadius:50,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:"center",
    },
    
  
  
    
})