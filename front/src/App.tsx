import { Route, Routes } from 'react-router';
import Home from './pages/Home'
// import About from './pages/About'
// import Blog from './pages/Blog'

function App() {
    return (
        <Routes>
            <Route index element={<Home />} />
        </Routes>

    )
}

export default App