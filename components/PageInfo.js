import Link from 'next/link'
import format from 'date-fns/format'

const renderInfo = (query, totalLinks) => {
  if (query && query.start && query.end) {
    if (query.search) {
      return (
        <p className='text-center'>
          Total: <strong>{totalLinks}</strong> were found from
          <span>
            {' ' +
              `${format(Number(query.start), 'MMM Do')} to ${format(Number(query.end), 'MMM Do')} ${query.search ? `containing ${query.search} word` : ''}` +
              ' '}
            <Link href='/' scroll><a>clear</a></Link>
          </span>
          <style jsx>
            {
              `
          .text-center {
            text-align: center;
            width: 100%;
            line-height: 2;
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
        `
            }
          </style>
        </p>
      )
    } else {
      return (
        <p className='text-center'>
          Total: <strong>{totalLinks}</strong> were found from
          <span>
            {' ' +
              `${format(Number(query.start), 'MMM Do')} to ${format(Number(query.end), 'MMM Do')}` +
              ' '}
            <Link href='/' scroll><a>clear</a></Link>
          </span>
          <style jsx>
            {
              `
          .text-center {
            text-align: center;
            width: 100%;
            line-height: 2;
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
        `
            }
          </style>
        </p>
      )
    }
  } else {
    if (query && query.search) {
      return (
        <p className='text-center'>
          Total: <strong>{totalLinks}</strong> were found containing word
          <span>
            {' ' + query.search + ' '}
            <Link href='/' scroll><a>clear</a></Link>
          </span>
          <style jsx>
            {
              `
          .text-center {
            text-align: center;
            width: 100%;
            line-height: 2;
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
        `
            }
          </style>
        </p>
      )
    } else {
      return (
        <p className='text-center'>
          Total: <strong>{totalLinks}</strong> were added till today.
          <style jsx>
            {
              `
          .text-center {
            text-align: center;
            width: 100%;
            line-height: 2;
          }
        `
            }
          </style>
        </p>
      )
    }
  }
}

export default ({ query, page, totalLinks }) => {
  return (
    <div>
      <div className='info'>
        {renderInfo(query, totalLinks)}
      </div>
      <p className='text-center'>Page: {page}</p>
      <style jsx>
        {
          `
        .text-center {
          text-align: center;
          width: 100%;
        }
      `
        }
      </style>
    </div>
  )
}
