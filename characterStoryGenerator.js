import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { characterData } from './mappings'; 
import { styles } from './styles'; 
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

const CharacterStoryGenerator = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [generatedStory, setGeneratedStory] = useState('');
  const [loading, setLoading] = useState(false);
  const soundObjectRef = useRef(null); 
  const [base64Audio, setBase64Audio] = useState(null);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [soundObject, setSoundObject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  

  useEffect(() => {
    if (currentCharacter) {
      handleCharacterSelect(currentCharacter);
    }
  }, [currentCharacter]);

  const handleCharacterSelect = async (characterName) => {
    const character = characterData.find(c => c.name === characterName);
    if (character) {
      setSelectedCharacter(characterName);
      setLoading(true);


      const story = await fetchStoryFromChatGPT(character.prompt);
      setGeneratedStory(story);
      setLoading(false);

      // Call the speakText function with the generated story text
      speakCharacterStory(story);
    }
  };

  const fetchStoryFromChatGPT = async (characterName) => {
    try {
      const response = await axios.post('openai endpoint', {
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "You are a helpful assistant. Please create a  a very brief, one-sentence story about the character name below."},
          {"role": "user", "content": `Write a short story about a ${characterName}.`},
          {"role": "user", "content": characterName},
        ]
      }, {
        headers: {
          'Authorization': `API key` // API key
        }
      });
      console.log(response.data.choices[0].message);
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching story from ChatGPT:', error.response ? error.response.data : error);
      console.error('Error fetching story from ChatGPT:', error);
      return 'Unable to generate the story. Please try again later.'; // More specific error message
    }
  };

  const speakCharacterStory = async (text) => {
    const apiKey = "API key"; // Replace with actual API key
    const url = `endpoint`;
  
    try {
      const response = await axios.post(url, {
        input: { text },
        voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
      });
      const audioContent = response.data.audioContent;
   
   
    playCharacterAudio(audioContent); // Play the audio with the content
    } catch (error) {
      console.error('Error calling the Text-to-Speech API:', error);
    }

  };
  const playCharacterAudio = async (base64Audio) => {
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
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  
  const pauseAudio = async () => {
    if (soundObject) {
      await soundObject.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stopAudio = async () => {
    if (soundObject) {
      await soundObject.stopAsync();
      setIsPlaying(false);
    }
  };

  const resumeAudio = async () => {
    if (soundObject) {
      await soundObject.playAsync();
      setIsPlaying(true);
    }
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Choose a Character</Text>
    
      {characterData.map((character) => (
        <TouchableOpacity key={character.id} onPress={() => handleCharacterSelect(character.name)}>
          <Image source={character.image} style={{ width: 100, height: 100, resizeMode: 'contain', margin: 10 }} />
          {selectedCharacter === character.name && (
            <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Story for {selectedCharacter}</Text>
              {loading ? (
                <ActivityIndicator style={{ marginTop: 10 }} />
              ) : (
                <View>
                  <Text style={{ fontSize: 16 }}>{generatedStory || 'Generating story...'}</Text>
                  <TouchableOpacity onPress={isPlaying ? pauseAudio : resumeAudio}>
                    <Text>{isPlaying ? 'Pause' : 'Resume'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={stopAudio}>
                    <Text>Stop</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>



  );
};

export default CharacterStoryGenerator;
