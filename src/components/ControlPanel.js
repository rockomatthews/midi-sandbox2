// ControlPanel.js
import { useState, useEffect } from 'react';
import { Button, Select, MenuItem } from '@mui/joy';
import * as Tone from 'tone';
import Synth from './Synth';

const ControlPanel = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [midiDevices, setMidiDevices] = useState([]);

  const handlePlay = () => {
    console.log("Start button clicked"); // Add logging here
    Tone.start();
    setIsPlaying(true);
  };

  const handleInstrumentChange = (event) => {
    if(event && event.target){
      console.log("Instrument selected:", event.target.value); // Add logging here
      setSelectedInstrument(event.target.value);
    }
  };

  const onMIDISuccess = (midiAccess) => {
    for (let input of midiAccess.inputs.values()) {
      console.log(`Found MIDI device: ${input.name}`);
      setMidiDevices(prevDevices => [...prevDevices, input]);
    }
  };

  const onMIDIFailure = () => {
    console.log('Could not access your MIDI devices.');
  };

  useEffect(() => {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    document.addEventListener('click', () => Tone.start());
  }, []);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handlePlay} disabled={isPlaying}>
        Play
      </Button>
      <Select
        id="instrument-select"
        value={selectedInstrument}
        onChange={handleInstrumentChange}
        disabled={!isPlaying}
      >
        {midiDevices.map((device, index) => 
          <MenuItem value={device.name} key={index}>{device.name}</MenuItem>
        )}
      </Select>
      <Synth midiDevice={midiDevices.find(device => device.name === selectedInstrument)} />
    </div>
  );
}

export default ControlPanel;
