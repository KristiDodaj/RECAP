import { StyleSheet, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";
import { getDate } from "../functions/Utils";

//set up dimensions
const { width } = Dimensions.get("window");
const imageWidth = Dimensions.get("window").width * 0.8;
const height = width * 0.6;

function Welcome(props) {
  //get content
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getcontent = async () => {
    try {
      const response = await fetch(
        "https://us-central1-recap-f2b99.cloudfunctions.net/expressApi"
      );
      const json = await response.json();
      setData(json.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    getcontent();
  }, []);

  //set up image array
  const images = [
    "https://images.pexels.com/photos/13124534/pexels-photo-13124534.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "",
    "",
    "",
    "",
    "",
    "https://images.pexels.com/photos/13130896/pexels-photo-13130896.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  data.forEach((element, index, array) => {
    images[index + 1] = element.image;
  });

  //set up source array
  const sources = [
    "",
    "Scientific America",
    "NPR Sports",
    "NPR News",
    "E Online",
    "CNBC NEWS",
  ];

  //set up headlines array
  const headlines = [
    "",
    "",
    "",
    "",
    "",
    "",
    "All caught up! Check back in tomorrow for your next recap.",
  ];

  data.forEach((element, index, array) => {
    headlines[index + 1] = element.headline;
  });

  //set up redirect link array
  const redirect = ["", "", "", "", "", ""];

  data.forEach((element, index, array) => {
    redirect[index + 1] = element.link;
  });

  //get date
  let date = getDate();

  //Switch nav bar
  const [active = 0, setValue] = useState(0);
  //update slider animation function
  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide == 5) {
      setValue(5);
    } else if (slide !== active) {
      setValue(slide);
    }
  };

  //Insert Touchables Highlight component to wrap around the news images (set them to redirect link)
  return (
    <>
      <View style={[styles.container]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={change}
          scrollEventThrottle={16}
          style={styles.scroll}
        >
          {images.map((item, index) => (
            <Image
              image={index}
              key={index}
              style={[
                index == 0 ? styles.starterPage : styles.images,
                { height },
              ]}
              source={{ uri: item }}
            />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {images.map((i, k) => (
            <Text
              key={k}
              style={k == active ? styles.sliderActive : styles.slider}
            >
              ⬤
            </Text>
          ))}
        </View>
        <View style={styles.scroll}>
          {headlines.map((i, t) => (
            <Text key={t} style={styles.headlines}>
              {t == active ? headlines[t] : null}
            </Text>
          ))}
          {sources.map((source, j) => (
            <Text key={j} style={styles.source}>
              {j == active ? sources[j] : null}
            </Text>
          ))}
        </View>
        <Text style={[styles.setColorWhite, styles.logo]}>RECAP</Text>
        <Text style={[styles.setColorWhite, styles.dateText]}>{date}</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    alignItems: "center",
  },
  setColorWhite: {
    color: "#fff",
  },
  dateText: {
    position: "absolute",
    top: "13%",
    left: "7.5%",
    color: "#a6a6a6",
    fontSize: 25,
    fontWeight: "bold",
  },
  logo: {
    position: "absolute",
    top: "8.5%",
    left: "7.5%",
    fontSize: 35,
    fontWeight: "bold",
  },
  images: {
    width: imageWidth,
    resizeMode: "contain",
    alignSelf: "center",
    top: "0%",
    borderRightWidth: 5,
    borderLeftWidth: 30,
    borderBottomWidth: 0,
    borderColor: "black",
    borderRadius: 20,
    padding: 0,
  },
  starterPage: {
    flex: 1,
    width: imageWidth,
    alignSelf: "center",
    top: "6%",
    resizeMode: "contain",
    padding: 0,
  },
  source: {
    color: "white",
    width: imageWidth,
    position: "absolute",
    fontSize: 17,
    fontFamily: "Times New Roman",
    fontStyle: "italic",
    top: "-75%",
    padding: 0,
  },
  headlines: {
    color: "white",
    width: imageWidth,
    position: "absolute",
    top: "-50%",
    fontSize: 25,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    padding: 0,
  },
  scroll: { width: imageWidth, height },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: "8%",
    alignSelf: "center",
  },
  slider: {
    margin: 3,
    color: "#888",
  },
  sliderActive: {
    margin: 3,
    color: "white",
  },
});

export default Welcome;
