


function init() {
	let App = require('./views').default;
	let elem = render(<App/>, document.getElementById('root'), elem);
}

init();


const Home = () => (
	<div class={style.home}>
		<h1>Index</h1>
		<p>This is the Home component.</p>
	</div>
);

export default render(Index);

