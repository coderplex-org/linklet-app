import Router from 'next/router'
import Pagination from 'rc-pagination'
import LinkCard from './LinkCard'
import PageInfo from './PageInfo'
import SearchBar from '../components/Search'

export default (
  { data: { links, isLastPage, totalLinks, perPage, page }, url: { query } }
) => (
  <main>
    <SearchBar query={query} />
    <PageInfo query={query} page={page} totalLinks={totalLinks} />
    <ul className='list'>
      {links.map(link => <LinkCard key={link._id} link={link} query={query} />)}
    </ul>
    <div className='pagination'>
      <Pagination
        total={totalLinks}
        pageSize={perPage}
        current={Number(page)}
        onChange={(current, pageSize) => {
          const start = query && query.start
          const end = query && query.end
          const search = query && query.search
          if (start && end) {
            if (search) {
              Router.push(
                `/?start=${start}&end=${end}&page=${current}&search=${search}`
              )
                .then(() => window.scrollTo(0, 0))
                .catch(e => console.log(e))
            } else {
              Router.push(`/?start=${start}&end=${end}&page=${current}`)
                .then(() => window.scrollTo(0, 0))
                .catch(e => console.log(e))
            }
          } else {
            if (search) {
              Router.push(`/?page=${current}&search=${search}`)
                .then(() => window.scrollTo(0, 0))
                .catch(e => console.log(e))
            } else {
              Router.push(`/?page=${current}`)
                .then(() => window.scrollTo(0, 0))
                .catch(e => console.log(e))
            }
          }
        }}
      />
    </div>
    <style jsx>
      {
        `
          main {
            padding: 70px 0;
            padding-top: 100px;
            margin-left: 200px;
          }
          .list {
            list-style-type: none;
            margin: 0 20px;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .pagination{
            display: flex;
            justify-content: center;
          }
          @media(max-width: 720px) {
            main {
              margin: 0;
              padding-top: 120px;
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
