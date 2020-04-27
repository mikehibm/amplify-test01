export const LoadingSpinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading">
      <img src="/spinner.svg" className="spinner" />

      <style jsx>{`
        .loading {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          justify-items: center;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 1000;
        }

        .spinner {
          transform: translateY(-10%);
        }
      `}</style>
    </div>
  );
};
