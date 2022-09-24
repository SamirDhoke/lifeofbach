import React from 'react';
import Keyboard from './components/Keyboard';
import { 
	Carousel, 
	Wrapper, 
	Card 
} from './components/CardCarousal';
import CardContent from './components/CardContent';
import { Switch, Route } from 'react-router-dom';
import {
	FastForwardIcon,
	RewindIcon,
	PlayIcon,
	PauseIcon,
	StopIcon
} from '@heroicons/react/outline';

import data from './data';

import './App.css';

const CarouselContainer = props => {
	const {keyPressed, handleCompositionPlaying} = props;

	return (
		<div className='carousal-container'>				
			<Carousel selected={ keyPressed }>
				<Wrapper>
					{
						data.map((event) => (
							<Card key={event.id}>
								<CardContent
									key={event.id}
									event={event}
									onCompClick={handleCompositionPlaying}
								/>				
							</Card>
						))
					}
				</Wrapper>
			</Carousel>
		</div>
	)
}

const PlaceholderComp = props => {
	const {comp} = props;

	return (

		<div className='player'>
			<div className='meta'>
				<h2>{comp.title}</h2>
				<p>{comp.description}</p>
			</div>
			<div className='seek'>
				<div className='line'>
					<span className='pointer'></span>
				</div>
			</div>
			<div className='controls'>
				<div className='btn backward'>
					<span><RewindIcon /></span>
				</div>
				<div className='btn play-pause'>
					<span><PlayIcon /></span>
				</div>
				<div className='btn stop'>
					<span><StopIcon /></span>
				</div>
				<div className='btn forward'>
					<span><FastForwardIcon /></span>
				</div>
			</div>
		</div>

	)
}

const App = (props) => {

	const [keyPressed, setKeyPressed] = React.useState(null);
	const [activeComp, setActiveComp] = React.useState(null);
	const [note, setNote] = React.useState(0);

	const handleNotePlaying = (midiNumber) => {
		const keyFromStart = Math.abs(48 - midiNumber) + 1;
		
		if (keyFromStart > 13) {
			return;
		}

		// setNote(midiNumber)
		// setKeyPressed(keyFromStart);		
		// console.log('Playing note', keyFromStart);
		MIDI.noteOn(0, midiNumber, 127, 0);
		MIDI.noteOff(0, midiNumber, 0 + 0.75);
	}

	const handleCompositionPlaying = comp => {
		setActiveComp(comp);
	}

	React.useEffect(() => {
		MIDI.loadPlugin({
			soundfontUrl: 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/',
			instrument: 'acoustic_grand_piano',
			onsuccess: function () {				
				var delay = 0; // play one note every quarter second
				var note = 50; // the MIDI note
				var velocity = 127; // how hard the note hits
				// play the note
				MIDI.setVolume(0, 127);
				MIDI.noteOn(0, note, velocity, delay);
				MIDI.noteOff(0, note, delay + 0.75);
			}
		})
	}, [])

	return (
		<div className="App">
			<h1>The life of bach</h1>
			<div className='keyboard-container'>
				<Keyboard width={400} onPlayNote={handleNotePlaying}/>
			</div>
			<Switch>
				<Route path='/play/:comp'>
					<PlaceholderComp comp={activeComp}/>
				</Route>
				<Route path='/'>
					<CarouselContainer
						keyPressed={keyPressed}
						handleCompositionPlaying={handleCompositionPlaying}
					/>
				</Route>
			</Switch>			
		</div>
	)
}

export default App;