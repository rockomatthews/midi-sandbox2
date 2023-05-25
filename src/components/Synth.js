// Synth.js
import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

const Synth = ({ midiDevice }) => {
  const synthRef = useRef(new Tone.PolySynth(Tone.Synth).toDestination());

  useEffect(() => {
    if (midiDevice) {
      midiDevice.onmidimessage = (message) => {
        let [status, note, velocity] = message.data;
        if (status === 144 && velocity > 0) {
          console.log('Note on:', note); // Add logging here
          synthRef.current.triggerAttack(Tone.Midi(note).toFrequency());
        } else if (status === 128 || velocity === 0) {
          console.log('Note off:', note); // Add logging here
          synthRef.current.triggerRelease(Tone.Midi(note).toFrequency());
        }
      };
    }
    return () => {
      if (midiDevice) midiDevice.onmidimessage = null;
    };
  }, [midiDevice, synthRef]);

  return null;
};

export default Synth;
