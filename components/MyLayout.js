import { Header } from './Header';
import { Footer } from './Footer';

const styleMain = {
  minHeight: '50vh',
  padding: '0.6em',
};

export const MyLayout = ({ contentStyle = {}, children }) => {
  const style = {
    ...styleMain,
    ...contentStyle,
  };

  return (
    <div>
      <Header />
      <div className="main" style={style}>
        {children}
      </div>
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
      `}</style>
    </div>
  );
};
