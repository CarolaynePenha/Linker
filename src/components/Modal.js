import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { FaRegTrashCan } from "react-icons/fa6";

import TokenContext from "../context/TokenContext";
import LoadingRing from "./LoadingRing";

export default function DeletePost({
  post,
  setUpdatePosts,
  updatePosts,
  loading,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (!loading) {
      setLoadingState(false);
      closeModal();
    }
  }, [loading]);

  function openModal() {
    setIsOpen(true);
  }

  async function deletePost(e) {
    e?.preventDefault();
    setLoadingState(true);
    const { id } = post;
    const URL = process.env.REACT_APP_API_URL + `/timeline/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(URL, config);
      setUpdatePosts(!updatePosts);
    } catch (err) {
      console.log(err.response);
      alert("Houve um erro ao deletar seu post!");
      setLoadingState(false);
      closeModal();
    }
  }

  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="trash">
        <FaRegTrashCan onClick={openModal} color="white" />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {loadingState ? (
          <LoadingRing />
        ) : (
          <DivModal>
            <p>Tem certeza que deseja deletar esse post?</p>
            <form onSubmit={deletePost}>
              <button className="cancel" onClick={closeModal}>
                Não,cancelar
              </button>
              <button className="confirm" type="submit">
                Sim, deletar
              </button>
            </form>
          </DivModal>
        )}
      </Modal>
    </>
  );
}
// ---------------------------css
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
