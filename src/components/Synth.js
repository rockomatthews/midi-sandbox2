import * as tone from 'tone';

const Synth = () => {
  const synth = new tone.PolySynth(tone.Synth, {
    oscillator: {
      partials: [0, 2, 3, 4],
    },
  });

  return synth;
};

export default Synth;