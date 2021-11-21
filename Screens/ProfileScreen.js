import React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import Colors from '../Components/ColorPalet';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
 
  
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../Components/Context';
import { color } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ProfileScreen = (props) => {

   

    const paperTheme = useTheme();
    const {toggleTheme,SignOut } = React.useContext(AuthContext);

    var name=props.route.params.userName;
    var email=props.route.params.userEmail;
    var code=props.route.params.userCode;
    var stars=props.route.params.userStars;

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15,paddingBottom:15, }}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://www.unigreet.com/wp-content/uploads/2020/04/Sweet-girl-dp.jpg'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{name}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
                        </View>

                        <View style={[styles.edit,{borderColor:paperTheme.colors.custom_text}]}>
                              <Icon 
                                name="circle-edit-outline" 
                                style={{color:paperTheme.colors.custom_text}}
                                size={25}
                                />
                        </View>
                      

                    </View>

                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-evenly',marginTop:10}}>
                        <View style={[styles.button,{backgroundColor:Colors.primary}]}>
                          
                               <Icon 
                                name="hexagram" 
                                color='#ffff'
                                size={25}
                                />
                                <Text style={{fontSize:22,color:'#ffff'}}>{stars}</Text>
                              
                        </View>

                        <View style={[styles.button,{backgroundColor:'#15d212'}]}>
                          
                               
                                <Text style={{fontSize:15,color:'#ffff'}}>Rewards</Text>
                              
                        </View>
                    </View>

                   <View style={{flexDirection:'row'}}>

                     <View style={[styles.card,{borderColor:paperTheme.colors.light}]}>
                       <Text style={[styles.title,{margin:10,fontSize:20}]}>50</Text>
                       <Text style={styles.caption}>Referral</Text>

                    </View>
                    <View style={[styles.card,{borderColor:paperTheme.colors.light}]}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => {}} >
                      <Image 
                        style={styles.leader}
                        source={require('../assets/images/leader.png')}
                      
                      />
                      </TouchableOpacity>

                    </View>

                  </View>

                   
                  
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({size,color}) => (
                        <Icon 
                        name="exit-to-app" 
                     
                        size={size}
                        color={color}
                        />
                    )}
                    label={({color}) => <Text style={{color:color}} >Sign Out</Text>}
                    onPress={() => {SignOut()}}
                />
            </Drawer.Section>
        </View>
    );
}
export default ProfileScreen;
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
     
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
     
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
     
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    button:{
        width:"40%",
        height:50,
       
        borderRadius:50,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:"center",
    },
    edit:{
        width:50,
        height:50,
       
        borderRadius:50,
        position:'absolute',
        right:10,
        
        borderWidth:0.1,
        justifyContent:'center',
        alignItems:'center'
        
    },
    card:{
      
        height:60,
        borderWidth:0.2,
        marginTop:10,
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
       
    },
    leader:{
        width:40,
        height:40,
    }
  });