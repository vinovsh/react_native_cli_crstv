import React from "react";
import {View,StyleSheet,Image,Text,Dimensions,TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import {useTheme} from 'react-native-paper';
import Colors from "../ColorPalet";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Item } from "react-native-paper/lib/typescript/components/List/List";



const width=Dimensions.get('window').width;
const Reward=(props)=>{

  

    const colors = useTheme().colors;


    var button_show;
    var button_text;

   
   
    var card_oppacity;
    
    if(props.item.status=='initial'){

        if(props.totalReferral>=props.item.referrals){

           button_show=true;
           card_oppacity=1;
           button_text="Claim";
        }else{

           button_show=false;
         
           button_text="Claim";
        }
    }else if(props.item.status=='processing'){

           button_show=false;
         
           button_text="Processing";
    }else{

          button_show=false;
      
          button_text="Claimed";
    }

    return(

   
        <Animatable.View  animation='fadeIn' style={[styles.card,{backgroundColor:colors.white}]}>
          <View style={{width:70,height:70,justifyContent:'center',alignItems:'center',borderColor:colors.light,borderWidth:0.2,borderRadius:10,margin:10,backgroundColor:colors.light}}>
             
          <Image 
             
             style={styles.image}
             source={{
                 uri:props.item.icon
             }}
         
           />

          </View>
         

           
        
       
          

          <View style={styles.textBox}>
              <Text numberOfLines={1} style={[styles.name,{color:colors.custom_text}]}>{props.item.amount}</Text>
              <View style={{backgroundColor: Colors.primary,padding:5,marginLeft:15, alignSelf: 'flex-start',borderRadius:10 }}>
                   <Text style={{color: '#ffffff',fontFamily:'Montserrat-Medium',fontSize:15}}>{props.totalReferral}/{props.item.referrals}</Text>
             </View>
          </View>

          <View style={styles.buttonCard}>

              {button_show ?
                     <TouchableOpacity onPress={()=>{props.modalControll(props.item)}}  activeOpacity={0.6}>
                        <View style={[styles.button,{backgroundColor:Colors.success}]}>
                              
                            <Text style={{color:'#fff',fontSize:17}}>{button_text}</Text>
                             
                        </View>
                  </TouchableOpacity>
                :

                <View style={[styles.button,{backgroundColor:'orange',opacity:0.6}]}>
                              
                   <Text style={{color:'#fff',fontSize:17}}>{button_text}</Text>
                     
                </View>
              }
             
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