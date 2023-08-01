import React from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
    show: boolean;
    setShow: (value: boolean) => void;
    children: React.ReactNode;
    title: string;
    ocultarHeader?: boolean;
}

export default function Modal(props: ModalProps) {
    return (
        <div className={`modal-container ${props.show ? "show" : ""}`}>
            <div className="modal-body">
                {!props.ocultarHeader && (
                    <div className="modal-header">
                        <span className="modal-title">{props.title}</span>

                        <button
                            className="btn-close"
                            onClick={() => props.setShow(false)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                )}
                {props.children}
            </div>

            <div
                className="modal-background"
                onClick={() => props.setShow(false)}
            />
        </div>
    );
}
