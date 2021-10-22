import React from 'react';
import {View,Text,Button,FlatList, StyleSheet} from "react-native"
import CardWithTitle from '../Components/Cards/CardWithTitle';



const ListCategoryScreen = ({route,navigation}) => {

    React.useEffect(() => {
        navigation.setOptions({ title:route.params.title });
      
      }, []);

      const DATA = [
        {
          id: 1,
          name:"Daily Bible Verses",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ4kRAk8V_bpmRKZu-_QAeSKXwPW0jm0AJdg&usqp=CAU"
         
        },
        {
          id: 2,
          name:"Songs",
          image:"https://faithisland.org/wp-content/uploads/2015/07/Image-02-Trust-mini.jpg"
         
        },
        {
          id:3,
          name:"Talent Show",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcHPnZyGRSlRRxFUCUxdSrI9TATR8N4tW6w&usqp=CAU"
         
        },
        
        {
          id:4,
          name:"VBS 2021",
          image:"https://i.pinimg.com/736x/63/ac/5c/63ac5c248b4d021d478e72ff445f97e8--jesus-saves-christian-quotes.jpg"
         
        }
        ,
        {
          id:5,
          name:"VBSSongs",
          image:"https://i.pinimg.com/474x/b4/f3/01/b4f301fcd57dfdb23047b6b6baacc844.jpg"
         
        }
       
      ];
    return (
        <View >
            <FlatList

             style={styles.container}
             data={DATA}
             renderItem={({item})=><CardWithTitle  source={{uri:item.image}} item={item} />}
             keyExtractor={(item) => item.id}
             
             showsVerticalScrollIndicator={true}
             numColumns={2}
            />



          
        </View>
    );
}

export default ListCategoryScreen;

const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        
    
    

    }
    
})