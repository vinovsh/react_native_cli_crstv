import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../Screens/SplashScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import SignInScreen from '../Screens/SignInScreen';
import OtpScreen from '../Screens/OtpScreen';

const Stack = createNativeStackNavigator();
const RootStack = ({ navigation }) => {
    
    return (
     
        
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
                headerShown: false,
           
            }}
          />

           <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{
                 headerShown: false,
           
             }}
          />
           <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{
                 headerShown: false,
           
             }}
          />
           <Stack.Screen
              name="OtpScreen"
              component={OtpScreen}
              options={{
                 headerShown: false,
           
             }}
          />


          
        </Stack.Navigator>
  
    );
  };

  export default RootStack;