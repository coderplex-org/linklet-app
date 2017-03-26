import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'
import LazyLoad from 'react-lazyload'
import db from '../lib/db'
import { truncateString } from '../utils'

export default ({ link }) => {
  let imgUrl
  // fetch http imges over proxy to avoid mixed content error
  if (link.image && /http:.*/.test(link.image)) {
    imgUrl = `${db.baseUrl}/proxy/${link.image}`
  } else {
    imgUrl = link.image
  }
  return (
    <li key={link._id} className='list__item'>
      <a className='list__itemLink' href={link.url} target='_blank'>
        <div className='item__media'>
          {link.image
            ? <LazyLoad height={200} offset={100}>
              <img src={imgUrl} alt={link.title} />
            </LazyLoad>
            : <div className='dummy__img'>☆</div>}
        </div>
        <div className='item__content'>
          <h3 className='title'>
            {link.title ? truncateString(link.title, 100) : link.url}
          </h3>
          <p className='desc'>
            {link.description
              ? truncateString(link.description, 140)
              : 'No Description'}
          </p>
          <p className='link'>
            {truncateString(link.url, 40)}
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
            margin: 30px 25px;
            background: #fff;
            box-shadow: 0 0 5px rgba(0,0,0,0.3);
            width: 360px;
            transition: box-shadow .35s ease-out, transform .3s ease-out, opacity .2s ease-out;
          }
          .list__itemLink {
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            width: 100%;
            text-decoration: none;
            color: #888;
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
            background: #fff;
            min-height: 127px;
          }
          .title {
            margin: 0 0 5px 0;
            padding: 5px 10px;
            color: #444;
            font-size: 18px;
            line-height: 1.2em;
            max-height: 2.8em;
            overflow: hidden;
          }
          .desc {
            margin: 0;
            font-size: 14px;
            color: #888;
            padding: 5px 10px;
            line-height: 1.2em;
            max-height: 3.8em;
            text-overflow: ellipses;
            overflow: hidden;
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
          }
          .item__footer span {
            color: #999;
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
              margin: 30px auto;
            }
          }
        `
        }
      </style>
    </li>
  )
}
