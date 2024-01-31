/**to run the project: npx expo start */

import React, { useState, useRef, useEffect } from 'react';
import { Dimensions,StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Modal} from 'react-native';
import MarkovGenerator from 'markov-generator';
import { Video } from 'expo-av';

import axios from 'axios';
import { Audio } from 'expo-av'; // Import the Audio module
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import styles from './styles'; //import styles
const numColumns = 3; // Define numColumns 

import { themeTextMapping, themeVoiceMapping, themeData, videoSources } from './mappings'; // import mapping 
import Timer from './timer'; // Import the Timer component
import CharacterStoryGenerator from './characterStoryGenerator';

const App = () => {
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [shouldCancel, setShouldCancel] = useState(false);
  const soundObjectRef = useRef(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [videoKey, setVideoKey] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
   const [themeVideoSource, setThemeVideoSource] = useState(null);
  const introVideoRef = useRef(null);
  const themeVideoRef = useRef(null);
  const [isThemeVideoVisible, setIsThemeVideoVisible] = useState(false);
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const videoRef = useRef(null);
  //const [videoSource, setVideoSource] = useState(null);



//handle full screen for the video books
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedVideoUri, setSelectedVideoUri] = useState(null);
  const toggleFullscreen = (videoUri) => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setSelectedVideoUri(videoUri); // Load the selected video
    } else {
      setSelectedVideoUri(null); // Unload the video when closing the modal
    }
  };
  
//handler for the introVideo only
 const handleVideoPlaybackStatusUpdate = playbackStatus => {
  if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
    videoRef.current.setPositionAsync(0); // Seek to the start of the video
  }
};

//generate text from files
  const generateText = async (themeName) => {
    const textContent = themeTextMapping[themeName];
    if (textContent) {
        let generatedText = '';
        const sentences = textContent.split('\n');
        const markov = new MarkovGenerator({ input: sentences });
        const generatedSentences = [];
        let totalSentences = 0;

        while (totalSentences < 7) { //adjust the numb to control sentences
            if (shouldCancel) {
                console.log("Generation canceled");
                setGeneratedText('Generation canceled');
                return;
            }

            //const sentence = markov.makeChain();
            //generatedSentences.push(sentence);
            //totalSentences = generatedSentences.length;

            let sentence = markov.makeChain();
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1); // Capitalize the first letter
           // sentence = sentence.trim().replace(/\.$/, ''); // trim & remove trailing  period
           // Correct sentence endings using a regular expression
            sentence = sentence.replace(/\.*$/, '') + '.';// Ensure one period at the end
           
           
            generatedSentences.push(sentence);
            totalSentences = generatedSentences.length;
                }

        generatedText = generatedSentences.join(' ');
        

        console.log("Generated Text:", generatedText);
        setGeneratedText(generatedText);
        await speakText(generatedText, themeName);
    }
};


  // Function to make the API request & returned audio voice
  const speakText = async (text, themeName) => {
    const apiKey = "Google API key"; // Replace with your actual API key
    const voiceId = themeVoiceMapping[themeName];// Get the voice ID for the theme
    const url = `Google endpoint`;

    try {
      const response = await axios.post(url, {
        input: { text },
        //voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D', ssmlGender: 'NEUTRAL' },
        voice: { languageCode: 'en-US', name: voiceId, ssmlGender: 'NEUTRAL' },

        audioConfig: { audioEncoding: 'MP3' },
      });

      const audioContent = response.data.audioContent;
      playAudio(audioContent);
    } catch (error) {
      console.error('Error calling the Text-to-Speech API:', error);
    }
  };

  // Functo play audio from base64-encoded string Google cloud text-to-speech API
  const playAudio = async (base64Audio) => {
    if (soundObjectRef.current) {
      await soundObjectRef.current.unloadAsync();
    }
  
    soundObjectRef.current = new Audio.Sound();
  
    try {
      const uri = `${FileSystem.documentDirectory}audio.mp3`;
      await FileSystem.writeAsStringAsync(uri, base64Audio, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      await soundObjectRef.current.loadAsync({ uri });
      await soundObjectRef.current.playAsync();
      setIsAudioPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  //for theme
  const stopAudio = async () => {
    if (soundObjectRef.current && soundObjectRef.current._loaded) {
      await soundObjectRef.current.stopAsync();
      setIsAudioPlaying(false);
    }
  };
//for theme
  const resumeAudio = async () => {
    if (!isAudioPlaying && generatedText) {
      await speakText(generatedText);
    }
  };
  
  
//handle image click to select themes
const handleImageClick = async (themeName) => {
  console.log("Theme clicked:", themeName); 
  if (isGenerating) {
      setShouldCancel(true);
      await stopAudio(); // Stop any ongoing audio
      
  }
  
  setShouldCancel(false);
  setGeneratedText('');
  setIsGenerating(true);
  await generateText(themeName);
  setIsGenerating(false);
  setShowIntroVideo(false);

  const theme = themeData.find(item => item.themeName === themeName);
  if (theme) {
    setSelectedTheme(theme);
    const videoAsset = Asset.fromModule(theme.video);
    setThemeVideoSource(videoAsset.uri); 
    // Add a key to force re-render
    setVideoKey(prevKey => prevKey + 1); 
    setIsThemeVideoVisible(true);
  } else {
    console.error(`Theme not found: ${themeName}`);
  }
};
useEffect(() => {
  const loadAndPlayThemeVideo = async () => {
    if (themeVideoSource && themeVideoRef.current) {
      console.log("Loading theme video:", themeVideoSource);
      try {
        await themeVideoRef.current.unloadAsync();
        await themeVideoRef.current.loadAsync({ uri: themeVideoSource });
        await themeVideoRef.current.playAsync();
      } catch (error) {
        console.error('Error playing theme video:', error);
      }
    }
  };

  const closeVideoPlayer = () => {
    setIsThemeVideoVisible(false);
  }; 

  loadAndPlayThemeVideo();
}, [themeVideoSource]);

//render the image themes
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleImageClick(item.themeName)}>
      <Image source={item.image} style={styles.themeImage} />
    </TouchableOpacity>
  );

//handle playback for theme videos
  const handleThemeVideoPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
        // The video has finished playing, reset to start
        themeVideoRef.current.setPositionAsync(0);
        // Optionally pause the video. If you want it to loop, you can remove this line.
        themeVideoRef.current.pauseAsync();
    }
};

    /**The return/render section is to display elements on screen  */

  return (
    <View style={styles.parentContainer}>
    
      <View style={styles.timerContainer}>
        <Timer />
      </View>

    <View style={styles.flatListContainer}>
    <Text style={styles.appTitle}>WhimsiTale</Text> 

  
    {showIntroVideo && (
      <Video
        ref={videoRef}
        source={require('./media/introVideo.mp4')}
        style={styles.introVideoPlayer}
        resizeMode="container"
        shouldPlay={false}
        useNativeControls
        onPlaybackStatusUpdate={handleVideoPlaybackStatusUpdate}
      />
    )}

    <FlatList
      data={themeData}
      renderItem={renderItem}
      keyExtractor={(item) => item.themeName}
      numColumns={numColumns}
      ListFooterComponent={
        <View style={styles.listFooter}>

          <Text style={styles.storyTitle}>Display Story</Text>
          <View style={styles.generatedTextContainer}>
            <Text style={styles.generatedText}>{generatedText}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.stopButton} onPress={stopAudio}>
              <Text style={styles.stopButtonText}>Stop Reading</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={isAudioPlaying ? stopAudio : resumeAudio}>
              <Text style={styles.controlButtonText}>
                {isAudioPlaying ? 'Pause Reading' : 'Resume Reading'}
              </Text>
            </TouchableOpacity>

{/***--------------------------Code for extra video books---------------------------------------------- */}
          <Text style={styles.videoBookTitle}>Video Books</Text>
          {videoSources.map(video => (
            <View style={styles.videoBookView} key={video.id}>
            {/**<Text style={styles.videoBookTitle}>Video Book</Text> */}
              <TouchableOpacity onPress={() => toggleFullscreen(video.uri)}>
                <Text style={styles.videoTitleText}> {video.id}</Text>
              </TouchableOpacity>
              <Video
                source={{ uri: video.uri }}
                style={styles.videoStyle}
                resizeMode="contain"
                shouldPlay={false}
                useNativeControls
                onError={(error) => console.error("Error loading video:", error)}
              />
            </View>
          ))}
          <Modal
            animationType="slide"
            transparent={false}
            visible={isFullscreen}
            supportedOrientations={['landscape', 'portrait']}
            onRequestClose={() => toggleFullscreen(null)}
          >
            <View style={styles.fullscreenVideoContainer}>
              {selectedVideoUri && (
                <Video
                  source={{ uri: selectedVideoUri }}
                  style={styles.fullscreenVideoStyle}
                  resizeMode="contain"
                  shouldPlay={false}
                  useNativeControls
                  onError={(error) => console.error("Error playing video:", error)}
                />
              )}
              <TouchableOpacity style={styles.closeFullscreenButton} onPress={() => toggleFullscreen(null)}>
                <Text style={styles.closeFullscreenButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
{/***-------------------------END OF CODE FOR EXTRA VIDEO----------------------------------------------- */}

{/*********************** New Character Selection View **/}
                  <CharacterStoryGenerator />

           
          </View>
          
          
        </View>

        
      }
      contentContainerStyle={styles.listContent}
    />

   {isThemeVideoVisible && selectedTheme && (
  <View style={styles.videoContainer}>
    <Video
      key={videoKey}
      ref={themeVideoRef}
      source={{ uri: themeVideoSource }}
      style={styles.videoPlayer}
      resizeMode="cover"
      shouldPlay // This prop is used to autoplay the video
      useNativeControls
      onPlaybackStatusUpdate={handleThemeVideoPlaybackStatusUpdate} // Attach the handler for playback theme videos
    />
    <TouchableOpacity style={styles.closeButton} onPress={() => setIsThemeVideoVisible(false)}>
      <Text style={styles.closeButtonText}>X</Text>
    </TouchableOpacity>
  </View>
)}



  </View>


    </View>
    
  );
};

export default App;




