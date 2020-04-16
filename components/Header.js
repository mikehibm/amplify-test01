import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <h1>Amplify Test</h1>
      <nav>
        <Link href="/">
          <a>Todo</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>

      <style jsx>{`
        header {
          text-align: center;
          color: hsl(26.1, 51.6%, 83.7%);
          background-color: hsl(206.1, 51.6%, 43.7%);
        }

        h1 {
          margin: 0;
          padding: 0;
        }

        nav a {
          margin-right: 1em;
          color: #eee;
          cursor: pointer;
          text-decoration: none;
        }

        nav a:hover {
          color: yellow;
        }
      `}</style>
    </header>
  );
};
