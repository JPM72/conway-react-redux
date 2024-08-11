import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './model/pure'

function App()
{
	return (<div></div>)
}

const root = createRoot(document.getElementById('root'))
root.render(
	<StrictMode>
		<App />
	</StrictMode>
)