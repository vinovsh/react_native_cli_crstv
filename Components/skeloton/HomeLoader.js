import React from "react";
import { View,Dimensions,StyleSheet ,ScrollView} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const HomeLoader = () => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <SkeletonPlaceholder>
        
        {/* player */}
        <View style={styles.player}></View>
        {/* today versor */}
        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>

            <View >
                <View style={styles.todayVersosContainerTitle}></View>
                <View style={styles.todayVersosContainer}></View>
            </View>

            <View >

                <View style={styles.todayVersosContainerTitle}></View>
                <View style={styles.todayVersosContainer}></View>
               
            </View>
        </View>
     

        <View style={styles.quizContainer}>
                <View style={styles.quiz}></View>
        </View>
      

        <View style={styles.CompetitionContainer}>
            
              <View style={styles.competitionCard}></View> 
        </View>

       
      
       
    </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default HomeLoader;


const styles = StyleSheet.create({
 
    player:{
      height:width/1.75,
      width:window.width,
   
 
     
    },
    todayVersosContainer:{

        width:width/2.3,
        height:width/2.3,
        borderRadius:15,
        margin:10,

    },

    todayVersosContainerTitle:{
        marginTop:10,
        height:15,
        marginLeft:15,
        width:120


    },
    quizContainer:{
      
        
        justifyContent:"center",
        alignItems:"center",
     
      

    },
    quiz:{
     
        height:70,
        borderRadius:width,
      
        marginVertical:30,
        width:width/1.08

    },

    CompetitionContainer:{
      
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10
     
      

    },

    competitionCard:{
        width:width/1.09,
        height:width/3.5,
      
    }

   
  });