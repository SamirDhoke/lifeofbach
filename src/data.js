const data = [];

const compEvents = [4, 8, 12, 14];

Array(17).fill(0).map((_, idx) => {
	const content = {
		id: idx + 1,
		title: `Slide No. ${idx + 1}`,
		body: 'Lorem ipsum irure officia exercitation elit qui irure fugiat ut in duis dolore commodo incididunt aliquip aute commodo officia aliquip non laboris dolor culpa ex laborum id in sit proident amet fugiat eiusmod ea amet laborum ut consequat deserunt.'	
	};

	if (compEvents.includes(idx)) {
		// add song data as well
		content.compositions = [{
			id: 100 * idx,
			title: 'Incididunt occaecat duis amet cupidatat.',
			url: 'someurl',
			description: 'Do deserunt ut ex nisi culpa laborum ex esse minim sit pariatur ut laboris dolor amet reprehenderit laborum in tempor eiusmod laborum excepteur in duis velit elit in fugiat mollit mollit quis ut amet.'
		}]
	}

	data.push(content);
});

export default data;