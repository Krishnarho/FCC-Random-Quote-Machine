import { useState, useEffect } from 'react'
import './App.css'

function App() {
	const [quotes, setQuotes] = useState([]);
	const [randomQuote, setRandomQuote] = useState("");
	const [color, setColor] = useState("#000");
	const colors = ['#34D399', '#F87171', '#60A5FA', '#FBBF24', '#A78BFA', '#F472B6', '#10B981'];


	useEffect(() => {
		async function fetchData() {
			const response = await fetch("https://type.fit/api/quotes");
			const data = await response.json();
			setQuotes(data);
			let quoteIndex = randomIndex(data);
			setRandomQuote(data[quoteIndex]);
		}
		fetchData();
	}, [])

	function randomIndex(arr) {
		return Math.floor(Math.random() * arr.length);
	}

	function randomQuotes() {
		let quoteIndex = randomIndex(quotes)
		setRandomQuote(quotes[quoteIndex]);
		let colorIndex = randomIndex(colors)
		setColor(colors[colorIndex]);
	}

	return (
		<div className='main' style={{ backgroundColor: color }}>
			<div id='quote-box'>
				{randomQuote ?
					<>
						<div className='content'>
							<p
								id='text'
								style={{ color }}
							> <i class="fa-solid fa-quote-left"></i> {randomQuote.text} <i class="fa-solid fa-quote-right"></i></p>
							<p
								id="author"
								style={{ color }}
							>-{randomQuote.author}</p>
						</div>
						<div className='actions'>
							<div className='social'>
								<a
									href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${randomQuote}`}
									id="tweet-quote" style={{ backgroundColor: color }}
									target="_blank"
								><i className="fa-brands fa-twitter"></i></a>
							</div>
							<button
								id="new-quote"
								style={{ backgroundColor: color }}
								onClick={randomQuotes}
							>New quote</button>
						</div>
					</>
					:
					<h2>Loading</h2>
				}

			</div>
		</div >
	)
}

export default App
