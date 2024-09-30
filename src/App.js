import React, { useEffect, useRef } from 'react';
import VirtualClock from 'virtual-clock';

import './App.css';

let clock;

let clockDisplay = null;

function pad(timeNumber) {
	return `${timeNumber}`.padStart(2, '0');
}

function componentDidMount(props) {
	// document.body.classList.add('container');

	// const type = document.getElementById('type');
	// type.value = 'data:image/png;base64,';

	clock = new VirtualClock();

	clock.minimum = 0;
	clock.maximum = 1000;
	clock.loop = true;

	clock.time = (new Date()).getMilliseconds();

	clock.start();

	clock.alwaysAt(0, () => {
		const date = new Date();

		const seconds = date.getSeconds();

		// if seconds is between 0 and 15 or between 30 and 45, then set the class to 'stop', else to 'go'
		if (((seconds >= 0) && (seconds < 15)) || ((seconds >= 30) && (seconds < 45))) {
			clockDisplay.classList.add('stop');
			clockDisplay.classList.remove('go');
		} else {
			clockDisplay.classList.add('go');
			clockDisplay.classList.remove('stop');
		}

		clockDisplay.textContent = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(seconds)}`;
	});
}

function App(props) {

	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props);
		}
	});

	return <code className="clock_display" ref={ref => { if (ref) { clockDisplay = ref; } }}>12:34:56</code>;
}

export default App;
