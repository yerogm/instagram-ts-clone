import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
    default as CrearCuenta,
    default as CrearPublicacion,
    InstagramPost,
} from "./components/InstagramPostForm/InstagramPostForm";
import PaginaPrincipal from "./components/InstagramPosts/InstagramPostList";
import CrearComentario, {
    CrearComentarioProps,
} from "./components/Comentarios/CrearComentario";
import { useState } from "react";

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
