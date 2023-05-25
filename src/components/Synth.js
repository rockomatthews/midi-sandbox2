import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

const FirstSynth = () => {
  const [synth, setSynth] = useState(new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      partials: [0, 2, 3, 4],
    },
  }));

  useEffect(() => {
    // This function will be called when the component mounts and whenever the state changes.
    synth.start();
  }, []);

  return (
    <div>
      <piano
        parent={document.querySelector("#content")}
        polyphonic={true}
        noteon={note => synth.triggerAttack(note.name)}
        noteoff={note => synth.triggerRelease(note.name)}
      />
      <ui
        tone={synth}
        parent={document.querySelector("#content")}
      />
    </div>
  );
};

export default FirstSynth;