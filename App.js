import React from 'react';
import {Text,View} from "react-native";
import DrawerNavigater from './Routs/DrawerNavigater';
import {
   NavigationContainer,
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme as NavigationDarkTheme
   } from '@react-navigation/native';
import {StatusBar } from 'react-native';
import Colors from './Components/ColorPalet';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Components/Context';
import RootStack from './Routs/RootStack';
import HomeStack from './Routs/HomeStack';


const App = () => {

const initialLoginState={
   isLoading:true,
   isAuthenticated:false,
   userName:'',
   userEmail:'',
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
        isLoading:false,
        isAuthenticated:true
      };
    case 'SIGNUP':
      return{

        ...prevState,
        userToken:action.token,
        userName:action.name,
        userEmail:action.email,
        isLoading:false,
        isAuthenticated:false
      };
    case 'OTP_VERIFY':
      return{
        ...prevState,
        userToken:action.token,
        userName:action.name,
        userEmail:action.email,
        isLoading:false,
        isAuthenticated:true
      };
    case 'AUTH_CHECK':
      return{
        ...prevState,
        userToken:action.token,
        userName:action.name,
        userEmail:action.email,
        isLoading:false,
        isAuthenticated:true
      };

    case 'LOGOUT':
      return{
        ...prevState,
        userToken:'',
        userName:'',
        userEmail:'',
        isLoading:false,
        isAuthenticated:false
      };
   }

}

const [loginState,dispatch]=React.useReducer(loginReducer,initialLoginState);



  const[isDarkTheme,setIsDarkTheme]=React.useState(false);
   const CustomDefaultTheme={
      ...NavigationDefaultTheme,
      ...PaperDefaultTheme,
      colors:{

        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors
      }
   }

   const CustomDarkTheme={
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors:{

      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors
    }
 }
 
 const theme=isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

 const authContext = React.useMemo(() => ({

   toggleTheme: () => {
    setIsDarkTheme( isDarkTheme => !isDarkTheme );
  },

   SignUpFormSubmit: (name,email,password) => {

    

         alert(name);
    

   },

   SignInFormSubmit: async(email,password) => {

     if(email=="user@gmail.com" && password=="admin123"){

       setTimeout(()=>{

         alert("ok")
      }, 2000);
       
     }

 }

 }), []);
  return (
 
    <PaperProvider theme={theme}>

       <AuthContext.Provider value={authContext}>
           <NavigationContainer theme={theme}>
               <StatusBar translucent={true} hidden={false} style="black" backgroundColor="#00000040" />

               {/* <DrawerNavigater/> */}
             <RootStack/> 
              
            </NavigationContainer> 
       </AuthContext.Provider>
    </PaperProvider>
   
    

  
  )
}


export default App;

