import React, { useState, useEffect } from 'react';
import Tone from 'tone';
import { Button, Dropdown, DropdownMenu, DropdownItem } from '@mui/material';
import Synth from './Synth';

const ControlPanel = () => {
  const [synth, setSynth] = useState(new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      partials: [0, 2, 3, 4],
    },
  }));

  const [midiDevices, setMidiDevices] = useState([]);

  useEffect(() => {
    // This function will be called when the component mounts and whenever the state changes.
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const midiIn = new Tone.MidiIn(stream);
        midiIn.on('noteon', note => synth.triggerAttack(note.name));
        midiIn.on('noteoff', note => synth.triggerRelease(note.name));
        setMidiDevices(midiIn.getDevices());
      })
      .catch(err => console.error(err));
  }, []);

  const handleStart = () => {
    setMidiDevices([]);
    synth.start();
  };

  const handleSelectMidiDevice = (device) => {
    synth.midiDevice = device;
  };

  return (
    <div>
      <Button variant="contained" onClick={handleStart}>
        Start
      </Button>
      <Dropdown
        variant="filled"
        disableElevation
        open={midiDevices.length > 0}
        onClose={() => setMidiDevices([])}
      >
        <DropdownMenu>
          {midiDevices.map((device) => (
            <DropdownItem key={device.id} onClick={() => handleSelectMidiDevice(device)}>
              {device.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Synth synth={synth} />
    </div>
  );
};

export default ControlPanel;