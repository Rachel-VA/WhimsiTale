import React from 'react';
import Particles from 'react-native-particles';

const ParticleComponent = () => {
  return (
    <Particles
      count={50}
      emissionRate={5}
      interval={200}
      particleLife={1500}
      direction={-90}
      spread={360}
      speed={8}
      segments={100}
      width={300}
      height={300}
      fromPosition={{ x: 150, y: 300 }}
    />
  );
};

export default ParticleComponent;
