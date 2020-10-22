import render from 'preact-render-to-string';
import { h } from 'preact';
import style from './style/style.css';
import './index.sass';



function init() {
	let App = require('./views').default;
	let elem = render(<App/>, document.getElementById('root'), elem);
}

init();


// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV === 'production') {
	// cache all assets if browser supports serviceworker
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		navigator.serviceWorker.register('/sw.js');
	}
	// add Google Analytics
} else {
	// use preact's devtools
	require('preact/devtools');
	// listen for HMR
	// in development, set up HMR:
	if (module.hot) {
		//module.hot.accept('./views', init);
		//require('preact/devtools');   // turn this on if you want to enable React DevTools!
		module.hot.accept('/views', () => requestAnimationFrame(init) );
	}
}
const Home = () => (
	<div class={style.home}>
		<h1>Index</h1>
		<p>This is the Home component.</p>
	</div>
);

export default render(Index);

