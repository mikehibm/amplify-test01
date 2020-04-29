export const AlertDialog = ({ show, message, onClose }) => {
  if (!show) return null;

  function handleClose() {
    onClose && onClose();
  }

  return (
    <div className="back">
      <div className="dialog">
        <div className="message">{message}</div>
        <button onClick={handleClose} className="btn-close">
          X
        </button>
      </div>

      <style jsx>{`
        .back {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          justify-items: center;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 1000;
        }

        .dialog {
          position: relative;
          width: 60vw;
          min-width: 290px;
          max-width: 600px;
          margin: auto auto;
          padding: 2.2rem 1rem 1.6rem;
          border: 0.2rem solid #888;
          border-radius: 0.5rem;
          background-color: white;
          color: #666;
          z-index: 1100;
          box-shadow: 0.4rem 0.4rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
        }

        .message {
          color: blue;
          font-size: 1.4rem;
          font-weight: 120%;
        }

        button {
          padding: 0.3rem;
          font-size: 1rem;
          background-color: #ddd;
          border: 2px solid #666;
          border-radius: 0.4rem;
          cursor: pointer;
        }

        button:hover {
          background-color: #eef;
        }

        .btn-close {
          position: absolute;
          width: 1.8rem;
          height: auto;
          top: 0.4rem;
          right: 0.4rem;
          font-weight: 120%;
          color: gray;
        }
      `}</style>
    </div>
  );
};
