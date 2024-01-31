
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
// Get the screen width
const screenWidth = Dimensions.get('window').width;
// Calculate the height based on a 16:9 aspect ratio
const videoHeight = screenWidth * (9 / 16);

const gap = 10; // The gap between items
const Padding = 20; // Padding for the left and right of the container
const numColumns = 3; // The number of columns in the grid
// Total padding space
const totalPadding = Padding * 2; // The total space taken up by the gaps between items in a row
// The available width for all items in a row, accounting for the container padding and the gaps between items
// Total space between images
const totalGaps = (numColumns - 1) * gap;

// Available space for images
const availableWidth = windowWidth - totalPadding - totalGaps;

// Width for each image
const imageSize = availableWidth / numColumns;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white', 
    flexDirection:'column',
    width:'100%',
    height:'100%',
  },
  

  flatListContainer: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: Padding,
      //paddingTop: '5%',
      width: '100%', 
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%', 
},
  itemContainer: {
      width: imageSize,
      height: imageSize,
      marginHorizontal: gap / 2,
      marginBottom: gap,
  },
  themeImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
  generatedText: {
      marginTop: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      alignSelf: 'stretch',
      textAlign: 'center',
      paddingBottom: 20,
  },
  appTitle: {
      fontSize: 34,
      color: 'blue',
      fontWeight: 'bold',
      marginBottom: 20,
      //textAlign: 'center',
      left:'20%',
      marginTop:30,
  },
  storyTitle: {
      fontSize: 24,
      color: 'deeppink',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop:10,
  },
  generatedTextContainer: {
      width: '100%',
     
  },
  videoPlayer: {
    width: '100%',
    height:'100%',
   
    aspectRatio: 16 / 9, 
   // position: 'absolute',
    zIndex: 1,
    top: 10, 
    left: 0, 
    right: 0,
    width: screenWidth, 
    height: videoHeight, 
   
   
    //marginHorizontal: Padding,
    alignSelf:'center',
    
    
  },
  
  playButton: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: 'blue',
      marginBottom: 20,
  },
 

  listFooter: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttonContainer: {
    paddingTop: 20, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10,
    justifyContent: 'space-between', 
    width:'100%',

  },
  
  stopButton: {
    backgroundColor: '#ff6347',
    padding: 7,
    borderRadius: 5,
    marginTop: 0,
    marginRight: 5,

  },
  stopButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  controlButton: {
    backgroundColor:'green',
    padding:7,
    borderRadius: 5,
    marginTop:10,
    marginLeft: 5,

  },
  controlButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  introVideoPlayer: {
    width: screenWidth,
    height: videoHeight,        
    alignSelf: 'center', 
    marginTop: 0,      
    marginBottom:10,
    
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: videoHeight,
    alignSelf:'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: 'red',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    zIndex:1,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  videoBookView: {
    marginTop: 20, 
    //backgroundColor: 'pink',
    paddingVertical: 5,
    paddingHorizontal:5,
    flexDirection: 'column', 
    width: 400,
    height:250,
   // borderColor: 'blue', 
    //borderWidth: 1,

  },
  videoTitleText: {
    fontSize: 25, 
    color: 'rgb(0, 100, 0)',
    fontWeight:'bold',
    textAlign: 'center', 
  },
  
  videoStyle: {
    width: '100%', 
    height: 200, 
   
  },
  fullscreenVideoContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenVideoStyle: {
    width: '100%',
    height: '100%',
  },
  closeFullscreenButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeFullscreenButtonText: {
    color: 'white',
  },


  timerContainer: {
    position: 'absolute',
    top: 20, 
    right: 0, 
    zIndex: 999,
    backgroundColor: 'pink', 
    padding: 5, 
    borderRadius: 10, 
    //elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    flex: 1,
    fontSize: 12,
  },
  textInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    height: 20,
  },
  startButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 14,
    //fontWeight: 'bold',
  },
  remainingTimeText: {
    fontSize: 12,
    marginTop: 10,
  },
  customButton: {
    backgroundColor: 'blue', 
    padding: 10, 
    borderRadius: 5, 
},
customButtonText: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16, 
},

videoBookTitle: {
  fontSize: 30,
      color: 'purple',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop:20,
},



//-----------------------------character story
openaiTextcontainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},
characterImage: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
  margin: 10,
},

storyTitle: {
  fontSize: 18,
  fontWeight: 'bold',
},

storyDisplayContainer: {
  marginTop: 20,
  padding: 10,
  backgroundColor: '#f0f0f0', 
  borderRadius: 10,
},

storyText: {
  fontSize: 16,
  color: '#000', 
  
},



});
export default styles;