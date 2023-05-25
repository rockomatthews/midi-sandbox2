import MidiHandler from './MidiHandler';
import FirstSynth from './Synth';

const ControlPanel = () => {
  return (
    <div>
      <MidiHandler synth={FirstSynth} />
    </div>
  );
};

export default ControlPanel;