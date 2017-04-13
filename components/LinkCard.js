import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'
import { truncateString } from '../utils'
import Highlighter from 'react-highlight-words'

export default ({ link, query: { search } }) => {
  return (
    <li key={link._id} className='list__item'>
      <a
        rel='noopener'
        className='list__itemLink'
        href={link.url}
        target='_blank'
      >
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
          <p className='link'>
            <Highlighter
              highlightClassName='highlight'
              searchWords={[search]}
              textToHighlight={truncateString(link.url, 40)}
            />
          </p>
        </div>
        <div className='item__footer'>
          <span>
            {distanceInWordsToNow(link.timestamp)}
            {' '}
            ago (
            {format(link.timestamp, 'MMM, Do')}
            )
          </span>
        </div>
      </a>
      <style jsx>
        {
          `
          .list__item {
            margin: 20px auto;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
            width: 360px;
            transition: box-shadow .35s ease-out, transform .3s ease-out, opacity .2s ease-out;
            display: flex;
            border-radius: 12px;
            background: #fff;
          }
          .list__itemLink {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;
            width: 100%;
            text-decoration: none;
            color: #444;
            padding: 10px;
          }
          .list__item:hover {
            box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
            transform: translate(0, -4px);
          }
          .item__media {
            background: #f1f2f3;
            height: 200px;
          }
          img {
            width: 100%;
            height: 200px;
          }
          .dummy__img {
            width: 100%;
            height: 200px;
            background: #f1f2f3;
            text-align: center;
            line-height: 200px;
            font-size: 64px;
          }
          .item__content {
            width: 100%;
            min-height: 127px;
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
            padding: 5px 10px;
          }
          .link {
            padding: 5px 10px;
            margin: 0 0 10px 0;
            font-size: 14px;
            color: blue;
            text-decoration: underline;
          }
          .item__footer {
            padding: 5px 20px 10px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #eee;
          }
          .item__footer span {
            color: #666;
          }
          .item__footer a {
            text-decoration: none;
            display: block;
            padding: 8px 16px;
            background: #666;
            color: #fff;
            font-weight: bold;
            border-radius: 5px;
            box-shadow: 0 0 5px rgba(0,0,0,0.5);
            transition: all 0.25s;
          }
          .item__footer a:hover {
            background: #FF7058;
          }
          @media(max-width: 1440px) {
            .list__item {
              margin: 20px auto;
            }
          }
          @media(max-width: 720px) {
            .list__item:hover {
              box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
              transform: translate(0, 0);
            }
          }
        `
        }
      </style>
    </li>
  )
}
