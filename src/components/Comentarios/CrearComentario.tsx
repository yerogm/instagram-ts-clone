import { faFaceSmile, faHeart } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import {
    InstagramComment,
    InstagramPost,
} from "../InstagramPostForm/InstagramPostForm";
import { db } from "../firebaseConfig/firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiPicker, { Theme } from "emoji-picker-react";
import "./styles.scss";
import moment from "moment";
import "moment/locale/es";
import { log } from "console";

const fakeUsers = [
    {
        name: "Lionel Messi",
        image: "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2023/06/07/3855046-1689079275.jpeg?itok=V-U2WnLJ",
    },
    {
        name: "Cristiano Ronaldo",
        image: "https://estaticos-cdn.sport.es/clip/65f4f6d7-dab4-480e-868c-044e66cf3f92_alta-libre-aspect-ratio_default_0.jpg",
    },
    {
        name: "Sergio Ramos",
        image: "https://image-service.onefootball.com/transform?w=280&h=210&dpr=2&image=https%3A%2F%2Fsantafedeportivo.com%2Fwp-content%2Fuploads%2F2023%2F07%2FSergio-Ramos.jpg",
    },
    {
        name: "Spott",
        image: "https://png.pngtree.com/png-clipart/20220604/original/pngtree-realistic-head-of-jack-russel-terrier-dog-png-image_7935280.png",
    },
    {
        name: "Elon Musk",
        image: "data:image/jpeg;base64,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",
    },
    {
        name: "Mark Zuck",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    },
    {
        name: "R.Oppenheimer",
        image: "https://phantom-marca.unidadeditorial.es/2e13fe52f5d15d95a8f8817c0f00adbf/resize/828/f/jpg/assets/multimedia/imagenes/2023/07/17/16895875357151.jpg",
    },
    {
        name: "Neymar Jr",
        image: "https://www.bitbol.la/files/image/54/54127/6393f592821bf_360_480!.webp?s=82691eaf1169bca83d15edad58a30279&d=1670643104&oe=jpg",
    },
    {
        name: "La Rubia",
        image: "https://s.yimg.com/ny/api/res/1.2/F3o.8qikzG_5nisfdiXV3Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MA--/https://s.yimg.com/os/creatr-uploaded-images/2022-08/4699be10-306e-11ed-bfad-2ce84759aafe",
    },
    {
        name: "Thomas",
        image: "https://images.milanuncios.com/api/v1/ma-ad-media-pro/images/449778b0-eebb-4248-856e-5f5bc21768de?rule=hw396_70",
    },
];

export interface CrearComentarioProps {
    post: InstagramPost;
    onCreate: (post: InstagramPost) => void;
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max) + 1;
}

const CrearComentario = (props: CrearComentarioProps) => {
    moment.locale("es");
    const [comentario, setComentario] = useState<InstagramComment>({
        user: "",
        description: "",
        image: "",
    });
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [post, setPost] = useState(props.post);
    const [showEmojis, setShowEmojis] = useState(false);

    const emojiBtnRef = useRef<any>();

    const addNewComment = async () => {
        const post = props.post;
        const postDoc = doc(db, "instagram", post.id);

        let comments = props.post.comments ?? [];

        let indexUser = getRandomInt(fakeUsers.length - 1);
        let fakeUser = fakeUsers[indexUser];

        console.log("SELECTED INDEX: ", indexUser);
        if (fakeUser) {
            comentario.user = fakeUser.name;
            comentario.image = fakeUser.image;
        }

        comments.push(comentario); 
        let postActualizado = { ...props.post, comments };

        await updateDoc(postDoc, postActualizado);

        props.onCreate(postActualizado);
    };
    const addLike = async () => {
        const postDoc = doc(db, "instagram", post.id);
        const currentLikes = (post.likes ?? 0) + 1;
        const postActualizado = { ...post, likes: currentLikes };
        setPost(postActualizado);
        await updateDoc(postDoc, postActualizado);
    };

    const addLikeComment = async () => {
        const postDoc = doc(db, "instagram", post.id);
        const currentLikes = (post.likeComment ?? 0) + 1;
        const postActualizado = { ...post, likeComment: currentLikes };
        setPost(postActualizado);
        await updateDoc(postDoc, postActualizado);
    };

    // const LikeIndependiente = ()=>{
    //     const numberLikes = post.likeComment

        
    // }
    return (
        <div className="contenedor-principal">
            <div className="contenedor-imagen-post">
                <img
                    src={post.image}
                    alt=""
                    onDoubleClick={() => {
                        addLike();
                    }}
                />
            </div>

            <div className="contenedor-derecho">
                <div className="perfil-usuario-header">
                    <div className="contenedor-image-user">
                        <img
                            src={post.imgUser}
                            alt=""
                            width="30px"
                            height="25px"
                        />
                    </div>
                    <div className="flex-col gap-3">
                        <span>{post.user}</span>
                        <span className="text-small">Ciudad Name</span>
                    </div>
                </div>

                <div className="panel-comentarios">
                    <div className="contenedor-comentario">
                        <div className="imagen-comentario">
                            <img
                                src={post.imgUser}
                                alt=""
                                width="40px"
                                height="40px"
                            />
                        </div>
                        <span>
                            <strong>{post.user} </strong>
                            <span>{post.description}</span>
                        </span>
                    </div>
                    {post.comments?.map((item) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div className="contenedor-comentario">
                                    <div className="imagen-comentario">
                                        <img
                                            src={item.image}
                                            alt=""
                                            width="40px"
                                            height="40px"
                                        />
                                    </div>
                                    <span style={{ fontSize: "14px" }}>
                                        <strong style={{ fontSize: "14px" }}>
                                            {item.user}{" "}
                                        </strong>
                                        {item.description}
                                    </span>
                                    <span
                                        style={{
                                            color:
                                                post.likeComment > 0
                                                    ? "red"
                                                    : "white",
                                            fontSize: "12px",
                                            marginLeft: "auto",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            addLikeComment();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faHeart} />
                                    </span>
                                </div>
                                <div className="commentDate">
                                    <span className="post-date">
                                        {moment(post.fecha)
                                            .locale("es")
                                            .fromNow()}
                                    </span>
                                    <p className="number-likes">
                                        {post.likeComment} Me Gusta
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="seccion-crear-comentario">
                    <div style={{ margin: "0" }}>
                        <div className="flex">
                            <span
                                style={{
                                    color: post.likes > 0 ? "red" : "white",
                                }}
                                // className="clickLikes"
                                onClick={() => {
                                    addLike();
                                }}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </span>

                            <span onClick={() => setShowCommentModal(true)}>
                                💬
                            </span>
                        </div>
                        <div>
                            <p>{post.likes} Me Gustas </p>
                        </div>
                        <span
                            className="post-date"
                            style={{ color: "#a8a8a8", fontSize: "13px" }}
                        >
                            {moment(post.fecha).locale("es").fromNow()}
                        </span>
                    </div>

                    <div className="contenedorFormulario">
                        <div
                            style={{
                                display: showEmojis ? "block" : "none",
                                position: "fixed",
                            }}
                        >
                            <EmojiPicker
                                theme={Theme.DARK}
                                searchDisabled
                                autoFocusSearch={false}
                                onEmojiClick={(value) => {
                                    setShowEmojis(false);
                                    setComentario({
                                        ...comentario,
                                        description:
                                            comentario.description +
                                            value.emoji,
                                    });
                                }}
                            />
                        </div>
                        <span
                            ref={emojiBtnRef}
                            style={{ color: "white" }}
                            onClick={() => {
                                setShowEmojis(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faFaceSmile} />
                        </span>
                        <input
                            type="text"
                            value={comentario.description}
                            placeholder="Haz un comentario sobre esta publicacion"
                            onChange={(e) => {
                                setComentario({
                                    ...comentario,
                                    description: e.target.value,
                                });
                            }}
                        />

                        <p
                            onClick={addNewComment}
                            style={{ cursor: "pointer", color: "#0095f6" }}
                        >
                            Publicar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearComentario;
