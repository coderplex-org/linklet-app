import FaGithub from 'react-icons/lib/fa/github'

export default () => (
  <footer>
    <p>
      Made with ❤ By
      {' '}
      <a rel='noopener' target='_blank' href='https://vinaypuppal.com'>
        VinayPuppal
      </a>
    </p>
    <ul>
      <li>
        <a
          rel='noopener'
          target='_blank'
          href='https://github.com/vinaypuppal/linklet-app'
        >
          <FaGithub /> View on Github
        </a>
      </li>
      <li>
        <a
          rel='noopener'
          target='_blank'
          href='https://github.com/vinaypuppal/linklet-app/issues/new'
        >
          Feedback
        </a>
      </li>
      <li>
        <a rel='noopener' target='_blank' href='/tos'>
          Terms Of Service & Privacy
        </a>
      </li>
    </ul>
    <style jsx>
      {`
      footer {
        color: #888;
        width: 100%;
        min-height: 50px;
        display: flex;
      }
      p{
        margin-left: 240px;
        font-size: 14px;
      }
      ul {
        flex: 1;
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-height: 50px;
      }
      ul li {
        text-align: center;
        padding: 0 50px 0 0;
        font-size: 14px;
      }
      a {
        text-decoration: none;
        color: #444;
      }
      a:hover {
        color: #222;
      }
      @media(max-width: 720px) {
        footer {
          margin-left: 0;
          padding-bottom: 60px;
          flex-direction: column;
          align-items: center;
        }
        p {
          margin-left: 0;
        }
        ul {
          width: 100%;
          justify-content: flex-start;
        }
        ul li {
          flex: 1;
          border-left: 1px solid #ccc;
          padding: 0;
        }
      }
    `}
    </style>
  </footer>
)
