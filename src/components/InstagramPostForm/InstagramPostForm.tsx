import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig/firebase";
import "./styles.scss";
import moment from "moment";

export interface InstagramPost {
    id: string;
    description: string;
    image: string;
    user: string;
    imgUser: string;
    likes: number;
    fecha: string;
    comments?: InstagramComment[];
    likeComment: number;
}

export interface InstagramComment {
    image: string;
    user: string;
    description: string;
}

const InstagramPostForm = () => {
    const [publicacion, setPublicacion] = useState<InstagramPost>({
        user: "",
        description: "",
        id: "",
        image: "",
        imgUser: "",
        likes: 0,
        fecha: moment().format(),
        likeComment: 0,
    });
    const instagramCollection = collection(db, "instagram");

    const crearPublicacion = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        await addDoc(instagramCollection, publicacion);
    };

    return (
        <div>
            <div>
                <div>
                    <div className="contenedor">
                        <input
                            type="text"
                            placeholder="ingresa la URL de la imagen de usuario"
                            onChange={(e) =>
                                setPublicacion({
                                    ...publicacion,
                                    imgUser: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="ingresa el nombre del usuario"
                            onChange={(e) =>
                                setPublicacion({
                                    ...publicacion,
                                    user: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="ingresa la URL de la imagen"
                            onChange={(e) =>
                                setPublicacion({
                                    ...publicacion,
                                    image: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="ingresa la descripcion de la publicacion"
                            onChange={(e) =>
                                setPublicacion({
                                    ...publicacion,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                    <form onSubmit={crearPublicacion} className="btn-crear">
                        <button type="submit">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InstagramPostForm;
