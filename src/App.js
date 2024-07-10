
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import DetailPage from './pages/Detail';
import OrdersPage from './pages/ViewOrder';
//css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//components
import MyNavBar from './components/Navbar';
import {Routes,Route} from 'react-router-dom';
import ListingPage from './pages/List';
import HomePage from './pages/Home';
function App() {
  return <div>
    <MyNavBar />
      <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/book/list" element={<ListingPage/>}/>
            <Route path="/book/view/:bookId" element={<DetailPage/>}/>
            <Route path="/book/orders" element={<DetailPage/>}/>
      </Routes>
  </div>
}

export default App;
