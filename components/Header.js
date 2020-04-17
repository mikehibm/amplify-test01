import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { useAuthListner } from './UseAuthLisner';

export const Header = () => {
  const user = useAuthListner();
  const username = user?.username || '';

  async function handleSignout(e) {
    console.log(e);
    await Auth.signOut();
    console.log('Sign out done.');
  }

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

      {username && (
        <div className="user">
          <span className="username">{username} </span>
          <a onClick={handleSignout} className="signout">
            Sign Out
          </a>
        </div>
      )}

      <style jsx>{`
        header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          text-align: center;
          color: hsl(26.1, 51.6%, 83.7%);
          background-color: hsl(206.1, 51.6%, 43.7%);
        }

        h1 {
          grid-column: 1 / 3;
          margin: 0;
          padding: 0;
          color: lightyellow;
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

        .signout {
          cursor: pointer;
        }
        .signout:hover {
          color: yellow;
        }
      `}</style>
    </header>
  );
};
