import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from "react-native";
import Colors from "../Components/ColorPalet";
import config from "../config/config";
import axios from "axios";
import ProgressiveImage from "../Components/ProgressiveImage";
import { useTheme } from "react-native-paper";
import { AuthContext } from '../Components/Context';
import RewardScreen from "../Components/quize/RewardScreen";
import ErrorScreen from "../Components/quize/ErrorScreen";

import ContinueScreen from "../Components/quize/ContinueScreen";
import CommingSoon from "../Components/quize/CommingSoon";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

//ads import
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

//loader

import LoadingScreen from "./LoadingScreen";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
const adUnitId = config.AD_STATUS=='test'? TestIds.BANNER : config.BANNER_AD_ID;



const QuizeScreen = (props) => {



  const { starsUpdate } = React.useContext(AuthContext);
  const { colors } = useTheme();

  const [adLoaded, setAdLoaded] = useState(false);
  
  const [isShowQuize,setIsShowQuize]=useState(null);
  const [totalStars,setTotalStars]=useState(props.route.params.userStars);
  const [taskStars,setTaskStars]=useState(0);
  const [totalQuestions,setTotalQuestions]=useState(0);
  const [apidata, setApidata] = useState();
  const [showReward, setShowReward] = React.useState(false);
  const [currentPos, setCurrentPos] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizeKey, setQuizeKey] = useState(null);

  //modals status
  const [successFinishModal, setSuccessFinishModal] = React.useState(false);
  const [failedFinishModal, setFailedFinishModal] = React.useState(false);
  const [wrongInputModal, setWrongInputModal] = React.useState(false);
  const [rewardCollectedModal, setRewardCollectedModal] = React.useState(false);
  const [looping, setLooping] = React.useState(true);

  const nextquestion = () => {
    setShowReward(true);
  };

  const displayAd_error=()=>{

   // rewarded.show();
   ToastAndroid.show('Ads not available...', ToastAndroid.SHORT);
  }

  const getdata = async () => {
    try {
      await axios
        .post(config.BASE_URL + "quize", {
          token: props.route.params.userToken,
        })

        .then(function (response) {
          var data = response.data;

          if (data.error == false) {
            setApidata(data);
            setTotalStars(data.quize_status.total_stars);
            if(data.quize.length!=0){
                setIsShowQuize(data.isShowQuize);
                setCurrentPos(data.quize_status.position);
                setSelectedOption(data.quize_status.selected_option);
                setCorrectOption(data.quize[data.quize_status.position].correctoption);
                setQuizeKey(data.quize_key);
                setTaskStars(data.quize_status.stars);
                setTotalQuestions(data.quize.length);
                setLoading(false);
                
            }
          } else {
            Alert.alert("Error Message!", JSON.stringify(data.message), [
              { text: "Okay" },
            ]);
            return;
          }
        })
        .catch(function (error) {
          Alert.alert("Error Message!", JSON.stringify(error.message), [
            { text: "Okay" },
          ]);
          return;
        });
    } catch (e) {
      Alert.alert("Error Message!", JSON.stringify(e.message), [
        { text: "Okay" },
      ]);
      return;
    }
  };

  React.useEffect(() => {
    getdata();
   
  
  }, []);

 const modalController=()=>{
   

  if(selectedOption!=null && selectedOption!=correctOption && currentPos==totalQuestions-1 && taskStars==0){
       
    setFailedFinishModal(true);
    setWrongInputModal(false);
    setSuccessFinishModal(false);

  }else if(selectedOption!=null && selectedOption!=correctOption && currentPos<totalQuestions-1){

    setFailedFinishModal(false);
    setWrongInputModal(true);
    setSuccessFinishModal(false);
   
  }else if(selectedOption!=null &&  currentPos==totalQuestions-1 &&taskStars!=0){

    setFailedFinishModal(false);
    setWrongInputModal(false);
    setSuccessFinishModal(true);
   
  }  

  setLooping(false);
 }
  //modal Management
   if(totalQuestions!=0 && looping==true){
      modalController();
   }

 



  const optionPress=async(key)=>{

    setSelectedOption(key);

       await axios
        .post(config.BASE_URL + "quize_interaction", {
          token: props.route.params.userToken,
          quize_key:quizeKey,
          position:currentPos,
          selected_option:key,

        })

        .then(function (response) {
          var data = response.data;
          if (data.error == false) {

            setTotalStars(data.total_stars);
            setTaskStars(data.task_stars);
            starsUpdate(data.total_stars);

        
            if(currentPos<totalQuestions-1 && key==correctOption){
           
              setCurrentPos(currentPos+1);
              setSelectedOption(null);
              setCorrectOption(apidata.quize[currentPos+1].correctoption);
            }
            setLooping(true);
            

          }
          //
        })
       
  }
  const nextQuestion=()=>{ 
     
     setCurrentPos(currentPos+1);
     setSelectedOption(null);
     setCorrectOption(apidata.quize[currentPos+1].correctoption); 
     setWrongInputModal(false);
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) :isShowQuize==false?( 
        <CommingSoon />
      ): (

        
        <>
   
          <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
            
            {successFinishModal ? (
              <RewardScreen />
            ) :failedFinishModal?(
                
              <ErrorScreen token={props.route.params.userToken} displayAd_error={displayAd_error} totalStars={totalStars} />

            ) :wrongInputModal?(
              <ContinueScreen token={props.route.params.userToken} totalStars={totalStars} displayAd_error={displayAd_error} nextQuestion={nextQuestion}/>
            ):(
              <>
              
                <View style={styles.header}>

                
                  <Text
                    style={[
                      styles.smallText,
                      { color: colors.quiz_small_text },
                    ]}
                  >
                    {currentPos + 1} 0f {totalQuestions}
                   
                  </Text>
                 
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{ paddingBottom: 20 }}>

                  
                
              

               
                  <View style={styles.textBox}>
                    <Text
                      style={[styles.largeText, { color: colors.quiz_text }]}
                    >
                      {apidata.quize[currentPos].question}
                    </Text>
                  </View>
                  <View style={styles.imageContainer}>
                    <View style={styles.imageBox}>
                      <ProgressiveImage
                        defaultImageSource={require("../assets/images/loadImage.png")}
                        source={{ uri: apidata.quize[currentPos].image }}
                        style={styles.image}
                      />
                    </View>
                  </View>

                  <View style={styles.optionCard}>


                      {apidata.quize[currentPos].options.map(option =>(

                          <TouchableOpacity disabled={selectedOption==null? false:true} onPress={()=>{optionPress(option.key)}} activeOpacity={0.6} key={option.key} style={[selectedOption==option.key && selectedOption!=null && selectedOption!=correctOption?styles.wrongButton:selectedOption!=null && selectedOption!=option.key && correctOption==option.key || selectedOption!=null && selectedOption==option.key && correctOption==option.key? styles.rightButton: styles.card]}>
                             <Text style={styles.optionText}>
                                {option.name}
                             </Text>
                             {selectedOption==option.key && correctOption!=option.key?
                               <Icon style={{position:'absolute',right:10}}  name="close-circle"  size={30} color={'red'}/> 
                             :<></>}

                             {selectedOption==option.key && correctOption==option.key || selectedOption!=null && selectedOption!=option.key && correctOption==option.key?
                                <Icon style={{position:'absolute',right:10}}  name="check-circle"  size={30} color={'green'}/>  
                             :<></>}
                             

                           </TouchableOpacity>
                       ))

                     }
 
                   
                   
                    
                   


                    
                  </View>
                  <BannerAd
                     unitId={adUnitId}
    
                    // onAdFailedToLoad={(event)=>{console.log(event)}}
                     size={BannerAdSize.FULL_BANNER}
                     requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                     }}
                  />
                </ScrollView>

               
              </>
            )}
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default QuizeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    height: 50,
    width: "100%",
    borderBottomColor: Colors.shadow,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  smallText: {
    fontFamily: "Montserrat-Bold",

    marginTop: 1,
    fontSize: 13,
  },
  largeText: {
    fontSize: 30,
    textAlign: "center",
    marginHorizontal: 35,
    fontWeight: "700",
    fontFamily: "Montserrat-SemiBold",

    marginTop: 10,
  },
  imageContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },

  imageBox: {
    width: width / 1.1,
    height: width / 2,
    borderRadius: 15,
    backgroundColor: Colors.theamColor,
    // borderWidth: 1,
    //  borderColor: Colors.LightBlack,

    //borderStyle:'solid',
    shadowColor: Colors.shadow,
    elevation: 7,
    marginHorizontal: width / 1.2,
    padding: 0,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    flex: 1,
    borderRadius: 15,
  },
  optionCard: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  card: {
    width: width / 1.1,

    minHeight: 60,

    borderRadius: 15,
    backgroundColor: Colors.theamColor,
    // borderWidth: 1,
    //  borderColor: Colors.LightBlack,

    //borderStyle:'solid',
    shadowColor: Colors.shadow,
    elevation: 7,
    marginHorizontal: width / 1.2,
    padding: 0,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  optionText: {
    padding: 10,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: "#3D3E3E",
    lineHeight: 25,
    // paddingHorizontal:20
  },
  wrongButton: {
    width: width / 1.1,

    minHeight: 60,

    borderRadius: 15,
    backgroundColor: Colors.theamColor,
    // borderWidth: 1,
    //  borderColor: Colors.LightBlack,

    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 3,
    shadowColor: Colors.shadow,
    elevation: 7,
    marginHorizontal: width / 1.2,
    padding: 0,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  rightButton: {
    width: width / 1.1,

    minHeight: 60,

    borderRadius: 15,
    backgroundColor: Colors.theamColor,
    // borderWidth: 1,
    //  borderColor: Colors.LightBlack,

    borderStyle: "solid",
    borderColor: "green",
    borderWidth: 3,
    shadowColor: Colors.shadow,
    elevation: 7,
    marginHorizontal: width / 1.2,
    padding: 0,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  selectedoptionText: {
    padding: 10,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: "#4343f4",
    lineHeight: 25,
    // paddingHorizontal:20
  },
  ContinueButtonCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  ContinueButton: {
    width: width / 1.1,

    minHeight: 60,

    borderRadius: 15,
    backgroundColor: Colors.theamColor,
    // borderWidth: 1,
    //  borderColor: Colors.LightBlack,

    //borderStyle:'solid',
    shadowColor: Colors.shadow,
    elevation: 7,
    marginHorizontal: width / 1.2,
    padding: 0,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#4343f4",
  },
  continueText: {
    padding: 10,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
    lineHeight: 25,
  },
});
