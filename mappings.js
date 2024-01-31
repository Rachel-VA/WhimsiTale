

// Define the image-text mapping with direct imports

export const themeTextMapping = {
    car: require('./assets/carText.js').default,
    fish: require('./assets/fishText.js').default,
    planet: require('./assets/planetText.js').default,
    airplane: require('./assets/airplaneText.js').default,
    butterfly: require('./assets/butterflyText.js').default,
    boy: require('./assets/boyText.js').default,
    dino: require('./assets/dinoText.js').default,
    dragon: require('./assets/dragonText.js').default,
    fairy: require('./assets/fairyText.js').default,
    princess: require('./assets/princessText.js').default,
    train: require('./assets/trainText.js').default,
    unicorn: require('./assets/unicornText.js').default,
    girl: require('./assets/girlText.js').default,
  
    shark: require('./assets/sharkText.js').default,
    //schoolbus: require('./assets/schoolBusText.js').default,
    friendship: require('./assets/friendShipText.js').default,
    
  };


  export const themeVoiceMapping = {
    car: 'en-US-Wavenet-F', // American accent, female voice
    fish: 'en-AU-Wavenet-B', // Australian accent, male voice
    planets: 'en-GB-Wavenet-E', // British accent, female voice
    airplane: 'en-IN-Wavenet-C', // Indian accent, male voice
    butterfly: 'en-US-Wavenet-A', // American accent, male voice
    boy: 'en-GB-Wavenet-D', // British accent, male voice
    girl: 'en-US-Wavenet-F', // Australian accent, female voice
    dino: 'en-IN-Wavenet-A', // Indian accent, male voice
    dragon: 'en-US-Wavenet-E', // American accent, male voice
    fairy: 'en-GB-Wavenet-F', // British accent, female voice
    princess: 'en-GB-Wavenet-C', // British accent, female voice
    train: 'en-US-Wavenet-G', // American accent, female voice
    unicorn: 'en-US-Wavenet-B', // American accent, male voice
    shark: 'en-US-Wavenet-H', // American accent, male voice
    schoolBus: 'en-AU-Wavenet-D', // Australian accent, female voice
    friendShip: 'en-US-Wavenet-J', // American accent, male voice
  };
  
  // Define the image mapping for themes based on the provided image names
  export const themeData = [
    { themeName: 'airplane', image: require('./media/airplane.jpg'), video: require('./media/airplane.mp4') },
    { themeName: 'butterfly', image: require('./media/butterfly.jpg'),video: require('./media/butterfly.mp4') },
    { themeName: 'car', image: require('./media/car.jpg'), video: require('./media/car.mp4') },
    { themeName: 'dino', image: require('./media/dino.jpg'), video: require('./media/dino.mp4') },
    { themeName: 'dragon', image: require('./media/dragon.jpg'), video: require('./media/dragon.mp4') },
    { themeName: 'fish', image: require('./media/fish.jpg'), video: require('./media/fish.mp4') },
    { themeName: 'friendship', image: require('./media/friendShip.jpg'),video: require('./media/friend.mp4') },
    { themeName: 'girl', image: require('./media/girl.jpg'), video: require('./media/girl.mp4') },
    { themeName: 'planet', image: require('./media/planet.jpg'), video: require('./media/planet.mp4') },
    //{ themeName: 'schoolbus', image: require('./image/schoolBus.jpg') },
    { themeName: 'shark', image: require('./media/shark.jpg'), video: require('./media/shark.mp4') },
    { themeName: 'train', image: require('./media/train.jpg'), video: require('./media/train.mp4') },
    { themeName: 'unicorn', image: require('./media/unicorn.jpg'), video: require('./media/unicorn.mp4') },
    { themeName: 'boy', image: require('./media/boy.jpg'), video: require('./media/boy.mp4') },
    { themeName: 'fairy', image: require('./media/fairy.jpg'), video: require('./media/fairy.mp4') },
    { themeName: 'princess', image: require('./media/princess.jpg'), video: require('./media/princess.mp4') },
  
    
  ];
  
  export const videoSources = [
    { 
      id: 'Introduction', 
      uri: 'https://storage.googleapi' 
    },
    { 
      id: 'T-Rex Top Secret Pancake', 
      uri: 'https://storage.googleapis.com' 
    },
    {
      id: 'Croc Royal Pizza', 
      uri: 'https://storage.googleapis.com' 
    }

    // Add more videos here
  ];
  


export const audioAlertMapping = {
  '15mins': require('./assets/15mins.mp3'),
  '10mins': require('./assets/10mins.mp3'),
  '5mins': require('./assets/5mins.mp3'),
  'timeup': require('./assets/timeup.mp3'),
};

//map data for each character
export const characterData = [
  { 
  id: 'panda', 
  name: 'Mochi',
  image: require('./assets/panda.png') ,
  prompt: "In a cozy corner of the lush Bamboo Forest, there's a baby panda named Mochi with a magical book of delicious mochi, he loves eating mochi. Each page Mochi turns brings a new, exciting adventure. Today, Mochi opens the book and finds himself in a world made entirely of tasty mochi treats! Write a 2-sentences story about Mochi's delicious mochi adventure."

  },

  {
    id: 'rabbit', 
    name: 'Cy K', 
    image: require('./assets/rabbit.png'),
    prompt: "In the vast, sun-kissed dunes of a sandy desert with full of cactus, there's a happy rabbit named Cy K with a backpack, wearing a orage jacket, and running in the desert on his way to his adventre, exploring different types of cacts. Cy K is on a quest to find the legendary Oasis of Wonders that hidden in the desert, a paradise where dreams come true. Write a 2-sentences story about Cy K's adventurous journey across the desert."
   }, 

   {
    id: "peanutbutterpup", 
    name: "Finley", 
    image: require('./assets/finley.png'),
    prompt: "Nestled in the heart of a sunlit kitchen where the aroma of toasty bread lingers, Finley, the dog with a flair for culinary adventure, dons a blue shirt and scholarly glasses. Today, he faces his greatest challenge yet: achieving the perfect peanut butter to jelly ratio for his signature sandwich without making a 'pawsitively' hilarious mess. Write a fun and playful story about Finley's comedic quest to craft the ultimate breakfast while navigating the perils of a slippery jelly jar and the ever-tempting peanut butter that sticks to the roof of his mouth."
  },

  // Add more characters as needed
];