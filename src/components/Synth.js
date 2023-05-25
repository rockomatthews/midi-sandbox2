import { Component } from 'react';
import * as Tone from 'tone';

class PolySynth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      synth: new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          partials: [0, 2, 3, 4],
        },
      }),
    };
  }

  render() {
    return (
      <div>
        <piano
          parent={document.querySelector("#content")}
          polyphonic={true}
          noteon={note => this.state.synth.triggerAttack(note.name)}
          noteoff={note => this.state.synth.triggerRelease(note.name)}
        />
        <ui
          tone={this.state.synth}
          parent={document.querySelector("#content")}
        />
      </div>
    );
  }
}

export default PolySynth;