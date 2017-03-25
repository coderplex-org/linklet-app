export default () => (
  <footer>
    <p>Made With ♥ By VinayPuppal</p>
    <p>
      You can find all my other awesome projects at my site
      {' '}
      <a href='https://www.vinaypuppal.com' target='_blank'>
        https://www.vinaypuppal.com
      </a>
    </p>
    <p>
      ☛
      {' '}
      <a target='_blank' href='https://github.com/vinaypuppal/linklet-app'>
        Source Code
      </a>
      {' '}
      ☚
    </p>
    <style jsx>
      {
        `
      footer {
        color: #888;
        text-align: center;
      }
      a {
        text-decoration: none;
        color: orangered;
      }
    `
      }
    </style>
  </footer>
)
