export const ConfirmDialog = ({ show, message, onClick }) => {
  if (!show) return null;

  return (
    <div className="back">
      <div className="dialog">
        <div className="message">{message}</div>
        <button onClick={() => onClick(true)} className="btn-yes">
          Yes
        </button>
        <button onClick={() => onClick(false)} className="btn-no">
          No
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
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 1rem;
          grid-row-gap: 1rem;
          width: 60vw;
          min-width: 290px;
          max-width: 600px;
          margin: auto auto;
          padding: 1rem;
          border: 0.2rem solid #888;
          border-radius: 0.5rem;
          background-color: white;
          color: #666;
          z-index: 1100;
          box-shadow: 0.4rem 0.4rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
        }

        .message {
          grid-column-start: 1;
          grid-column-end: 3;
        }

        button {
          padding: 0.6rem;
          font-size: 2rem;
          background-color: #ddd;
          border: 2px solid #666;
          border-radius: 0.4rem;
          cursor: pointer;
        }

        button:hover {
          background-color: #eef;
        }

        .btn-yes {
          font-weight: 120%;
          color: blue;
        }

        .btn-no {
          color: #666;
        }
      `}</style>
    </div>
  );
};
