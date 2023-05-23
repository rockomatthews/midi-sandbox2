import { useState, useEffect } from 'react';
import { Button, Select, MenuItem } from '@mui/joy';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import * as Tone from 'tone';

const ControlPanel = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [midiDevices, setMidiDevices] = useState([]);

  const handlePlay = () => {
    Tone.start();
    setIsPlaying(true);
  };

  const handleInstrumentChange = (event) => {
    setSelectedInstrument(event.target.value);
  };

  // Functionality for onMIDISuccess and onMIDIFailure
  const onMIDISuccess = (midiAccess) => {
    for (let input of midiAccess.inputs.values()) {
      setMidiDevices(prevDevices => [...prevDevices, input]);
    }
  };

  const onMIDIFailure = () => {
    console.log('Could not access your MIDI devices.');
  };

  // Populate midiDevices when component mounts
  useEffect(() => {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }, []);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handlePlay} disabled={isPlaying}>
        Play
      </Button>
      <Select
        labelId="instrument-select-label"
        id="instrument-select"
        value={selectedInstrument}
        label="Select Instrument"
        onChange={handleInstrumentChange}
        disabled={!isPlaying}
      >
        {/* Map over your midiDevices here to create MenuItems */}
        {midiDevices.map((device, index) => 
          <MenuItem value={device.id} key={index}>{device.name}</MenuItem>
        )}
      </Select>
    </div>
  );
}

export default ControlPanel;