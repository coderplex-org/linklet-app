import Link from 'next/link'
import format from 'date-fns/format'

const renderInfo = (query, totalLinks, url) => {
  if (query && query.start && query.end) {
    if (query.search) {
      return (
        <p className='text-center'>
          Total:
          {' '}
          <strong>{totalLinks}</strong>
          {' '}
          {url.pathname === '/bookmarks' ? 'bookmark/s' : 'link/s'}
          {' '}
          were found from
          <span>
            {' ' +
              `${format(Number(query.start), 'MMM, Do YYYY')} to ${format(
                Number(query.end),
                'MMM, Do YYYY'
              )} ${query.search ? `containing ${query.search} word` : ''}` +
              ' '}
            <Link href={`${url.pathname}?sort=${query.sort || -1}`} scroll>
              <a>clear</a>
            </Link>
          </span>
          <style jsx>
            {`
              .text-center {
                text-align: center;

                width: 100%;
                line-height: 2;
                margin: 10px 0 0 0;
                padding: 0;
                font-size: 12px;
              }
              span {
                font-weight: bold;
                text-transform: capitalize;
              }
              span a {
                color: red;
                margin: 0 10px;
                text-decoration: none;
              }
              span a:hover {
                color: teal;
              }
            `}
          </style>
        </p>
      )
    } else {
      return (
        <p className='text-center'>
          Total:
          {' '}
          <strong>{totalLinks}</strong>
          {' '}
          {url.pathname === '/bookmarks' ? 'bookmark/s' : 'link/s'}
          {' '}
          were found from
          <span>
            {' ' +
              `${format(Number(query.start), 'MMM, Do YYYY')} to ${format(
                Number(query.end),
                'MMM, Do YYYY'
              )}` +
              ' '}
            <Link href={`${url.pathname}?sort=${query.sort || -1}`} scroll>
              <a>clear</a>
            </Link>
          </span>
          <style jsx>
            {`
              .text-center {
                text-align: center;

                width: 100%;
                line-height: 2;
                margin: 10px 0 0 0;
                padding: 0;
                font-size: 12px;
              }
              span {
                font-weight: bold;
                text-transform: capitalize;
                padding: 10px;
              }
              span a {
                color: red;
                margin: 0 10px;
                text-decoration: none;
              }
              span a:hover {
                color: lightred;
              }
            `}
          </style>
        </p>
      )
    }
  } else {
    if (query && query.search) {
      return (
        <p className='text-center'>
          Total:
          {' '}
          <strong>{totalLinks}</strong>
          {' '}
          {url.pathname === '/bookmarks' ? 'bookmark/s' : 'link/s'}
          {' '}
          were found containing word
          <span>
            {' ' + query.search + ' '}
            <Link href={`${url.pathname}?sort=${query.sort || -1}`} scroll>
              <a>clear</a>
            </Link>
          </span>
          <style jsx>
            {`
              .text-center {
                text-align: center;

                width: 100%;
                line-height: 2;
                margin: 10px 0 0 0;
                padding: 0;
                font-size: 12px;
              }
              span {
                font-weight: bold;
                text-transform: capitalize;
                padding: 10px;
              }
              span a {
                color: red;
                margin: 0 10px;
                text-decoration: none;
              }
              span a:hover {
                color: lightred;
              }
            `}
          </style>
        </p>
      )
    } else {
      return (
        <p className='text-center'>
          Total:
          {' '}
          <strong>{totalLinks}</strong>
          {' '}
          {url.pathname === '/bookmarks' ? 'bookmark/s' : 'link/s'}
          {' '}
          were added till today.
          <style jsx>
            {`
              .text-center {
                text-align: center;

                width: 100%;
                line-height: 2;
                margin: 10px 0 0 0;
                padding: 0;
                font-size: 12px;
              }
            `}
          </style>
        </p>
      )
    }
  }
}

export default ({ query, page, totalLinks, url, handelSort }) => {
  const sort = (query && query.sort) || -1
  return (
    <div>
      <div className='info'>
        {renderInfo(query, totalLinks, url)}
      </div>
      <div className='flex'>
        <p className='page-num'>Page: {page}</p>
        <div className='sort'>
          <div className='title'>Sort By:</div>
          <select value={sort} onChange={handelSort} name='sort' id='sort'>
            <option value='-1'>New to Old</option>
            <option value='1'>Old to New</option>
            <option value='-2'>Views - high to low</option>
            <option value='2'>Views - low to high</option>
            <option value='-3'>Bookmarks - high to low</option>
            <option value='3'>Bookmarks - low to high</option>
          </select>
        </div>
      </div>
      <style jsx>
        {`
          .page-num {
            text-align: center;
            width: 100%;
            margin: 10px 0 0 0;
            padding: 0;
            font-size: 12px;
          }
          div {
            position: relative;
          }
          .sort {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 120px;
            width: 160px;
            display: flex;
            align-items: center;
          }
          .sort .title {
            font-size: 12px;
            font-weight: bold;
          }
          select {
            width: 100px;
            margin-left: 5px;
            background: #fff;
          }
          @media (max-width: 950px) {
            .sort {
              right: 30px;
            }
          }
          @media (max-width: 1020px) {
            .sort {
              right: 10px;
            }
          }
          @media (max-width: 600px) {
            .sort {
              position: static;
              flex: 1;
              transform: translateY(0);
            }
            .page-num {
              flex: 1;
              margin: 0;
            }
            .flex {
              display: flex;
              align-items: center;
              margin: 10px 0;
            }
          }
        `}
      </style>
    </div>
  )
}
