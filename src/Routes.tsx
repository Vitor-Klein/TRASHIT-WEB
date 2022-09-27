import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Home from './pages/Home/Home'
import SignIn from './pages/Login/Login'
import SignUp from './pages/Register/Register'
import Points from './pages/Points/Points'
import CreatePoint from './pages/CreatePoint/CreatePoint'

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/pontos" element={<Points />} />
        <Route path="/createPoint" element={<CreatePoint />} />
      </Routes>
    </Router>
  )
}