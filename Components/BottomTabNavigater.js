import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from "react-native";

import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const BottomTabNavigater=(props)=>{
    const { colors } = useTheme();
    const navigation = useNavigation();

    const active_color="#ED207A";
    return(

        <View style={[styles.container,{backgroundColor:colors.white,borderTopColor:colors.light,borderBottomColor:colors.light}]}>
           <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={[styles.box]}>
               
           <Icon 
               
               name="home-outline" 
               color={
                 props.active=='home'? active_color : colors.tab_dark
               }
               size={30}
           />
            <Text style={[styles.menutext,{

                color: props.active=='home'? active_color : colors.tab_dark

             }]}>Home</Text>

           </TouchableOpacity>

           <TouchableOpacity onPress={()=>{navigation.navigate('Reels')}} style={[styles.box]}>
               
               <Icon 
                   name="play-circle" 
                   color={
                      props.active=='reels'? active_color : colors.tab_dark
                    }
                   size={30}
               />
               <Text style={[styles.menutext,{

                    color: props.active=='reels'? active_color : colors.tab_dark
                   
                   }]}>Reels</Text>
    
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('QuizeScreen')}} style={[styles.box]}>
               
               <Icon 
                   name="head-question" 
                   color={
                    props.active=='quiz'? active_color : colors.tab_dark
                   }
                   size={30}
               />
               <Text style={[styles.menutext,{
                    color: props.active=='quiz'? active_color : colors.tab_dark
               }]}>Quiz</Text>
    
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('LeaderBoard')}} style={[styles.box]}>
               
               <Icon 

                  
                   name="seal" 
                   color={
                    props.active=='leader_board'? active_color : colors.tab_dark
                   }
                   size={30}
               />
               <Text style={[styles.menutext,{
                    color: props.active=='leader_board'? active_color : colors.tab_dark
               }]}>Leader Board</Text>
    
            </TouchableOpacity>
           
        </View>
    );

}

export default BottomTabNavigater;

const styles = StyleSheet.create({
    container:{
         
      
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:60,
        paddingHorizontal:15,
        paddingVertical:5,
        borderTopWidth:0.2,
        borderBottomWidth:0.2
     


    },
    box:{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    menutext:{
        fontFamily:'Montserrat-Medium'
    }
})