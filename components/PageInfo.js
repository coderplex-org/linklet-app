import Link from 'next/link'
import format from 'date-fns/format'

export default ({ query, page, totalLinks }) => {
  if (query.start && query.end) {
    return (
      <div className='info'>
        <p>
          <strong>Total: {totalLinks} </strong>link/s were found from <span>
            <strong>
              {
                `${format(Number(query.start), 'MMM Do')} to ${format(Number(query.end), 'MMM Do')} ${query.search ? `containing ${query.search} word` : ''}`
              }
              {' '}
            </strong>
            <Link href='/' scroll><a>clear</a></Link>
          </span>
        </p>
        <p className='pageNum'>
          Page: {page}
        </p>
        <style jsx>
          {
            `
          .info {
            width: 100%;
            position: relative;
          }
          .info p {
            text-align: center;
          }
          p span {
            border: 1px solid #888;
            border-radius: 4px;
            padding: 10px;
          }
          p span a {
            text-transform: capitalize;
            text-decoration: none;
          }
          p span a:hover {
            text-decoration: underline;
          }
          .pageNum {
            color: #999;
            font-size: 14x;
            margin: 0;
            padding: 0;
          }
          @media(max-width: 520px) {
            p {
              display: flex;
              flex-direction: column;
            }
            p > * {
              margin: 5px 0;
            }
            p span strong {
              margin-right: 10px;
            }
          }
        `
          }
        </style>
      </div>
    )
  } else {
    return (
      <div className='info'>
        {query.search
          ? <p>
              Total:
              {' '}
            <strong> {totalLinks} </strong>
              link/s were found containing word
              {' '}
            <strong>{query.search}</strong>
          </p>
          : <p>
              Total: <strong> {totalLinks} </strong>link/s were added upto now
            </p>}

        <p className='pageNum'>
          Page: {page}
        </p>
        <style jsx>
          {
            `
          .info {
            width: 100%;
            position: relative;
          }
          .info p {
            text-align: center;
          }
          .pageNum {
            color: #999;
            font-size: 14x;
            margin: 0;
            padding: 0;
          }
        `
          }
        </style>
      </div>
    )
  }
}
