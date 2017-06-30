import React from 'react'
import { truncateString } from '../utils'
import Highlighter from 'react-highlight-words'
import LazyLoad from 'react-lazyload'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'
import isThisMonth from 'date-fns/is_this_month'
import FaBookmark from 'react-icons/lib/fa/bookmark'
import FaBookmarkO from 'react-icons/lib/fa/bookmark-o'
import FaEye from 'react-icons/lib/fa/eye'
import FaWA from 'react-icons/lib/fa/whatsapp'
import FaExt from 'react-icons/lib/fa/external-link'

export default class MLinkCard extends React.Component {
  render () {
    const { link, query: { search } = {}, user } = this.props
    const likedLinkClass =
      user && link.bookmarkedBy && ~link.bookmarkedBy.indexOf(user._id)
        ? 'liked'
        : ''
    const defaultBg =
      'https://res.cloudinary.com/vinaypuppal/image/upload/v1493986755/diagmonds-light_libvwv.png'
    return (
      <li key={link._id} className='list__item'>
        <a
          onClick={() => this.props.handelOpen(link._id)}
          className='open'
          rel='noopener'
          href={link.url}
          target='_blank'
        >
          <div className='left'>
            <h5 className='title'>
              <Highlighter
                highlightClassName='highlight'
                searchWords={[search]}
                textToHighlight={
                  link.title ? truncateString(link.title, 60) : link.url
                }
              />
            </h5>
            <p className='desc'>
              {link.description
                ? <Highlighter
                  highlightClassName='highlight'
                  searchWords={[search]}
                  textToHighlight={truncateString(link.description, 90)}
                  />
                : 'No Description'}
            </p>
          </div>
          <div className='right'>
            {link.image
              ? <div className='image'>
                <LazyLoad height={80} offset={100}>
                  <img
                    src={`//images.weserv.nl/?url=${link.image
                        .replace('http://', '')
                        .replace('https://', '')}&w=80&h=80`}
                    alt={'No Img'}
                    />
                </LazyLoad>
              </div>
              : <div
                style={{
                  backgroundImage: `url(${`//images.weserv.nl/?url=${defaultBg
                      .replace('http://', '')
                      .replace('https://', '')}&w=80&h=80`})`
                }}
                className='image'
                />}
          </div>
        </a>
        <div className='meta'>
          <div className='by'>
            {link._creator
              ? <a
                className='by-user'
                rel='noopener'
                href={`https://github.com/${link._creator.username}`}
                target='_blank'
                >
                <LazyLoad height={20} offset={50}>
                  <img
                    src={`//images.weserv.nl/?url=${link._creator.avatarUrl
                        .replace('http://', '')
                        .replace('https://', '')}&w=20&h=20&shape=circle`}
                    alt={link._creator.username}
                    />
                </LazyLoad>
                <span>
                  {link._creator.username}
                </span>
              </a>
              : <span className='wa'>
                <FaWA size={20} />Added From Whatsapp Group
                </span>}
            <span>
              {' '}-{' '}
              {isThisMonth(link.timestamp)
                ? distanceInWordsToNow(link.timestamp) + ' ' + 'ago'
                : format(link.timestamp, 'MMM, Do YYYY')}
            </span>
          </div>
          <div className='bookmark'>
            <a
              title='bookmark'
              className={`like__btn ${likedLinkClass}`}
              onClick={e => {
                e.preventDefault()
                this.props.handelLike(link._id)
              }}
              href='#'
            >
              {likedLinkClass ? <FaBookmark /> : <FaBookmarkO />}
              <span>
                {link.bookmarkedBy ? link.bookmarkedBy.length : 0}
              </span>
            </a>
          </div>
          <div className='views'>
            <span title='Views'>
              <FaEye />
              <span>
                {link.views || 0}
              </span>
            </span>
          </div>
          <div className='ext-link'>
            <a
              onClick={() => this.props.handelOpen(link._id)}
              rel='noopener'
              href={link.url}
              target='_blank'
            >
              <FaExt />
            </a>
          </div>
        </div>
        <style jsx>{`
          .list__item {
            background: #fff;
            border-bottom: 1px solid #ddd;
            width: 480px;
            margin: 20px;
            box-shadow: 0 2px 2px 0 rgba(63, 81, 181, 0.14);
            transition: box-shadow .35s ease-out, transform .3s ease-out,
              opacity .2s ease-out;
            border-radius: 4px;
          }
          .list__item:hover {
            transform: translate(0, -2px) scale(1.05);
            box-shadow: 0 8px 4px 0 rgba(63, 81, 181, 0.12);
          }
          a.open {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            text-decoration: none;
          }
          .left {
            padding-right: 10px;
            flex: 2;
          }
          .right {
            overflow: hidden;
          }
          .title {
            color: #000;
            margin: 5px 0;
            font-weight: 500;
          }
          .desc {
            font-size: 14px;
            color: #666;
            margin: 5px 0;
          }
          .image {
            width: 80px;
            height: 80px;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
          }
          .image img {
            width: 100%;
            height: 80px;
          }
          .meta {
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #ddd;
          }
          .by {
            font-size: 12px;
          }
          .by,
          .by a {
            color: #666;
            display: flex;
            align-items: center;
          }
          .by a span {
            margin: 0 5px;
          }
          .wa {
            display: flex;
            align-items: center;
            margin-right: 5px;
            text-decoration: underline;
          }
          .bookmark a,
          .ext-link a,
          .views span {
            color: #666;
            text-decoration: none;
            display: flex;
            align-items: center;
            transition: color 0.25s;
          }
          .bookmark a span,
          .ext-link a span,
          .views span span {
            margin-left: 5px;
          }
          .bookmark .like__btn:hover,
          .bookmark .like__btn.liked,
          .bookmark .like__btn.liked:hover {
            color: red;
          }
          .ext-link a:hover {
            color: indigo;
          }
          @media (max-width: 1020px) {
            .list__item {
              width: calc(50% - 20px);
              margin: 20px 10px;
            }
          }
          @media (max-width: 720px) {
            .list__item {
              width: 100%;
              margin: 1px 0;
              box-shadow: none;
              border-radius: 0;
            }
            .list__item:hover {
              transform: translate(0, 0);
              box-shadow: none;
            }
            .ext-link {
              display: none;
            }
          }
          @media (max-width: 480px) {
            .by {
              font-size: 10px;
            }
          }
          @media (max-width: 320px) {
            .by {
              font-size: 8px;
            }
          }
        `}</style>
      </li>
    )
  }
}
