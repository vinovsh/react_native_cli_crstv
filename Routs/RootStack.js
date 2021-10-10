import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../Screens/SplashScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import SignInScreen from '../Screens/SignInScreen';

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


          
        </Stack.Navigator>
  
    );
  };

  export default RootStack;