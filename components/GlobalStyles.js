export default () => (
  <div>
    <style jsx global>
      {
        `
        *,
        *::after,
        *::before {
        box-sizing: border-box;
        }
        body{
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        background: #f4f4f4;
        font-family: -apple-system, 
              BlinkMacSystemFont,
              "Segoe UI", 
              Roboto, 
              Oxygen-Sans, 
              Ubuntu,  
              Cantarell,
              "Fira Sans",
              "Droid Sans",
              "Helvetica Neue", 
              sans-serif;
        font-weight: 400;
        color: #444;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        }
        #nprogress {
        pointer-events: none;
        }
        #nprogress .bar {
        background: #F44336;
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
        box-shadow: 0 0 10px #F44336, 0 0 5px #F44336;
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
        }
        /* Remove these to get rid of the spinner */
        #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
        }
        #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: solid 2px transparent;
        border-top-color: #F44336;
        border-left-color: #F44336;
        border-radius: 50%;
        animation: nprogress-spinner 400ms linear infinite;
        }
        .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
        }
        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
        position: absolute;
        }
        @-webkit-keyframes nprogress-spinner {
        0%   { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
        }
        @keyframes nprogress-spinner {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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
          content: " ";
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
          content: "•••";
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
          content: "«";
        }
        .rc-pagination-jump-next:hover:after {
          content: "»";
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
          content: "‹";
          display: block;
        }
        .rc-pagination-next a:after {
          content: "›";
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
        @media only screen and (max-width: 1024px) {
          .rc-pagination-item-after-jump-prev,
          .rc-pagination-item-before-jump-next {
            display: none;
          }
        }
    `
      }
    </style>
  </div>
)
