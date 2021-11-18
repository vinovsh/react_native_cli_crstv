import React from 'react';
import {View,Text,Button,SafeAreaView,StyleSheet,StatusBar,ScrollView,Dimensions,TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Colors from '../Components/ColorPalet';


const width=Dimensions.get('window').width;
const height=Dimensions.get('screen').height;
const AddVideoScreen = (props) => {

    const { colors } = useTheme();
   console.log(props.route.params.item)
   const navigation = useNavigation();
    
    return (
        <View style={styles.container}>

          <ScrollView
             showsHorizontalScrollIndicator={false}
             showsVerticalScrollIndicator={false}
          >
              <View style={styles.screen}>

              </View>

              <Text style={[styles.title, {
                color: colors.text
               }]}>Title</Text>

              <TextInput 
                  style={[styles.textInput, {
                    color: colors.text
                 }]}
                 placeholder="Enter Video Caption"
                 placeholderTextColor="#666666"
                    
                autoCapitalize="none"
                 
                />

                
              
          </ScrollView> 
          <View style={styles.button}>
            <Text style={{textAlign:'center',fontSize:20,color:"#fff"}}>Upload</Text>
          </View> 
      
        </View>
    );
}

export default AddVideoScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      height:height
    },
    screen:{
      width:"100%",
      height:width/1.8,
      backgroundColor:"#000"
    },
    title: {
        color: '#05375a',
        fontSize: 18,
        margin:10
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        fontSize:20
    },
    button:{
        position:"absolute",
        width:"70%",
        height:60,
        left:"15%",
        borderRadius:50,
        backgroundColor:Colors.primary,
        bottom:20,
        justifyContent:'center',
        alignItems:'center'
    }
})