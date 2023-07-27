import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstagramPostCard from "./InstagramPost";
import { db } from "../firebaseConfig/firebase";
import "./styles.scss";
import InstagramPostForm, {
    InstagramPost,
} from "../InstagramPostForm/InstagramPostForm";
import Modal from "../Modal";

const PaginaPrincipal = () => {
    const [instagramItems, setInstagramItems] = useState<InstagramPost[]>([]);
    const instagramCollection = collection(db, "instagram");

    const [modalShow, setModalShow] = useState(false);

    const fetchInstagramPost = async () => {
        getDocs(instagramCollection);
        const data = await getDocs(instagramCollection);
        const values = data.docs.map((doc) => ({
            ...(doc.data() as InstagramPost), // Asegura el tipado de la noticia
            id: doc.id,
        }));
        setInstagramItems(values);
    };

    useEffect(() => {
        fetchInstagramPost();
    }, []);

    return (
        <div className="div-padre">
            <Modal title="Crear Post" show={modalShow} setShow={setModalShow}>
                <InstagramPostForm />
            </Modal>
            <div className="barra-ig">
                <div className="logo-ig">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ-WnNJYnTo9KxO4_z8Sqx5oS7MZBD5mCf8Q&usqp=CAU"
                        width={50}
                        alt=""
                    />
                    <p style={{ fontSize: "20px" }}>𝒾𝓃𝓈𝓉𝒶𝑔𝓇𝒶𝓂</p>
                </div>
                <button
                    onClick={() => {
                        setModalShow(true);
                    }}
                    className="btn-crear"
                >
                    +
                </button>
            </div>
            {instagramItems.map((post) => (
                <InstagramPostCard
                    post={post}
                    onDeletePost={() => {
                        // cargar todos los post
                        fetchInstagramPost();
                    }}
                />
            ))}
        </div>
    );
};

export default PaginaPrincipal;
