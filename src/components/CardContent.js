import React from 'react';
import Toolcard from './Toolcard';
import { withRouter } from 'react-router-dom';

const CompositionTitle = props => {
	const { onclick, comp, history } = props;

	const handleClick = props => {
		onclick(props);
		history.push(`play/${comp.id}`);
	}

	return (
		<Toolcard direction='top' render={ (props) => (
				<div className='comp-modal'>
					<h3>{comp.title}</h3>					
					<p>{comp.description}</p>
					<button onClick={() => handleClick(comp)} style={{ padding: '5px 10px' }}>Play</button>
				</div>
			) }>
			<span>{comp.title}</span>
		</Toolcard>
	)
}

const CompositionTitleWithRouter = withRouter(CompositionTitle);

const CardContent = props => {
	const { event, onCompClick} = props;

	return (
		<div className='event-card'>
			<h1>{event.title}</h1>
			<p>{event.body}</p>
			{ event.compositions ? <span>compositions :</span> : null }
			{ 
				event.compositions ? (
					<div className='compositions'>
						{
							event.compositions.map(comp => (
								<CompositionTitleWithRouter key={comp.id} comp={comp} onclick={onCompClick} />
							))
						}
					</div>
				) 
				: null
			}
		</div>
	)
}

export default CardContent;