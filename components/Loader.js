export default () => (
  <div className='loading'>
    <div className='cssload-loader'>
      <div className='cssload-side' />
      <div className='cssload-side' />
      <div className='cssload-side' />
      <div className='cssload-side' />
      <div className='cssload-side' />
      <div className='cssload-side' />
      <div className='cssload-side' />
      <div className='cssload-side' />
    </div>
    <style jsx>{`
        .loading {
          width: 100%;
          height: calc(100vh - 100px);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .cssload-loader {
          width: 47.284271247462px;
          height: 47.284271247462px;
          margin-left: -23.142135623731px;
          margin-top: -23.142135623731px;
          border-radius: 100%;
          animation-name: cssload-loader;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          animation-duration: 4.6s;
        }
        .cssload-loader .cssload-side {
          display: block;
          width: 6px;
          height: 19px;
          background-color: #253592;
          margin: 2px;
          position: absolute;
          border-radius: 50%;
          animation-duration: 1.73s;
          animation-iteration-count: infinite;
          animation-timing-function: ease;
        }
        .cssload-loader .cssload-side:nth-child(1),
        .cssload-loader .cssload-side:nth-child(5) {
          transform: rotate(0deg);
          animation-name: cssload-rotate0;
        }
        .cssload-loader .cssload-side:nth-child(3),
        .cssload-loader .cssload-side:nth-child(7) {
          transform: rotate(90deg);
          animation-name: cssload-rotate90;
        }
        .cssload-loader .cssload-side:nth-child(2),
        .cssload-loader .cssload-side:nth-child(6) {
          transform: rotate(45deg);
          animation-name: cssload-rotate45;
        }
        .cssload-loader .cssload-side:nth-child(4),
        .cssload-loader .cssload-side:nth-child(8) {
          transform: rotate(135deg);
          animation-name: cssload-rotate135;
        }
        .cssload-loader .cssload-side:nth-child(1) {
          top: 23.142135623731px;
          left: 47.284271247462px;
          margin-left: -3px;
          margin-top: -10px;
          animation-delay: 0;
        }
        .cssload-loader .cssload-side:nth-child(2) {
          top: 40.213203431093px;
          left: 40.213203431093px;
          margin-left: -3px;
          margin-top: -10px;
          animation-delay: 0;
        }
        .cssload-loader .cssload-side:nth-child(3) {
          top: 47.284271247462px;
          left: 23.142135623731px;
          margin-left: -3px;
          margin-top: -10px;
          animation-delay: 0;
        }
        .cssload-loader .cssload-side:nth-child(4) {
          top: 40.213203431093px;
          left: 7.0710678163691px;
          margin-left: -3px;
          margin-top: -10px;
          animation-delay: 0;
        }
        .cssload-loader .cssload-side:nth-child(5) {
          top: 23.142135623731px;
          left: 0px;
          margin-left: -3px;
          margin-top: -10px;
          animation-delay: 0;
        }
        .cssload-loader .cssload-side:nth-child(6) {
          top: 7.0710678163691px;
          left: 7.0710678163691px;
          margin-left: -3px;
          margin-top: -10px;
          animation-delay: 0;
        }
        .cssload-loader .cssload-side:nth-child(7) {
          top: 0px;
          left: 23.142135623731px;
          margin-left: -3px;
          margin-top: -10px;
          animation-delay: 0;
        }
        .cssload-loader .cssload-side:nth-child(8) {
          top: 7.0710678163691px;
          left: 40.213203431093px;
          margin-left: -3px;
          margin-top: -10px;
          animation-delay: 0;
        }
        @keyframes cssload-rotate0 {
          0% {
            transform: rotate(0deg);
          }
          60% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(180deg);
          }
        }
        @keyframes cssload-rotate90 {
          0% {
            transform: rotate(90deg);
                    transform: rotate(90deg);
          }
          60% {
            transform: rotate(270deg);
                    transform: rotate(270deg);
          }
          100% {
            transform: rotate(270deg);
                    transform: rotate(270deg);
          }
        }
        @keyframes cssload-rotate45 {
          0% {
            transform: rotate(45deg);
                    transform: rotate(45deg);
          }
          60% {
            transform: rotate(225deg);
                    transform: rotate(225deg);
          }
          100% {
            transform: rotate(225deg);
                    transform: rotate(225deg);
          }
        }
        @keyframes cssload-rotate135 {
          0% {
            transform: rotate(135deg);
                    transform: rotate(135deg);
          }
          60% {
            transform: rotate(315deg);
                    transform: rotate(315deg);
          }
          100% {
            transform: rotate(315deg);
                    transform: rotate(315deg);
          }
        }
        @keyframes cssload-loader {
          0% {
            transform: rotate(0deg);
                    transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
                    transform: rotate(360deg);
          }
        }
    `}</style>
  </div>
)
