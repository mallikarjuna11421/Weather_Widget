import React, {Component} from 'react';
import {View, StyleSheet } from 'react-native';

import Video from 'react-native-video';



const Background =() => {
    const onBuffer = (data) => {
        console.log("on buffering====>>", data)
    }

    const videoError = (data) => {
            console.log("error raised====>>", data)
        }

        return(
            <View style={{flex:1}}>
               <Video source={require("./RooftopClouds_preview.mp4")}   // Can be a URL or a local file.
                      ref={(ref) => {
                        this.player = ref
                      }}                                      // Store reference
                      onBuffer={this.onBuffer}                // Callback when remote video is buffering
                      onError={this.videoError}               // Callback when video cannot be loaded
                      style={styles.backgroundVideo} />
            </View>

        );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});