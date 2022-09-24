import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import { withRouter } from 'react-router-dom'; 
import 'react-piano/dist/styles.css';

const Keyboard = ({width=800, ...props}) => {

	const [state, setState] = React.useState({
		range: {
			first: 'c3',
			last: 'c4'
		},
		isExpanded: false
	});

	const firstNote = MidiNumbers.fromNote(state.range.first);
	const lastNote = MidiNumbers.fromNote(state.range.last);

	React.useEffect(() => {
		
		const haveToExpand = props.location.pathname.startsWith('/play');
		const haveToContract = ! haveToExpand;

		const isExpanded = state.isExpanded;
		const isContracted = ! isExpanded;

		// console.log('INSIDE KEYBOARD COMPONENT', props);
		if ( haveToExpand && isContracted ) {
			// expand under these conditions only.
			setState({
				...state,
				isExpanded: true,
				range: {
					...state.range,
					last: 'c5'
				}
			});
			
			return;
		}

		if ( haveToContract && isExpanded ) {
			setState({
				...state,
				isExpanded: false,
				range: {
					...state.range,
					last: 'c4'
				}
			});

			return;
		}

	}, [props.location])

	const keyboardShortcuts = KeyboardShortcuts.create({
		firstNote,
		lastNote,
		keyboardConfig: KeyboardShortcuts.HOME_ROW
	});

	return (
		<Piano
			noteRange={{ first: firstNote, last: lastNote }}

			playNote={(midiNumber) => {}}
			stopNote={(midiNumber) => {}}

			keyboardShortcuts={keyboardShortcuts}
			width={state.isExpanded ? 600 : width}
			
			onPlayNoteInput={props.onPlayNote}

			renderNoteLabel={({ keyboardShortcut, midiNumber, isActive, isAccidental }) => {
				return (
					<div className={`ReactPiano__NoteLabel ${isAccidental ? 'ReactPiano__NoteLabel--accidental' : ''}`}>
						{midiNumber}
					</div>
				)
			}}
		/>
	)
}

export default withRouter(Keyboard);