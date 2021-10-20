import React from 'react';
import {View,Text,Button,SafeAreaView,StyleSheet,FlatList,StatusBar} from "react-native";
import ReelsContainer from '../Components/Reals/ReelsContainer';
const ReelsScreen = ({route,navigation}) => {

    const DATA = [
        {
          id: 1,
          name:'Johnny Philip',
          description:'mussoorie hill driving',
          title: 'First Item',
          video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          isLike:true,
          likesCount:30
        },
        {
          id: 2,
          name:'Johnny Philip',
          description:'hello',
          title: 'Second Item',
          video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
          isLike:false,
          likesCount:15
        },
        {
          id:3,
          name:'Johnny Philip',
          description:'hello',
          title: 'Third Item',
          video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
          isLike:true,
          likesCount:5
        },
      ];
      
    return (
        <SafeAreaView style={styles.container}>
             <StatusBar backgroundColor="#ff000000" barStyle="light-content"/>
        <FlatList
          onEndReached={(val)=>{console.log("end")}}
          onViewableItemsChanged={(val)=>{console.log("changed")}}
          data={DATA}
          renderItem={({item})=><ReelsContainer item={item}/>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator
          pagingEnabled

        />
      </SafeAreaView>
    );
}

export default ReelsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1
    }
})