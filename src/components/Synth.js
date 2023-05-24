import * as Tone from 'tone';

const synth = new Tone.Synth().toDestination();

// In your MIDI event handler
synth.triggerAttackRelease('C4', '8n');