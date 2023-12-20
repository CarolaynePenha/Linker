import { FaRegHeart } from "react-icons/fa6";
import styled from "styled-components";

export default function Post({ post }) {
  return (
    <Article>
      <div className="side-bar">
        <img src={post.image} alt="imagem do usuário" />
        <FaRegHeart color="white" />
        <p>{post.likes} likes</p>
      </div>
      <div className="container">
        <p>
          <strong>{post.name}</strong>{" "}
        </p>
        <p className="description">{post.description}</p>
        <a href={post.url} target="_blank">
          {post.imageMetadata && (
            <img src={post.imageMetadata} alt="imagem do post" />
          )}
          {(post.titleMetadata || post.descriptionMetadata) && (
            <div className="metadatas">
              <p> {post.titleMetadata}</p>
              <p>{post.descriptionMetadata}</p>
            </div>
          )}
        </a>
      </div>
    </Article>
  );
}

// ---------------------------css
const Article = styled.article`
  display: flex;
  justify-content: space-between;
  background-color: #272330;
  width: 100%;
  margin-bottom: 20px;
  .side-bar {
    padding: 10px;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 30px;
      margin-left: 5px;
      margin-bottom: 10px;
    }
    p {
      margin: 0;
      margin-top: 10px;
      color: white;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    height: fit-content;
    padding: 10px;
    a {
      text-decoration: none;
      width: 100%;
    }
    strong {
      font-size: 20px;
      font-family: "Afacad", sans-serif;
      font-style: italic;
      color: #ffffff;
    }
    p {
      margin: 0;
      margin-bottom: 10px;
      color: #c6c6c6;
    }
    .description {
      max-height: 50px;
      overflow-y: scroll;
    }
    .metadatas {
      height: 100px;
      width: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid #617c80;
      border-radius: 20px;
      padding: 10px;
      overflow-y: scroll;
    }
    img {
      width: 97%;
      margin: 2px 5px;
      height: 40%;
      border-radius: 30px;
    }
  }
`;
