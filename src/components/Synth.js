import React, { useEffect } from 'react';
import * as Tone from 'tone';

function PolySynth() {
    useEffect(() => {
        // create a polysynth
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        // set the attributes across all voices
        synth.set({ "detune": -1200 });

        // play a chord
        synth.triggerAttackRelease(["C4", "E4", "A4"], 1);
    }, []);

    return (
        <div>
            <h2>PolySynth Example</h2>
        </div>
    );
}

export default PolySynth;