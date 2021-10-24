import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text,StatusBar ,Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import Colors from '../Components/ColorPalet';
import * as Animatable from 'react-native-animatable';
import ProgressiveImage from '../Components/ProgressiveImage';
import {useTheme} from 'react-native-paper';
import RewardScreen from './RewardScreen';

const height=Dimensions.get("screen").height;
   const width=Dimensions.get("screen").width;
const QuizeScreen = ({route,navigation}) => {
    const{colors}=useTheme();
  /*  console.log(route.params) */
   const[showReward,setShowReward]=React.useState(false);

   const nextquestion=()=>{

    setShowReward(true);
   }
    return (
       
        <SafeAreaView style={styles.container}>

            <StatusBar backgroundColor={"#fff"} barStyle="dark-content"/>
             {showReward ?
               <RewardScreen  />
            :
            <>
            <View style={styles.header}>
                <Text style={[styles.smallText,{color:colors.quiz_small_text}]}>1 0f 1</Text>
            </View>
            <ScrollView style={{paddingBottom:20}}>
           
           <View style={styles.textBox}>
              
              <Text style={[styles.largeText,{color:colors.quiz_text}]}>Where did Adam and Eve live at the beginning of the world?</Text>
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
                  <Text style={styles.optionText}>Galilee</Text>
               </View>

               <View style={styles.selectedcard}>
                  <Text style={styles.selectedoptionText}>Garden of Eden</Text>
               </View>

               <View style={styles.card}>
                  <Text style={styles.optionText}>Hill of Gash</Text>
               </View>
               <View style={styles.card}>
                  <Text style={styles.optionText}>Jerusalem</Text>
               </View>
               <View style={styles.card}>
                  <Text style={styles.optionText}>Mount Zemaraim</Text>
               </View>

           </View>
         </ScrollView>

         <View style={styles.ContinueButtonCard}>

           <TouchableOpacity activeOpacity={0.8} onPress={(val) =>nextquestion()} style={styles.ContinueButton}>
             <Text style={styles.continueText}>CONTINUE</Text>
           </TouchableOpacity>
           </View>
           </>
          }
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
        width:"100%",
        borderBottomColor:Colors.shadow,
        borderBottomWidth:0.5,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"


    },
    textBox:{

        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
       
    },
    smallText:{
        fontFamily:"Montserrat-Bold",
      
        marginTop:1,
        fontSize:13
    },
    largeText:{
       fontSize:30,
       textAlign:"center",
       marginHorizontal:35,
       fontWeight:"700",
       fontFamily:"Montserrat-SemiBold",
      
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
        alignItems:"center",
        marginTop:10
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
     
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10
       
    },
    optionText:{
        padding:10,
        fontSize:16,
        fontFamily:"Montserrat-SemiBold",
        color:"#3D3E3E",
        lineHeight:25,
       // paddingHorizontal:20

    },
    selectedcard:{

        width:width/1.1,
       
        minHeight:60,
     
        borderRadius:15,
        backgroundColor:Colors.theamColor,
       // borderWidth: 1, 
      //  borderColor: Colors.LightBlack,
       
        borderStyle:'solid',
        borderColor:"#4343f4",
        borderWidth:3,
        shadowColor:Colors.shadow,
        elevation:7,
        marginHorizontal:width/1.2,
        padding:0,
     
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10
       
    },
    selectedoptionText:{
        padding:10,
        fontSize:16,
        fontFamily:"Montserrat-SemiBold",
        color:"#4343f4",
        lineHeight:25,
       // paddingHorizontal:20

    },
    ContinueButtonCard:{
      
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10

    },
    ContinueButton:{

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
     
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10,
        backgroundColor:"#4343f4"
    },
    continueText:{
        padding:10,
        fontSize:16,
        fontFamily:"Montserrat-SemiBold",
        color:"#fff",
        lineHeight:25,
    

    }
   
});