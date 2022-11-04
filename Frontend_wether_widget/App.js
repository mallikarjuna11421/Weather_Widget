import React, { useEffect, useState, useRef  } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Animated, Button } from 'react-native';
import { Box,SunIcon, NativeBaseProvider, AspectRatio, Image, Center, Stack, HStack, Heading, Icon, createIcon } from 'native-base';
import Video from 'react-native-video';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { Divider } from 'native-base';

export default App = () => {
        const [isLoading, setLoading] = useState(true);
        const [data, setData] = useState([]);
           const [dataa, setDataa] = useState([]);
        const [title, setTitle] = useState()
        const [name, setName] = useState("");
        const [temperature, setTemperature] = useState("");
        const [wicon, setWicon] = useState("");
        const [desc, setDesc] = useState("");
        const [humidity, setHumidity] = useState("");
        const [visibility, setVisibility] = useState("");
        const [windspeed, setWineSpeed] = useState("");

console.log(dataa, "dattt")
console.log(name, "long")

       const onBuffer = (data) => {
              console.log("on buffering====>>", data)
          }

          const videoError = (data) => {
                  console.log("error raised====>>", data)
              }

    const Dispaly = () => {
      return <Box alignItems="center" style={{ marginTop: 200, marginBottom: 130,

												  borderRadius: 5, }}>


				  <Box  rounded="lg"
				  overflow="hidden"  borderWidth="1"

				>
                    <BlurView
                           style={{
                            width:350,
                            height:200,
                            alignSelf:'center',
                            borderRadius:10,
                            borderWidth:.1,
                           }}
                           blurType="dark"
                           blurAmount={70}
                           >

                           <Heading style ={{color: "white", textAlign:"right", padding:25}}>
                             {name}
                           </Heading>

                           <Heading style ={{color: "white", textAlign:"left", padding:25}}>
                                                       {temperature}°
                                                      </Heading>

                            <Text  style ={{color: "white", paddingTop:60, paddingLeft:25}}
                                fontSize="xs"  fontWeight="500" ml="-0.5" mt="-1" >
                                {desc}
                            </Text>
                            <Text  style ={{color: "white", paddingTop:130, paddingLeft:25}}
                                                            fontSize="xs"  fontWeight="500" ml="-0.5" mt="-1" >
                                                            Humidity {"\n"}{humidity} %
                              </Text>
                              <Text  style ={{color: "white", paddingTop:130, paddingLeft:140}}
                                          fontSize="xs"  fontWeight="500" ml="-0.5" mt="-1" >
                                          Visibility {"\n"}{visibility} km
                                </Text>
                               <Text  style ={{color: "white", paddingTop:130, paddingLeft:250}}
                                         fontSize="xs"  fontWeight="500" ml="-0.5" mt="-1" >
                                          Wind Speed  {"\n"}{windspeed} km
                               </Text>
                           </BlurView>



          </Box>
        </Box>;
    };

  const getMovies = async () => {
     try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=london&appid=e203317f0df5474c05874e35b030eda3');
        const json = await response.json();
        setData(json);

        setWicon(json.weather[0].icon);
        setVisibility(json.visibility)
        setTemperature(Math.round(json.main.temp - 273.15));
        setDesc(json.weather[0].description);
        setHumidity(json.main.humidity);
        setWicon(json.weather[0].icon);
        setVisibility(json.visibility / 1000);
        setWineSpeed(json.wind.speed);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
 const getApi = async () => {
        try{
        const response = await  fetch('https://5if2v2knwg.execute-api.us-east-2.amazonaws.com/prod/get-weather-data', {
           method: 'post',
           headers: {'Content-Type':'application/json'},
           body : JSON.stringify({
                 "lat": "-27.486099",
                "long": "153.037430",
                "exclude": "hourly"
           })
          });
            const json = await response.json();
            setDataa(json.body);
                const temp = JSON.parse(json.body)
                console.log(temp.lat,"lamda")
                console.log(temp.timezone,"area")
                console.log(json.body.lat,"latitude")
                setName(temp.timezone)


        } catch (error) {
               console.error(error);
             } finally {
               setLoading(false);
             }
             console.log(response, "json")
 }
  useEffect(() => {
    getApi();
  }, []);
   useEffect(() => {
      getMovies();
    }, []);

  return (
  <NativeBaseProvider>

  <Video source={require("./Sunset.mp4")}   // Can be a URL or a local file.
                       repeat={true}
                         resizeMode="cover"
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onError={this.videoError}               // Callback when video cannot be loaded
                        style={styles.backgroundVideo} />


<Dispaly />

  </NativeBaseProvider>
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
  container: {
  flex: 1,
  },
   fadingContainer: {
      padding: 20,

    },
    fadingText: {
      fontSize: 28
    },
    buttonRow: {
      flexBasis: 100,
      justifyContent: "space-evenly",
      alignItems: "center",
    }

});