const config = {
 // initialRouteName: "Reels",
  screens: {
    Main: {
      screens: {
        Reels:{
          path:'reels/:reel_id?',
          parse: {
            reel_id: (reel_id) => `${reel_id}`,
          },
        },
       
      },
    },
    
  
    
  },
  };
  
  const linking = {
    prefixes: ["crstv://"],
    config,
  };
  //https://www.youtube.com/watch?v=6OqrLe2B_UU
  export default linking;