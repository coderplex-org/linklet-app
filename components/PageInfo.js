import Link from 'next/link'
import format from 'date-fns/format'

const renderInfo = (query, totalLinks, url) => {
  if (query && query.start && query.end) {
    if (query.search) {
      return (
        <p className='text-center'>
          Total: <strong>{totalLinks}</strong> link/s were found from
          <span>
            {' ' +
              `${format(Number(query.start), 'MMM, Do YYYY')} to ${format(Number(query.end), 'MMM, Do YYYY')} ${query.search ? `containing ${query.search} word` : ''}` +
              ' '}
            <Link href={`${url.pathname}`} scroll><a>clear</a></Link>
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
            color: blue;
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
          Total: <strong>{totalLinks}</strong> link/s were found from
          <span>
            {' ' +
              `${format(Number(query.start), 'MMM, Do YYYY')} to ${format(Number(query.end), 'MMM, Do YYYY')}` +
              ' '}
            <Link href={`${url.pathname}`} scroll><a>clear</a></Link>
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
            color: blue;
            margin: 0 10px;
            text-decoration: none;
          }
          span a:hover {
            color: lightblue;
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
          Total: <strong>{totalLinks}</strong> link/s were found containing word
          <span>
            {' ' + query.search + ' '}
            <Link href={`${url.pathname}`} scroll><a>clear</a></Link>
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
            color: blue;
            margin: 0 10px;
            text-decoration: none;
          }
          span a:hover {
            color: lightblue;
          }
        `}
          </style>
        </p>
      )
    } else {
      return (
        <p className='text-center'>
          Total: <strong>{totalLinks}</strong> link/s were added till today.
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

export default ({ query, page, totalLinks, url }) => {
  return (
    <div>
      <div className='info'>
        {renderInfo(query, totalLinks, url)}
      </div>
      <p className='text-center'>Page: {page}</p>
      <style jsx>
        {`
        .text-center {
          text-align: center;
          width: 100%;
          margin: 10px 0 0 0;
          padding: 0;
          font-size: 12px;
        }
      `}
      </style>
    </div>
  )
}
