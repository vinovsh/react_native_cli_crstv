import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';
import {View,Text,Button,FlatList, StyleSheet,Alert,Dimensions,StatusBar,Image} from "react-native"
import Feather from 'react-native-vector-icons/Feather';
import Reward from '../Components/Reward/Reward';
import NoData from '../Components/Nodata';
import { useNavigation } from '@react-navigation/native';

//loader
import LoadingScreen from './LoadingScreen';
import LoadmoreIndicator from '../Components/LoadmoreIndicator';
import { TouchableOpacity } from 'react-native-gesture-handler';


const width=Dimensions.get('window').width;

const RewardPage = (props) => {
    
    const navigation = useNavigation();
    var token=props.route.params.userToken;

    const[apidata,setApidata]=useState();
    const[loading,setLoading]=useState(true);
    const[currentPage,setCurrentPage]=useState(1);
    const[moreloading,setMoreloading]=useState(false);

    
    const getdata=async ()=>{

        try{
                
          await axios.post(config.BASE_URL+'leader_board_list?page='+currentPage, {
               token: token,
              
             })
            
             .then(function (response) {
                 var data=response.data;
              
                 if(data.error==false){
                   
                  
                  if(apidata){
                    var append_data=apidata.users.data.concat(data.users.data);
                    data.users.data=append_data;
                    setApidata(data);
                  
                 }else{ 
                  
                   setApidata(data)
  
                  }  
                 
                 setLoading(false)
                 setMoreloading(false);
                  
                 }else{
                    
                  Alert.alert('Error Message!', JSON.stringify(data.message), [
                    {text: 'Okay'}
                   ]);
                   return;
                  }
             })
             .catch(function (error) {
            
                    Alert.alert('Error Message!', JSON.stringify(error.message), [
                     {text: 'Okay'}
                    ]);
                    return;
             });
          
       }catch(e){
       
           Alert.alert('Error Message!', JSON.stringify(e.message), [
             {text: 'Okay'}
           ]);
           return;
       }
      }
      
  
      onEnd=()=>{
        var c_page=apidata.users.current_page;
        var l_page=apidata.users.last_page;
       
       if(c_page<l_page){
         setMoreloading(true);
         setCurrentPage(c_page+1);
        
       }
      }
  
      React.useEffect(() => {
          //navigation.setOptions({ title:route.params.title });
          getdata();
        
        }, []);
  
       
     
    return (
      <>
        <StatusBar translucent={true} hidden={true} style="black" backgroundColor="#ff000000" />
      {loading ?(
      
          <LoadingScreen color="#fff"/>

        ):(
         <>

         {apidata.users.data.length==0 ?
         
            <NoData />

           :

           < >
           <View style={styles.leader_card}>
 
               <View style={styles.header}>
                  
                       <Feather 
                         name="arrow-left"
                         color="#fff"
                         size={30}
                         style={styles.menu}
                         onPress={()=>{navigation.goBack()}}
                      />
                  
                   
                    <Text style={styles.heading}>Total Referral Earnings</Text>
 
               </View>   
               <View style={styles.infobox}>
                    <View style={styles.div1}>
 
                      <View style={{width:60,height:60,borderRadius:10,backgroundColor:'#186FEA',justifyContent:'center',alignItems:'center',marginLeft:30}}>
                          <Text style={{fontSize:30,color:'#fff'}}>₹</Text>
                      </View>

                      <Text  style={{fontSize:30,color:'#fff',marginLeft:20}}>0</Text>
                   
                    </View> 
 
 
                
 
               </View>
 
 
           </View>
 
 
           <FlatList
 
             style={styles.container}
             data={apidata.users.data}
             renderItem={({item,index})=>
 
                <>
                 <Reward index={index} item={item} />
              
                </>
 
              }             
             keyExtractor={(item) => item.id}
 
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}
 
             onEndReached={()=>{onEnd()}}
             //onEndReachedThreshold={0}
 
             ListFooterComponent={ moreloading ?(<LoadmoreIndicator /> ):(<></>)}

             ListEmptyComponent={
                       
             <NoData />
            
            }
           />
       
  
 
         </>
        }
         </>
        
     
        )}
        </>
    );
}

export default RewardPage;

const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        
        
    
    

    },
    leader_card:{
        width:width,
        height:width/2,  
        backgroundColor:'#2733DC',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30
    },
    header:{

        width:'100%',
        height:50,
        //backgroundColor:'red',
        marginTop:StatusBar.currentHeight,
        flexDirection:'row',
       justifyContent:"center"
       
    },
    heading:{
        fontSize:18,
        color:'#fff',
        textAlign:'center',
        alignSelf:'center',
        fontFamily:'Montserrat-SemiBold',
       
    },
    menu:{

        position:'absolute',
        left:10
    },
    infobox:{

        flex:1,
       // backgroundColor:'red',
       flexDirection:'row',
       
    },
    div1:{
      flex:1,
      flexDirection:'row',
   
      alignItems:'center'
     
    },
   
    
    star:{

         width:40,
        height:40,
      
      
    },

    profile:{

      width:80,
      height:80,
      borderRadius:50,
      borderWidth:2,
      borderColor:'#fff'
    }
    
})