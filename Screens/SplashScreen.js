import React from 'react';
import { View, Image, StatusBar, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../Constants/Colors';

import Video from 'react-native-video';
const SplashScreen = props => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* <StatusBar
        translucent
        barStyle="transparent"
        backgroundColor={'transparent'}
      /> */}

      <Video

        source={
          require('./../Assets/Images/splash.mp4')}
        paused={false}
        // posterResizeMode='cover'
        // repeat
        volume={0}
        onEnd={async () => {
          // navigatetogettingstarted();
          props.navigation.replace('middleWare')
        }}
        style={{ flex: 1 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashScreen;
