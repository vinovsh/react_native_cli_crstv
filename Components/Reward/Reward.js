import React from "react";
import {View,StyleSheet,Image,Text,Dimensions,TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import {useTheme} from 'react-native-paper';
import Colors from "../ColorPalet";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const width=Dimensions.get('window').width;
const Reward=(props)=>{

    const colors = useTheme().colors;
  

    return(

   
        <Animatable.View  animation='fadeIn' style={[styles.card,{backgroundColor:colors.white}]}>
          <View style={{width:70,height:70,justifyContent:'center',alignItems:'center',borderColor:colors.light,borderWidth:0.2,borderRadius:10,margin:10,backgroundColor:colors.light}}>
             
          <Image 
             
             style={styles.image}
             source={require('../../assets/images/dollar.png')}
         
           />

          </View>
         

           
        
       
          

          <View style={styles.textBox}>
              <Text numberOfLines={1} style={[styles.name,{color:colors.custom_text}]}>Earn {'₹100'}</Text>
              <View style={{backgroundColor: Colors.primary,padding:5,marginLeft:15, alignSelf: 'flex-start',borderRadius:10 }}>
                   <Text style={{color: '#ffffff',fontFamily:'Montserrat-Medium'}}>10/10</Text>
</View>
          </View>

          <View style={styles.buttonCard}>
              <TouchableOpacity activeOpacity={0.6}>
                 <View style={[styles.button,{backgroundColor:Colors.success}]}>
                          
                    <Text style={{color:'#fff',fontSize:17}}>Claim</Text>
                         
                 </View>
              </TouchableOpacity>
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
        borderRadius:15,
       
       
        
    },
    image:{
        width:40,
        height:40,
        borderRadius:50,
        margin:10

    },
    textBox:{
        flex:1,
        flexDirection:'column',
        justifyContent:"center",
       // alignItems:'center'
    },
    name:{
        fontSize:15,
        marginLeft:10,
        fontFamily:'Montserrat-Medium',
        padding:4,
       /*  borderRadius:3,
        backgroundColor:'#5eebb1', */
    

    },
    buttonCard:{
        flex:1,
        flexDirection:'row',
      
        justifyContent:'center',
        alignItems:'center',
        opacity:1
      
    },
    button:{
        width:100,
        height:50,
       
        borderRadius:50,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:"center",
    },
    
  
  
    
})