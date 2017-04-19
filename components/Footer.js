import FaGithub from 'react-icons/lib/fa/github'

export default () => (
  <footer>
    <ul>
      <li>
        <a href='https://https://github.com/vinaypuppal/linklet-app'>
          <FaGithub /> View on Github
        </a>
      </li>
      <li>
        <a href='https://github.com/vinaypuppal/linklet-app/issues/new'>
          Feedback
        </a>
      </li>
      <li>
        <a href='https://privacy.linklet.ml'>
          Privacy
        </a>
      </li>
    </ul>
    <style jsx>
      {`
      footer {
        color: #888;
        width: 100%;
        min-height: 50px;
      }
      ul {
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
        }
        ul {
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
