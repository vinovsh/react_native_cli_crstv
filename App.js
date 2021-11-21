import React,{useEffect} from 'react';
import config from './config/config';
import axios from 'axios';
import {Text,View} from "react-native";
import DrawerNavigater from './Routs/DrawerNavigater';
import {
   NavigationContainer,
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme as NavigationDarkTheme
   } from '@react-navigation/native';
import {StatusBar,Alert } from 'react-native';
import Colors from './Components/ColorPalet';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Components/Context';
import RootStack from './Routs/RootStack';
import LoadingScreen from './Screens/LoadingScreen';


const App = () => {
  const[isDarkTheme,setIsDarkTheme]=React.useState(false);
const initialLoginState={
   isLoading:true,
   isAuthenticated:false,
   userName:'',
   userEmail:'',
   userCode:'',
   referralCode:'',
   userStars:'',
   userToken:'',
   

}

const loginReducer=(prevState,action)=>{
    
   switch(action.type){

    case 'LOGIN':
      return{
        ...prevState,
        userToken:action.token,
        userName:action.name,
        userEmail:action.email,
        userCode:action.code,
        referralCode:action.referral_code,
        userStars:action.stars,
        isLoading:false,
        isAuthenticated:true
      };
    
    case 'OTP_VERIFY':
      return{
        ...prevState,
        userToken:action.token,
        userName:action.name,
        userEmail:action.email,
        userCode:action.code,
        referralCode:action.referral_code,
        userStars:action.stars,
        isLoading:false,
        isAuthenticated:true
      };
    case 'AUTH_CHECK':
      return{
        ...prevState,
        userToken:action.token,
        userName:action.name,
        userEmail:action.email,
        userCode:action.code,
        referralCode:action.referral_code,
        userStars:action.stars,
        isLoading:false,
        isAuthenticated:true
      };

    case 'LOGOUT':
      return{
        ...prevState,
        userToken:'',
        userName:'',
        userEmail:'',
        userCode:'',
        referralCode:action.referral_code,
        userStars:'',
        isLoading:false,
        isAuthenticated:false
      };
     
   }

}

const [loginState,dispatch]=React.useReducer(loginReducer,initialLoginState);



  
   const CustomDefaultTheme={
      ...NavigationDefaultTheme,
      ...PaperDefaultTheme,
      colors:{

        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        custom_text:"black",
        quiz_text:"#3D3E3E",
        quiz_small_text:"#6E6F6F",
        light:'#cccfd1'
      }
   }

   const CustomDarkTheme={
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors:{

      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      custom_text:"#fff",
      quiz_text:"#fff",
      quiz_small_text:"#eceaea",
      light:'#747475'

    }
 }
 
 const theme=isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

 const authContext = React.useMemo(() => ({

   toggleTheme: async() => {

    try {
      var get_theme=await AsyncStorage.getItem('@isDarkTheme');
 
      if(get_theme !== null) {
        if(get_theme=="true"){
          setIsDarkTheme(isDarkTheme => false );
          try {
            await AsyncStorage.setItem('@isDarkTheme', JSON.stringify(false) );
            
          } catch (e) {
            console.log(e);
          }
        }else{
         
          setIsDarkTheme( isDarkTheme => true );
          try {
            await AsyncStorage.setItem('@isDarkTheme', JSON.stringify(true) );
            
          } catch (e) {
            console.log(e);
          }
  
        }
     }else{

      setIsDarkTheme( isDarkTheme => true );
      try {
        await AsyncStorage.setItem('@isDarkTheme', JSON.stringify(true) );
        
      } catch (e) {
        console.log(e);
      }
     }
      
      
    } catch (e) {
      console.log(e);
    }
 
    /* setIsDarkTheme( isDarkTheme => !isDarkTheme );

    try {
      await AsyncStorage.setItem('@isDarkTheme', JSON.stringify(isDarkTheme) );
      
    } catch (e) {
      console.log(e);
    } */
  },
   SignOut:async()=>{
      try {
         await AsyncStorage.removeItem('@user_token')
         dispatch({type:'LOGOUT'});
      } catch(e) {
         console.log(e);
      }

      
   },

  

   SignInFormSubmit: async(token,name,email,code,referral_code,stars) => {

     

      try {
        await AsyncStorage.setItem('@user_token', token);
        dispatch({type:'LOGIN',token:token,name:name,email:email,code:code,referral_code:referral_code,stars:stars});
      } catch (e) {
        console.log(e);
      }
       
  

 }

 }), []);

 const getData = async () => {

  //initial theme section

   try {
    var def_theme=await AsyncStorage.getItem('@isDarkTheme');

    if(def_theme !== null) {
      if(def_theme=="true"){
        setIsDarkTheme( isDarkTheme => true );
      }else{
        setIsDarkTheme( isDarkTheme => false );

      }
   }
    
    
  } catch (e) {
    console.log(e);
  }

  //initial Auth section
try {
   const token = await AsyncStorage.getItem('@user_token')
  
   if(token !== null) {

  
     try{
              
      await axios.post(config.BASE_URL+'check_token', {
           token: token,
          
         })
        
         .then(function (response) {
             var data=response.data;
          
             if(data.error==false){
               
                   var token=data.token;
                   var name=data.name;
                   var email=data.email;
                   var code=data.code;
                   var referral_code=data.referral_code;
                   var stars=data.stars;
   
                  dispatch({type:'AUTH_CHECK',token:token,name:name,email:email,code:code,referral_code:referral_code,stars:stars});
              
             }else{
                
              try {
               AsyncStorage.removeItem('@user_token')
                dispatch({type:'LOGOUT'});
             } catch(e) {
               
             }
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
   
   }else{
    dispatch({type:'LOGOUT'});
   }
} catch(e) {
   console.log(e);
}
}

 useEffect(() => {

 
    getData();
  
  
}, []);


  return (
 
    <PaperProvider theme={theme}>

       <AuthContext.Provider value={authContext}>
           <NavigationContainer theme={theme}>
           
            {loginState.isLoading ? (
               <LoadingScreen color="#fff"/>
               ):loginState.isAuthenticated ?(
                <>
               <StatusBar translucent={true} hidden={false} style="black" backgroundColor="#00000040" />

              <DrawerNavigater globalData={loginState}/>
              </>

               ):!loginState.isLoading ?(
             <RootStack/> 

               ):null}
              
            </NavigationContainer> 
       </AuthContext.Provider>
    </PaperProvider>
   
    

  
  )
}


export default App;

