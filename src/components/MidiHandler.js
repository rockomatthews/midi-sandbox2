/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Menu, MenuItem, MenuList } from '@mui/joy';
import Synth from './Synth'

const MidiHandler = () => {
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    // This function will be called when the component mounts and whenever the state changes.
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const midi = new Tone.Midi(stream);
        midi.on('noteon', note => synth.triggerAttack(note.name));
        midi.on('noteoff', note => synth.triggerRelease(note.name));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Menu
        variant="filled"
        disableElevation
        open={midiDevices.length > 0}
        onClose={() => setMidiDevices([])}
      >
        <MenuList>
          {midiDevices.map((device) => (
            <MenuItem key={device.id} onClick={() => setSynth(new Tone.PolySynth(Tone.Synth, {
              oscillator: {
                partials: [0, 2, 3, 4],
              },
            }))}>
              {device.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Synth synth={synth} />
    </div>
  );
};

export default MidiHandler;