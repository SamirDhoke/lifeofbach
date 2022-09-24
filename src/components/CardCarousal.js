import React, { createContext } from 'react';
import './CardCarousal.styles.css';

const events = [
	{
		id: 1,
		title: 'Officia in tempor enim nostrud reprehenderit ad dolore reprehenderit eu quis proident nulla ea in irure eu reprehenderit anim.',
		image: 'https://picsum.photos/400/200'
	},
	{
		id: 2,
		title: 'Officia in tempor enim nostrud reprehenderit ad dolore reprehenderit eu quis proident nulla ea in irure eu reprehenderit anim.',
		image: 'https://picsum.photos/400/200'
	},
	{
		id: 3,
		title: 'Officia in tempor enim nostrud reprehenderit ad dolore reprehenderit eu quis proident nulla ea in irure eu reprehenderit anim.',
		image: 'https://picsum.photos/400/200'
	}
]

const DataContext = createContext();

export const Card = ({children, id, ...props}) => {
	return (
		<div className='card-container'>
			<div className='card'>
				{children}
			</div>
		</div>
	);
}

export const Wrapper = ({children, ...props}) => {
	return (
		<DataContext.Consumer>
			{ 
				value => (
					<div className='wrapper' style={{ transform: `translateX(-${value.index * 100}%)` }}>		
						{children}
					</div>
				)				
			}
		</DataContext.Consumer>
	)
}

export const Carousel = ({children, ...props}) => {
	const [index, setIndex] = React.useState(0);
	// console.log('CURRENT INDEX', index);

	React.useEffect(() => {
		
		if (!props.selected) {
			return;
		}

		if ((props.selected - 1) !== index) {
			setIndex(props.selected - 1);
		}

	}, [props.selected])

	// const infiniteSlide = () => {
	// 	setIndex(prev => {
	// 		if (prev === events.length - 1) {
	// 			return 0;
	// 		} else {
	// 			return prev + 1;
	// 		}
	// 	});
	// }

	// React.useEffect(() => {

	// 	const interval = setInterval(infiniteSlide, 3000);
	// 	return () => removeInterval(interval)

	// }, [])

	return (
		<div className='caraousel'>
			<DataContext.Provider value={{ index }}>
				{children}
			</DataContext.Provider>
		</div>
	)
}

const CardCarousal = props => {

	const [selected, setSelected] = React.useState(0);


	return (
		<div>
			<Carousel selected={selected}>
				<Wrapper>
					{
						events.map(event => (
								<Card key={event.id}>
									<div>
										<img
											src={event.image}
											alt='event image'
										/>
									</div>
									<div>
										<h4>item no {event.id}</h4>
										<p>{event.title}</p>
									</div>
								</Card>
							)
						)
					}
				</Wrapper>
			</Carousel>
			<div className='indicators'>
				{
					events.map(event => (
						<button key={event.id} onClick={(e) => setSelected(event.id)}>{event.id}</button>
					))
				}
			</div>
		</div>
	);
}

export default CardCarousal;