import React from "react";
import { View,Dimensions,StyleSheet ,ScrollView} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const VideoLoader = () => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <SkeletonPlaceholder>
      
      
        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>

            <View >
                
                <View style={styles.todayVersosContainer}></View>
                <View style={styles.todayVersosContainerTitle}></View>
            </View>

            <View >
                
                <View style={styles.todayVersosContainer}></View>
                <View style={styles.todayVersosContainerTitle}></View>
            </View>

           
        </View>
     

        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>

          <View >
    
             <View style={styles.todayVersosContainer}></View>
             <View style={styles.todayVersosContainerTitle}></View>
         </View>

          <View >
    
            <View style={styles.todayVersosContainer}></View>
            <View style={styles.todayVersosContainerTitle}></View>
         </View>


       </View>


       <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>

          <View >
    
             <View style={styles.todayVersosContainer}></View>
             <View style={styles.todayVersosContainerTitle}></View>
         </View>

          <View >
    
            <View style={styles.todayVersosContainer}></View>
            <View style={styles.todayVersosContainerTitle}></View>
         </View>


       </View>

       <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>

          <View >
    
             <View style={styles.todayVersosContainer}></View>
             <View style={styles.todayVersosContainerTitle}></View>
         </View>

          <View >
    
            <View style={styles.todayVersosContainer}></View>
            <View style={styles.todayVersosContainerTitle}></View>
         </View>


       </View>
      
       
    </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default VideoLoader;


const styles = StyleSheet.create({
 
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
    



   
  });