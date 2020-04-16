import { Header } from './Header';
import { Footer } from './Footer';

export const MyLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="main">{children}</div>
      <Footer />

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: #efefef;
          background-image: url(paper.png);
          font-size: 16px;
        }

        h1,
        h2,
        h3,
        h4,
        h5 {
          margin: 0;
          padding: 0;
        }

        .main {
          min-height: 50vh;
          padding: 0.5em;
        }
      `}</style>
    </div>
  );
};
