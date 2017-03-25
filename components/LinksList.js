import Router from 'next/router'
import Link from 'next/link'
import Footer from '../components/Footer'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'
import LazyLoad from 'react-lazyload'
import Pagination from 'rc-pagination'
import db from '../lib/db'

function truncateString (str, num) {
  // Clear out that junk in your trunk
  if (str.length > num && num <= 3) {
    return str.slice(0, num) + '...'
  } else if (str.length > num) {
    return str.slice(0, num - 3) + '...'
  }
  return str
}

const renderLink = link => {
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
          <h3 className='title'>{link.title ? link.title : link.url}</h3>
          <p className='desc'>
            {link.description ? link.description : 'No Description'}
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

export default (
  { data: { links, isLastPage, totalLinks, perPage, page }, url: { query } }
) => (
  <main>
    <div className='info'>
      {query.start & query.end
        ? <span>
            Total: <strong>{totalLinks}</strong>link/s were found from <div
              className='filterDetails'
            >
              <strong>
                {
                  `${format(Number(query.start), 'MMM Do')} to ${format(Number(query.end), 'MMM Do')}`
                }
              </strong>
              {' '}
              <Link href='/' scroll><a>clear</a></Link>
            </div>
            (Showing Page: {page})
          </span>
        : <span>
            Total:
            {' '}
          <strong>{totalLinks}</strong>
          {' '}
            links were added upto now (Showing Page:
            {' '}
          {page}
            )
          </span>}
    </div>
    <ul className='list'>
      {links.map(link => renderLink(link))}
    </ul>
    <div className='pagination'>
      <Pagination
        total={totalLinks}
        pageSize={perPage}
        current={Number(page)}
        onChange={(current, pageSize) => {
          const start = query && query.start
          const end = query && query.end
          if (start && end) {
            Router.push(`/?start=${start}&end=${end}&page=${current}`)
              .then(() => window.scrollTo(0, 0))
              .catch(e => console.log(e))
          } else {
            Router.push(`/?page=${current}`)
              .then(() => window.scrollTo(0, 0))
              .catch(e => console.log(e))
          }
        }}
      />
    </div>
    <Footer />
    <style jsx>
      {
        `
          main {
            padding-top: 70px;
            margin-left: 200px;
          }
          .info span {
            text-align: center;
            padding: 10px 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .info span > strong {
            margin: 0 5px;
            font-size: 20px;
          }
          .filterDetails {
            border: 1px solid #888;
            width: 250px;
            padding: 5px;
            text-align: center;
            border-radius: 10px;
            margin-left: 5px;
          }
          .filterDetails a {
            margin-left: 10px;
            text-transform: capitalize;
            text-decoration: none;
            cursor: pointer;
          }
          .filterDetails a:hover {
            text-decoration: underline
          }
          .list {
            list-style-type: none;
            margin: 0 auto;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
          }
          .pagination{
            display: flex;
            justify-content: center;
          }
          @media(max-width: 720px) {
            main {
              margin: 0 20px;
            }
          }
          @media(max-width: 520px) {
            .info span {
              flex-wrap: wrap;
            }
            .filterDetails {
              margin-top: 10px;
            }
          }
        `
      }
    </style>
  </main>
)
