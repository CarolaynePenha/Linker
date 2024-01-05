export default function Comments({ comment }) {
  return (
    <>
      {comment && (
        <div className="comment-infos">
          <div className="image">
            <img src={comment.image} alt="imagem do usuário" />
          </div>
          <div className="comment-text">
            <p>
              <strong>{comment.name}</strong>
            </p>
            <p>{comment.commentText}</p>
          </div>
        </div>
      )}
      {!comment && (
        <p className="no-comments">Não há nenhum comentário ainda.</p>
      )}
    </>
  );
}
