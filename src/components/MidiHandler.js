import React, { useState, useEffect } from 'react';
import * as tone from 'tone';
import Synth from './Synth';

const MidiHandler = () => {
  const [note, setNote] = useState(60);
  const [volume, setVolume] = useState(1);

  const synth = new Synth();

  useEffect(() => {
    // This function will be called when the component mounts and whenever the state changes.
    synth.start();
    synth.volume.setValueAtTime(volume, 0);
  }, [note, volume]);

  useEffect(() => {
    // This function will be called whenever a MIDI event is received.
    const handleMidiEvent = (event) => {
      synth.play(event.note);
    };

    // useWebMidi(handleMidiEvent);

    return () => {
      // useWebMidi(null);
    };
  }, []);

  useEffect(() => {
    // This function will be called after the component mounts.
    if (synth) {
      synth.start();
      synth.volume.setValueAtTime(volume, 0);
    }
  }, [synth]);

  return (
    <div>
      <Slider
        value={note}
        onChange={(event) => setNote(event.target.value)}
        label="Note"
      />
      <Slider
        value={volume}
        onChange={(event) => setVolume(event.target.value)}
        label="Volume"
      />
      <Button onClick={() => synth.play(note)}>Play</Button>
    </div>
  );
};

export default MidiHandler;