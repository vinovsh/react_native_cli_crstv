import React  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native';
import Colors from "../ColorPalet";
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressiveImage from "../ProgressiveImage";
import { useNavigation } from '@react-navigation/native';
import ReelsScreen from "../../Screens/ReelsScreen";

const width=Dimensions.get("window").width;
const RealsCard =props=>{
    const navigation = useNavigation();

    const reelsscreen=()=>{

         navigation.navigate('Reels');
    }

    const upload_reels_box=()=>{
       props.upload_reels_box();
    }
    
    return (

        
        <View style={styles.container}>
         
            <View style={styles.card}>
         
                <TouchableOpacity onPress={()=>{reelsscreen()}} activeOpacity={0.6} style={styles.realCard}>
                    <ProgressiveImage style={styles.image} resizeMode="cover" source={{uri:"https://crstv.s3.ap-south-1.amazonaws.com/assets/reels.jpg"}} />
                    <View style={styles.overlay}>

                       <Text  style={styles.realsText}>Watch Reels </Text>
                    </View> 
                </TouchableOpacity>
               {/*   */}
               <TouchableOpacity onPress={()=>{upload_reels_box()}} activeOpacity={0.6} style={styles.uploadButton}>
                   
               <Icon name="upload" size={30} color={Colors.primary} />

               </TouchableOpacity>
              
            </View>
        </View>
      );

}

export default RealsCard;

const styles = StyleSheet.create({
    container:{

       flex:1,
       flexDirection:"row",
       justifyContent:"center",
       alignItems:"center",
       marginVertical:20
    },
    card:{

        width:width/1.09,
        height:width/3.5,
        backgroundColor:Colors.theamColor,
        borderRadius:10,
        shadowColor:Colors.shadow,
        elevation:5,
        padding:16,
        flexDirection:"row",
       justifyContent:"flex-start",
       alignItems:"center",
    },
    realCard:{

        width:width/2,
        height:"100%",
        backgroundColor:"green",
        borderRadius:15,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        
    },
    image:{

        width:"100%",
        height:"100%",
        borderRadius:10,
    },
    overlay:{
        width:"100%",
        height:"100%",
      
        position:"absolute",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
       backgroundColor:"#0000005e",
       borderRadius:15,
  
    },
    realsText:{

       
        color:Colors.theamColor,
        fontSize:18,
        fontFamily:"Montserrat-SemiBold"
     
      

    },
    uploadButton:{

        width:width/5,
        height:width/5,
        backgroundColor:Colors.theamColor,
        position:"absolute",
        right:30,
        borderRadius:width/2,
        shadowColor:Colors.shadow,
        padding:6,
        elevation:5,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    }
   
 
     
 
   
  });
