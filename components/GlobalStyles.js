export default () => (
  <div>
    <style jsx global>
      {`
        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }
        body {
          height: 100%;
          width: 100%;
          padding: 0;
          margin: 0;
          background: rgba(63, 81, 181, 0.08);
          font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          font-weight: 400;
          color: #444;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        #HW_badge {
          top: 0 !important;
          left: 0 !important;
        }
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: #f7e830;
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
        }
        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px #f7e830, 0 0 5px #f7e830;
          opacity: 1;
          transform: rotate(3deg) translate(0px, -4px);
        }
        .links-enter {
          opacity: 0.01;
        }
        .links-enter.links-enter-active {
          opacity: 1;
          transition: opacity 500ms ease-in;
        }
        .links-leave {
          opacity: 1;
        }
        .links-leave.links-leave-active {
          opacity: 0.01;
          transition: opacity 300ms ease-in;
        }
        .links-appear {
          opacity: 0.01;
        }
        .links-appear.links-appear-active {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
        .rc-pagination {
          font-size: 12px;
          user-select: none;
          padding: 0;
          width: auto;
          margin: 50px auto;
        }
        .rc-pagination-total-text {
          float: left;
          height: 30px;
          line-height: 30px;
          margin-right: 10px;
        }
        .rc-pagination:after {
          content: ' ';
          display: block;
          height: 0;
          clear: both;
          overflow: hidden;
          visibility: hidden;
        }
        .rc-pagination-item {
          cursor: pointer;
          border-radius: 6px;
          min-width: 28px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          list-style: none;
          float: left;
          border: 1px solid #d9d9d9;
          background-color: #fff;
          margin-right: 8px;
        }
        .rc-pagination-item a {
          text-decoration: none;
          color: #666;
        }
        .rc-pagination-item:hover {
          border-color: #2db7f5;
        }
        .rc-pagination-item:hover a {
          color: #2db7f5;
        }
        .rc-pagination-item-active {
          background-color: #2db7f5;
          border-color: #2db7f5;
        }
        .rc-pagination-item-active a {
          color: #fff;
        }
        .rc-pagination-item-active:hover a {
          color: #fff;
        }
        .rc-pagination-jump-prev:after,
        .rc-pagination-jump-next:after {
          content: '•••';
          display: block;
          letter-spacing: 2px;
          color: #ccc;
          font-size: 12px;
          margin-top: 1px;
        }
        .rc-pagination-jump-prev:hover:after,
        .rc-pagination-jump-next:hover:after {
          color: #2db7f5;
        }
        .rc-pagination-jump-prev:hover:after {
          content: '«';
        }
        .rc-pagination-jump-next:hover:after {
          content: '»';
        }
        .rc-pagination-prev,
        .rc-pagination-jump-prev,
        .rc-pagination-jump-next {
          margin-right: 8px;
        }
        .rc-pagination-prev,
        .rc-pagination-next,
        .rc-pagination-jump-prev,
        .rc-pagination-jump-next {
          cursor: pointer;
          color: #666;
          font-size: 10px;
          border-radius: 6px;
          list-style: none;
          min-width: 28px;
          height: 28px;
          line-height: 28px;
          float: left;
          text-align: center;
        }
        .rc-pagination-prev a:after {
          content: '‹';
          display: block;
        }
        .rc-pagination-next a:after {
          content: '›';
          display: block;
        }
        .rc-pagination-prev,
        .rc-pagination-next {
          border: 1px solid #d9d9d9;
          font-size: 18px;
        }
        .rc-pagination-prev a,
        .rc-pagination-next a {
          color: #666;
        }
        .rc-pagination-prev a:after,
        .rc-pagination-next a:after {
          margin-top: -1px;
        }
        .rc-pagination-disabled {
          cursor: not-allowed;
        }
        .rc-pagination-disabled a {
          color: #ccc;
        }
        .rc-pagination-options {
          float: left;
          margin-left: 15px;
        }
        .rc-pagination-options-size-changer {
          float: left;
          width: 80px;
        }
        .rc-pagination-options-quick-jumper {
          float: left;
          margin-left: 16px;
          height: 28px;
          line-height: 28px;
        }
        .rc-pagination-options-quick-jumper input {
          margin: 0 8px;
          box-sizing: border-box;
          background-color: #fff;
          border-radius: 6px;
          border: 1px solid #d9d9d9;
          outline: none;
          padding: 3px 12px;
          width: 50px;
          height: 28px;
        }
        .rc-pagination-options-quick-jumper input:hover {
          border-color: #2db7f5;
        }
        .rc-pagination-simple .rc-pagination-prev,
        .rc-pagination-simple .rc-pagination-next {
          border: none;
          height: 24px;
          line-height: 24px;
          margin: 0;
          font-size: 18px;
        }
        .rc-pagination-simple .rc-pagination-simple-pager {
          float: left;
          margin-right: 8px;
        }
        .rc-pagination-simple .rc-pagination-simple-pager .rc-pagination-slash {
          margin: 0 10px;
        }
        .rc-pagination-simple .rc-pagination-simple-pager input {
          margin: 0 8px;
          box-sizing: border-box;
          background-color: #fff;
          border-radius: 6px;
          border: 1px solid #d9d9d9;
          outline: none;
          padding: 5px 8px;
          width: 30px;
          min-height: 20px;
        }
        .rc-pagination-simple .rc-pagination-simple-pager input:hover {
          border-color: #2db7f5;
        }
        .react-autosuggest__container {
          position: relative;
          width: 80%;
          margin: 0 auto;
        }
        .react-autosuggest__input {
          position: relative;
          width: 100%;
          height: 60px;
          padding: 20px 0 20px 40px;
          font-family: 'Dosis', sans-serif;
          font-weight: 300;
          font-size: 18px;
          outline: none;
          border: none;
          box-shadow: 0 1px 2px 1px #ccc, 0 1px 2px -1px #ccc;
        }
        .react-autosuggest__container::after {
          content: '🔍';
          font-size: 26px;
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-40%);
        }
        .react-autosuggest__input:focus {
          outline: none;
        }
        .react-autosuggest__container--open .react-autosuggest__input {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        .react-autosuggest__suggestions-container {
          max-height: 300px;
          overflow: auto;
          position: absolute;
          box-shadow: 1px 2px 8px #ccc;
          top: 51px;
          width: 100%;
          margin: 0;
          padding: 0;
          list-style-type: none;
          background-color: #fff;
          font-family: 'Dosis', sans-serif;
          font-weight: 300;
          font-size: 16px;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          z-index: 2;
        }
        .react-autosuggest__suggestions-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .react-autosuggest__suggestion {
          cursor: pointer;
          padding: 10px 20px;
          border-bottom: 1px dotted #ccc;
        }
        .react-autosuggest__suggestion--highlighted {
          background-color: #ddd;
        }
        @media only screen and (max-width: 1024px) {
          .rc-pagination-item-after-jump-prev,
          .rc-pagination-item-before-jump-next {
            display: none;
          }
        }
        @media (max-width: 1020px) {
          .react-autosuggest__container {
            width: 100%;
          }
          .react-autosuggest__container::after {
            font-size: 20px;
          }
        }
      `}
    </style>
  </div>
)
