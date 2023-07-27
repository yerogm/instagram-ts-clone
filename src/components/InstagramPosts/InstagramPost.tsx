import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import CrearComentario from "../Comentarios/CrearComentario";
import { InstagramPost } from "../InstagramPostForm/InstagramPostForm";
import Modal from "../Modal";
import { db } from "../firebaseConfig/firebase";
import moment from "moment";
moment.locale("es");

interface InstagramPostCardProps {
    post: InstagramPost;
    onDeletePost: () => void;
}

export default function InstagramPostCard(props: InstagramPostCardProps) {
    const [post, setPost] = useState(props.post);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const eliminarPublicacion = async (id: string) => {
        const InstagramDoc = doc(db, "instagram", id);
        await deleteDoc(InstagramDoc);
        props.onDeletePost();
    };

    const addLike = async () => {
        const postDoc = doc(db, "instagram", post.id);
        const currentLikes = (post.likes ?? 0) + 1;
        const postActualizado = { ...post, likes: currentLikes };
        setPost(postActualizado);
        await updateDoc(postDoc, postActualizado);
    };

    return (
        <div>
            <Modal
                title="Crear Comentario"
                show={showCommentModal}
                setShow={setShowCommentModal}
            >
                <CrearComentario />
            </Modal>
            <div className="publicacion">
                <div className="barra-publi">
                    <div className="barra-perfil">
                        <img
                            src={post.imgUser}
                            alt=""
                            width="30px"
                            height="25px"
                        />

                        <h3>{post.user}</h3>
                        <span className="post-date">
                            {moment(post.fecha).locale("es").fromNow()}
                        </span>
                    </div>

                    <div>
                        <button
                            onClick={() => {
                                eliminarPublicacion(post.id);
                            }}
                            className="eliminar"
                        >
                            X
                        </button>
                    </div>
                </div>
                <div className="post">
                    <img
                        src={post.image}
                        alt=""
                        width="500px"
                        height="500px"
                        onDoubleClick={() => {
                            addLike();
                        }}
                    />
                    <div className="comment">
                        <p
                            style={{ color: post.likes > 0 ? "red" : "white" }}
                            className="clickLikes"
                            onClick={() => {
                                addLike();
                            }}
                        >
                            <FontAwesomeIcon icon={faHeart} />
                        </p>

                        <p onClick={() => setShowCommentModal(true)}>💬</p>
                    </div>
                    <p>{post.likes} Me Gustas</p>
                    <span style={{ fontSize: "18px" }}>{post.description}</span>
                </div>
            </div>
        </div>
    );
}
