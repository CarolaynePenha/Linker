import { useContext, useEffect, useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import Modal from "react-modal";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "../context/TokenContext";
import LoadingRing from "./LoadingRing";

export default function Share({ post, setUpdatePosts, updatePosts, loading }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (!loading) {
      setLoadingState(false);
      closeModal();
    }
  }, [loading]);
  async function rePost(e) {
    e?.preventDefault();
    setLoadingState(true);
    const postId = post.id;
    const URL = process.env.REACT_APP_API_URL + `/repost/${postId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(URL, "", config);
      setUpdatePosts(!updatePosts);
    } catch (err) {
      console.log(err.response);
      alert("Houve um erro ao publicar seu link!");
      setLoadingState(false);
      closeModal();
    }
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <DivShare>
        <IoIosShareAlt size={20} color="white" onClick={openModal} />
        <p>{post.countRePost}</p>
      </DivShare>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {loadingState ? (
          <LoadingRing />
        ) : (
          <DivModal>
            <p>Tem certeza que deseja repostar esse post?</p>
            <form onSubmit={rePost}>
              <button className="cancel" onClick={closeModal}>
                Não,cancelar
              </button>
              <button className="confirm" type="submit">
                Sim, repostar
              </button>
            </form>
          </DivModal>
        )}
      </Modal>
    </>
  );
}

// --------------------css

const DivShare = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const customStyles = {
  content: {
    backgroundColor: "#272330",
    borderRadius: "20px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const DivModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 25px;
    color: white;
  }
  button {
    height: 25px;
    border-radius: 10px;
  }
  .confirm {
    background-color: #2a928e;
    border: none;
    margin: 10px;
  }
  .cancel {
    color: #2a928e;
    border: none;
  }
`;
