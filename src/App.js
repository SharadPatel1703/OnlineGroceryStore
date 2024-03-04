import './App.css';
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExistingUser from "./ExistingUser";
import NewUser from "./NewUser";
import Buttons from "./Buttons";
import Display from "./Display";
import Cart from "./DisplayComponents/Cart";
import EndPage from "./DisplayComponents/EndPage";

function App() {
    return (
        <Router>
            <>
                <Navbar name="Zee's Mart" />
                <Routes>
                    <Route path="/" element={<Buttons/>}/>
                </Routes>

                    <Routes>
                        <Route path="/exist" element={<ExistingUser />} />
                        <Route path="/NewUser" element={<NewUser />} />
                    </Routes>

                <Routes>
                    <Route path="/Display" element={<Display/>}/>
                </Routes>
                <Routes>
                    <Route path="/Cart" element={<Cart/>}/>
                </Routes>
                <Routes>
                    <Route path="/EndPage" element={<EndPage/>}/>
                </Routes>
            </>
        </Router>

    );
}

export default App;
