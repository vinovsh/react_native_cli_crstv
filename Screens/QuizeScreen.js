import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text,StatusBar ,Dimensions,ScrollView} from 'react-native';
import Colors from '../Components/ColorPalet';
import * as Animatable from 'react-native-animatable';
import ProgressiveImage from '../Components/ProgressiveImage';
const height=Dimensions.get("screen").height;
   const width=Dimensions.get("screen").width;
const QuizeScreen = ({route,navigation}) => {

   console.log(route.params)
   
    return (
       
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <StatusBar backgroundColor={"#F2F2F2"} barStyle="dark-content"/>
            <View style={styles.header}></View>
           <View style={styles.textBox}>
              <Text style={styles.smallText}>1 0f 1</Text>
              <Text style={styles.largeText}>What is the name of this painting</Text>
           </View>
           <View style={styles.imageContainer}>
           <View style={styles.imageBox}>
              <ProgressiveImage
                defaultImageSource={require('../assets/images/loadImage.png')}
               source={{uri:"https://thumbs.dreamstime.com/b/wooden-christian-cross-soft-bokeh-lights-background-55940631.jpg"}}
               style={styles.image}
            
              /> 
           </View>
           </View>

           <View style={styles.optionCard}>

               <View style={styles.card}>
                  <Text>hfgjd dddgkdj dkfjdnkjfnkdjfdf fkdjnkdjgkdf gdkjgdkfjgkdfg dkfgjdkfjgdkf gdkfgdkfjgdfk gdkfjgdkfg dfkgdf gdfkjdfkg dfkgd fgdkfjgdf gdfkgkd fgfdfdf dfgdfgd dfdfdffd dgsgdg dfsdfsf fgdfgdfgdfgdfg dfgdfgdfgd dfgdfgdfg dfgdfgd fdgdf</Text>
               </View>

           </View>
         </ScrollView>
    </SafeAreaView>
          
      
    );
}

export default QuizeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    },
    header:{

        height:50,
        width:"100%"
    },
    textBox:{

        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
       
    },
    smallText:{
        fontFamily:"Montserrat-Bold",
        color:"#6E6F6F",
        marginTop:1,
        fontSize:13
    },
    largeText:{
       fontSize:30,
       textAlign:"center",
       marginHorizontal:35,
       fontWeight:"700",
       fontFamily:"Montserrat-SemiBold",
       color:"#3D3E3E",
       marginTop:10
    },
    imageContainer:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-evenly",
      marginTop:20  
    },

    imageBox:{
        width:width/1.1,
        height:width/2,
        borderRadius:15,
        backgroundColor:Colors.theamColor,
       // borderWidth: 1, 
      //  borderColor: Colors.LightBlack,
       
        //borderStyle:'solid',
        shadowColor:Colors.shadow,
        elevation:7,
        marginHorizontal:width/1.2,
        padding:0,
       
      
    },
    image:{

        width:"100%",
        resizeMode:"cover",
       flex:1,
       borderRadius:15,
     
    },
    optionCard:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    card:{

        width:width/1.1,
       
        minHeight:60,
     
        borderRadius:15,
        backgroundColor:Colors.theamColor,
       // borderWidth: 1, 
      //  borderColor: Colors.LightBlack,
       
        //borderStyle:'solid',
        shadowColor:Colors.shadow,
        elevation:7,
        marginHorizontal:width/1.2,
        padding:0,
        marginVertical:20
       
    }
   
});