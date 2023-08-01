import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
import CrearComentario from "../Comentarios/CrearComentario";
import { InstagramPost } from "../InstagramPostForm/InstagramPostForm";

import { db } from "../firebaseConfig/firebase";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import 'moment/locale/es'
moment.locale("es");

export interface InstagramPostCardProps {
    post: InstagramPost;
    onDeletePost: () => void;
}

export default function InstagramPostCard(props: InstagramPostCardProps) {
    moment.locale('es');

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

    console.log("POST WITH COMMENTS: ", post);

    return (
        <div>
            <Modal
                title="Crear Comentario"
                show={showCommentModal}
                ocultarHeader
                setShow={setShowCommentModal}
            >
                <CrearComentario
                    post={post}
                    onCreate={(value) => {
                        setShowCommentModal(false);
                        setPost(value);
                    }}
                />
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

                    <div className="eliminar">
                        <button
                            onClick={() => {
                                eliminarPublicacion(post.id);
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>
                <div className="post post-2">
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
                    <p>{post.likes} Me Gustas </p>
                    <span style={{ fontSize: "18px" }}>{post.description}</span>
                    <p>Ver Los {post.comments?.length} Comentarios</p>
                </div>
            </div>
        </div>
    );
}
