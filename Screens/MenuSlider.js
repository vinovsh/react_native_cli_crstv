import React from 'react';
import { View, StyleSheet,Modal,Linking } from 'react-native';
import Colors from '../Components/ColorPalet';
import ReferralModal from '../Components/Modal/ReferralModal';
import Share from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';


import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../Components/Context';
import { TouchableOpacity } from 'react-native-gesture-handler';


const MenuSlider = (props) => {

    var token=props.globalData.userToken;

     var referal_code=props.globalData.referralCode;
     var show_referral_button=true;
     if(referal_code){
        show_referral_button=false;
     }else{
        show_referral_button=true;
     }

    const paperTheme = useTheme();
    const {toggleTheme,SignOut } = React.useContext(AuthContext);
    const[isShowModal,setIsShowModal]=React.useState(false);
    const[isShowReferalButton,setIsShowReferalButton]=React.useState(show_referral_button);

    var name=props.globalData.userName;
    var profile=props.globalData.userProfile;
    var email=props.globalData.userEmail;
    var code=props.globalData.userCode;
    var stars=props.globalData.userStars;

    const modalControll=()=>{
        setIsShowModal(!isShowModal);
    }

    const show_referral_button_Update=()=>{

        setIsShowReferalButton(false);
        
    }


    const shareImageB64=(base64String)=>{

        const shareOptions={
          message:"I’m inviting you to watch Christian live tv for free please download it from Google Play Store. Here’s my Referral Code:( "+code+" ) just enter it your app .if you reached 10 referrals you will earn a reward!  \n\nhttps://play.google.com/store/apps/details?id=com.app.crstv",
         // url:"data:image/jpeg;base64,"+base64String
        }
    
        Share.open(shareOptions)
        .then((res) => {
         // console.log(res);
        })
        .catch((err) => {
         // err && console.log(err);
        });
      }
    

    const shareApp=()=>{

       
    ImgToBase64.getBase64String('https://crstv.s3.ap-south-1.amazonaws.com/assets/share_app/share.png')
    .then(base64String => shareImageB64(base64String))
    .catch(err => doSomethingWith(err));
    }

    return(

        <>

        <Modal transparent visible={isShowModal}>
            <ReferralModal show_referral_button_Update={show_referral_button_Update} token={token} modalControll={modalControll} />
        </Modal>
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15,paddingBottom:15, borderBottomColor:paperTheme.colors.light, borderBottomWidth: 0.3}}>
                            {profile ?

                                <Avatar.Image 
                                   source={{
                                      uri: profile
                                   }}
                                   size={50}
                                />

                                :

                                <Avatar.Image 
                                   source={require('../assets/images/profile.png')}
                                   size={50}
                                />
                            
                             }
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{name}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
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
                          
                            <TouchableOpacity onPress={()=>{props.navigation.navigate('RewardPage')}} activeOpacity={0.6}>   
                                <Text style={{fontSize:15,color:'#ffff'}}>Rewards</Text>
                             </TouchableOpacity>   
                        </View>
                    </View>
                    <Text style={{textAlign:'center',marginTop:10}}>Your code</Text>
                    <View style={[styles.card,{borderColor:paperTheme.colors.light}]}>

                        
                        <Text style={{fontSize:25}}>{code}</Text>

                    </View>
                  {isShowReferalButton?
                    <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:5}}>
                      
                        <View style={{width:'60%',height:40,backgroundColor:'green',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                          <TouchableOpacity activeOpacity={0.6} onPress={()=>{modalControll()}}>
                            <Text style={{fontSize:15,color:'#fff'}}>Add referral code</Text>
                            </TouchableOpacity>
                        </View>
                        

                    </View>

                    :<></>}

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({size,color}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label={({color}) => <Text style={{color:color}}>Home</Text>}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({size,color}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label={({color}) => <Text style={{color:color}}>Profile</Text>}
                            onPress={() => {props.navigation.navigate('ProfileScreen')}}
                        />
                        <DrawerItem 
                            icon={({size,color}) => (
                                <Icon 
                                name="lock" 
                                color={color}
                                size={size}
                                />
                            )}
                            label={({color}) => <Text style={{color:color}}>Privacy Policy</Text>}
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                        <DrawerItem 
                            icon={({size,color}) => (
                                <Icon 
                                name="star" 
                                color={color}
                                size={size}
                                />
                            )}
                            label={({color}) => <Text style={{color:color}}>Rate Us</Text>}
                            onPress={() => {Linking.openURL('https://play.google.com/store/apps/details?id=com.app.crstv')}}
                        />
                        <DrawerItem 
                            icon={({size,color}) => (
                                <Icon 
                                name="share-variant" 
                               
                                size={size}
                                color={color}
                                />
                            )}
                            label={({color}) => <Text style={{color:color}} >Share {'&'} Earn reward</Text>}
                            onPress={() => {shareApp()}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple  onPress={() => {toggleTheme()}} >
                            <View style={styles.preference}>
                                <Text >Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={[styles.bottomDrawerSection,{color:paperTheme.colors.light}]}>
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

        </>
    );
}
export default MenuSlider;
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
       
        borderTopWidth: 0.3
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
    card:{
      
        height:60,
        borderWidth:0.2,
        marginTop:10,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
       
    },
  });