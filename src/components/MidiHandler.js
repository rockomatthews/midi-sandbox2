import { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Button, MenuList, Menu, MenuItem } from '@mui/joy';

const MidiHandler = () => {
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
      <Menu
        variant="filled"
        disableElevation
        open={midiDevices.length > 0}
        onClose={() => setMidiDevices([])}
      >
        <MenuList>
          {midiDevices.map((device) => (
            <MenuItem key={device.id} onClick={() => handleSelectMidiDevice(device)}>
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