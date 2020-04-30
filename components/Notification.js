import { useEffect, useState } from 'react';

const STAY_SEC = 3;
const CLOSE_ANIM_SEC = 0.4;

export const Notification = ({ show, message, onClose }) => {
  if (!show) return null;

  const [isHidden, setIsHidden] = useState(true);

  let isClosing = false;
  let isUnmounted = false;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isUnmounted) return;
      handleClose();
    }, STAY_SEC * 1000);

    setIsHidden(false);

    return () => {
      isUnmounted = true;
      clearTimeout(timer);
    };
  }, []);

  function handleClose() {
    if (isUnmounted || isClosing) return;

    setIsHidden(true);
    isClosing = true;

    setTimeout(() => {
      if (isUnmounted) return;
      onClose();
    }, CLOSE_ANIM_SEC * 1000);
  }

  return (
    <div className={`dialog ${isHidden ? 'hidden' : ''}`}>
      <div className="message">{message}</div>
      <button onClick={handleClose} className="btn-close">
        X
      </button>

      <style jsx>{`
        .dialog {
          position: fixed;
          bottom: 1rem;
          right: 0.6rem;
          margin: auto;
          width: 60vw;
          min-width: 290px;
          max-width: 600px;
          margin: auto auto;
          padding: 2rem 1rem 1.6rem;
          border: 0.1rem solid #888;
          border-radius: 0.3rem;
          background-color: #cfcfff;
          color: #444;
          z-index: 1100;
          box-shadow: 0.4rem 0.4rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
          opacity: 1;
          transition: opacity ${CLOSE_ANIM_SEC}s ease-in;
        }

        .dialog.hidden {
          opacity: 0;
          transition: opacity ${CLOSE_ANIM_SEC}s ease-out;
        }

        .message {
          color: blue;
          font-size: 0.8rem;
          font-weight: 100%;
        }

        button {
          padding: 0.2rem;
          font-size: 1rem;
          background-color: #ddd;
          border: 1px solid #666;
          border-radius: 0.3rem;
          cursor: pointer;
        }

        button:hover {
          background-color: #eef;
        }

        .btn-close {
          position: absolute;
          width: 1.6rem;
          height: auto;
          top: 0.34rem;
          right: 0.34rem;
          font-weight: 100%;
          color: gray;
        }
      `}</style>
    </div>
  );
};
