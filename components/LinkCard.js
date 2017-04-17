import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'
import { truncateString } from '../utils'
import Highlighter from 'react-highlight-words'

export default ({ link, query: { search } = {} } = {}) => {
  return (
    <li key={link._id} className='list__item'>
      <div className='item__content'>
        <h3 className='title'>
          <Highlighter
            highlightClassName='highlight'
            searchWords={[search]}
            textToHighlight={
              link.title ? truncateString(link.title, 90) : link.url
            }
          />
        </h3>
        <p className='desc'>
          {link.description
            ? <Highlighter
              highlightClassName='highlight'
              searchWords={[search]}
              textToHighlight={truncateString(link.description, 140)}
              />
            : 'No Description'}
        </p>
      </div>
      <div className='item__footer'>
        <span>
          {distanceInWordsToNow(link.timestamp)}
          {' '}
          ago (
          {format(link.timestamp, 'MMM, Do YYYY')}
          )
        </span>
        <div className='meta'>
          <ul>
            <li>
              {link._creator
                ? <a
                  className='by-user'
                  rel='noopener'
                  href={`https://github.com/${link._creator.username}`}
                  target='_blank'
                  >
                  <img
                    src={link._creator.avatarUrl}
                    alt={link._creator.username}
                    />
                  <span className='info'>
                    <span>Added By</span>
                    <span>{link._creator.username}</span>
                  </span>
                </a>
                : <div className='by-wa'>
                    Added From whatsapp
                  </div>}
            </li>
            <li>
              <a
                className='open'
                rel='noopener'
                href={link.url}
                target='_blank'
              >
                Open
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                  <path d='M488.727 0H302.545c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h129.997L192.999 286.09c-9.089 9.089-9.089 23.823 0 32.912 4.543 4.544 10.499 6.816 16.455 6.816 5.956 0 11.913-2.271 16.457-6.817L465.455 79.458v129.997c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273V23.273C512 10.42 501.58 0 488.727 0z' />
                  <path d='M395.636 232.727c-12.853 0-23.273 10.42-23.273 23.273v209.455H46.545V139.636H256c12.853 0 23.273-10.42 23.273-23.273S268.853 93.091 256 93.091H23.273C10.42 93.091 0 103.511 0 116.364v372.364C0 501.58 10.42 512 23.273 512h372.364c12.853 0 23.273-10.42 23.273-23.273V256c-.001-12.853-10.421-23.273-23.274-23.273z' />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>
        {`
          .list__item {
            margin: 20px auto;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
            width: 360px;
            transition: box-shadow .35s ease-out, transform .3s ease-out, opacity .2s ease-out;
            display: flex;
            border-radius: 12px;
            background: #fff;
            flex-direction: column;
            justify-content: space-between;
            text-decoration: none;
            color: #444;
          }
          .item__content {
            width: 100%;
            min-height: 127px;
            padding: 10px 10px 0 10px;
          }
          .title {
            display: flex;
            align-items: center;
            margin: 0 0 5px 0;
            padding: 5px 10px;
            font-size: 18px;
            min-height: 75px;
            border-bottom: 1px solid #eee;
          }
          .desc {
            margin: 0;
            font-size: 14px;
            padding: 10px;
          }
          .item__footer > span {
            color: #666;
            display: inline-block;
            padding: 5px 10px;
            padding-left: 20px;
            padding-bottom: 10px;
            font-size: 14px;
          }
          .item__footer .meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #eee;
          }
          .meta ul {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            width: 100%;
            align-items: center;
          }
          .meta li {
            flex: 1;
            min-height: 50px;
            display: flex;
            justify-content: center;
            border-right: 1px solid #eee;
            border-left: 1px solid #eee;
          }
          .meta li:first-child {
            flex: 2;
            color: #888;
          }
          .by-user {
            flex: 1;
            text-decoration: none;
            color: #0366d6;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .by-user img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 5px;
          }
          .by-user .info {
            display: flex;
            flex-direction: column;
          }
          .by-user .info span:first-child {
            color: #888;
            font-size: 10px;
          }
          svg {
            width: 20px;
            height: 20px;
            fill: blue;
            margin-left: 10px;
          }
          .meta li div,
          .item__footer .open {
            width: 100%;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .item__footer .open {
            cursor: pointer;
            width: 100%;
            text-decoration: none;
            color: blue;
            font-weight: bold;
            transition: all 0.25s;
          }
          .item__footer .open:hover {
            color: teal;
          }
          .item__footer .open:hover > svg {
            fill: teal;
          }
          @media(max-width: 720px) {
            .list__item {
              margin: 10px auto;
            }
          }
        `}
      </style>
    </li>
  )
}
