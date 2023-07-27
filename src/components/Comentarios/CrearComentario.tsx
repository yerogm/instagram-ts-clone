import React, { useState } from "react";
import "./styles.scss";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { InstagramPost } from "../InstagramPostForm/InstagramPostForm";

interface InstagramComment {
    id: string;
    description: string;
}
const CrearComentario = () => {
    const [comentario, setComentario] = useState<InstagramComment>({
        id: "",
        description: "",
    });
    const comentariosCollection = collection(db, "comentarios");
    const addNewComment = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        await addDoc(comentariosCollection, comentario);
    };

    console.log(comentariosCollection, "DEBERIA VERSE EL COMMENT");
    
    return (
        <div>
            <form action="" onSubmit={addNewComment}>
                <div className="contenedor1">
                    <input
                        type="text"
                        placeholder="Haz un comentario sobre esta publicacion"
                        onChange={(e) => {
                            setComentario({
                                ...comentario,
                                description: e.target.value,
                            });
                        }}
                    />
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default CrearComentario;
