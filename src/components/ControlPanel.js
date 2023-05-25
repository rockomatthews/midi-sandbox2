import MidiHandler from './MidiHandler';
import Synth from './Synth';

const ControlPanel = () => {
  return (
    <div>
      <MidiHandler synth={Synth} />
    </div>
  );
};

export default ControlPanel;