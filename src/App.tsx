import { BrowserRouter, Route, Routes } from "react-router-dom";
import { default as CrearCuenta, default as CrearPublicacion } from "./components/InstagramPostForm/InstagramPostForm";
import PaginaPrincipal from "./components/InstagramPosts/InstagramPostList";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PaginaPrincipal />} />
                    <Route
                        path="/publicaciones"
                        element={<CrearPublicacion />}
                    />
                    <Route path="/crearCuenta" element={<CrearCuenta />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
