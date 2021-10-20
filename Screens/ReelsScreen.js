import React from 'react';
import {FlatList,View,Text,Button,SafeAreaView,StyleSheet,StatusBar} from "react-native";
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

      const[viewableId,setViewableId]=React.useState(0);
      const onViewableItem=(val)=>{

        
         
      }
    
      const onViewRef = React.useRef((viewableItems)=> {
       // console.log(viewableItems)
        setViewableId(viewableItems.viewableItems[0].key)
        // Use viewable items in state or as intended
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    return (
        <View style={styles.container}>
             <StatusBar backgroundColor="#ff000000" barStyle="light-content"/>
        <FlatList
        
          onEndReached={(val)=>{console.log("end")}}
          onViewableItemsChanged={onViewRef.current}
       //  onViewableItemsChanged={(val)=>{onViewableItem(val)}}
          data={DATA}
          renderItem={({item,index})=><ReelsContainer index={index} active_id={viewableId}  item={item}/>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
         
          pagingEnabled

        />
      </View>
    );
}

export default ReelsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1
    }
})