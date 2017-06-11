export default () =>
  <div className='link__wrapper'>
    <div className='animated-background'>
      <div className='background-masker content-top' />
      <div className='background-masker content-first-end' />
      <div className='background-masker content-second-line' />
      <div className='background-masker content-second-end' />
      <div className='background-masker content-third-line' />
      <div className='background-masker content-third-end' />
    </div>
    <style jsx>{`
      .link__wrapper {
        background: #fff;
        border: 1px solid;
        border-color: #e5e6e9 #dfe0e4 #d0d1d5;
        border-radius: 3px;
        margin: 20px auto;
        width: 360px;
      }
      .animated-background {
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: #f4f7fb;
        background: linear-gradient(
          to right,
          #eeeeee 8%,
          #f4f4f4 18%,
          #eeeeee 33%
        );
        background-size: 800px 104px;
        position: relative;
        height: 300px;
      }
      .background-masker.content-top,
      .background-masker.content-second-line,
      .background-masker.content-third-line,
      .background-masker.content-second-end,
      .background-masker.content-third-end,
      .background-masker.content-first-end {
        top: 40px;
        left: 0;
        right: 0;
        height: 6px;
      }
      .background-masker.content-top {
        height: 20px;
      }
      .background-masker.content-first-end,
      .background-masker.content-second-end,
      .background-masker.content-third-end {
        width: auto;
        left: 380px;
        right: 0;
        top: 60px;
        height: 8px;
      }
      .background-masker.content-second-line {
        top: 68px;
      }
      .background-masker.content-second-end {
        left: 420px;
        top: 74px;
      }
      .background-masker.content-third-line {
        top: 82px;
      }
      .background-masker.content-third-end {
        left: 300px;
        top: 88px;
      }
      @keyframes placeHolderShimmer {
        0% {
          background-position: -468px 0;
        }
        100% {
          background-position: 468px 0;
        }
      }
      @media (max-width: 720px) {
        .link__wrapper {
          width: 100%;
          margin: 2px 0;
        }
        .animated-background {
          height: 150px;
        }
      }
    `}</style>
  </div>
