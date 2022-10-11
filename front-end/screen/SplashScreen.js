import { StyleSheet, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { ImageBackground, View } from "react-native";

function Splash(props) {
  return (
    <View style={[styles.container]}>
      <ImageBackground
        style={[styles.image]}
        source={require("../assets/splash.png")}
        resizeMode="cover"
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Splash;
