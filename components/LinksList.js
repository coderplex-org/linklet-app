import React from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import Pagination from 'rc-pagination'
import MLinkCard from './MLinkCard'
// import LinkCard from './LinkCard'
import PageInfo from './PageInfo'
import SearchBar from '../components/Search'
import db from '../lib/db'
import SnackBar from '../components/Snackbar'

export default class LinksList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      message: ''
    }
  }
  onSanckbarClose () {
    console.log('snackbar closed')
    this.setState({
      show: false,
      message: ''
    })
  }
  handelOpen (_id) {
    console.log(_id)
    db
      .incrementView(_id)
      .then(({ data }) => {
        this.changeRoute()
      })
      .catch(console.log)
  }
  handelLike (_id, e) {
    console.log(e)
    e && e.preventDefault()
    console.log(_id)
    if (!this.props.user) {
      this.setState({
        show: true,
        message: 'Login to "Bookmark" this link'
      })
      return
    }
    NProgress.start()
    db
      .likeLink(_id)
      .then(({ data }) => {
        NProgress.done()
        if (~data.bookmarkedBy.indexOf(this.props.user._id)) {
          this.setState({
            show: true,
            message: 'Successfully "Bookmarked" this link'
          })
        }
        this.changeRoute()
      })
      .catch(e => {
        NProgress.done()
        this.setState({
          show: true,
          message: 'Some error occured!...'
        })
        console.log(e)
      })
  }
  handelSort (e) {
    console.log(e.target.value)
    this.changeRoute(1, true, e.target.value)
  }
  changeRoute (current, scroll, sort) {
    const { url } = this.props
    const { query } = url
    const start = query && query.start
    const end = query && query.end
    const search = query && query.search
    sort = sort || (query && query.sort) || -1
    current =
      typeof current === 'undefined' ? (query.page ? query.page : 1) : current
    if (start && end) {
      if (search) {
        Router.push(
          `${url.pathname}?start=${start}&end=${end}&page=${current}&search=${search}&sort=${sort}`
        )
          .then(() => scroll && window.scrollTo(0, 0))
          .catch(e => console.log(e))
      } else {
        Router.push(
          `${url.pathname}?start=${start}&end=${end}&page=${current}&sort=${sort}`
        )
          .then(() => scroll && window.scrollTo(0, 0))
          .catch(e => console.log(e))
      }
    } else {
      if (search) {
        Router.push(
          `${url.pathname}?page=${current}&search=${search}&sort=${sort}`
        )
          .then(() => scroll && window.scrollTo(0, 0))
          .catch(e => console.log(e))
      } else {
        Router.push(`${url.pathname}?page=${current}&sort=${sort}`)
          .then(() => scroll && window.scrollTo(0, 0))
          .catch(e => console.log(e))
      }
    }
  }
  renderLinks (isMobile, links, user, query) {
    // if (isMobile) {
    return links.map(link =>
      <MLinkCard
        key={link._id}
        link={link}
        query={query}
        user={user}
        handelLike={this.handelLike.bind(this)}
        handelOpen={this.handelOpen.bind(this)}
      />
    )
    /* return links.map(link =>
      <LinkCard
        key={link._id}
        link={link}
        query={query}
        user={user}
        handelLike={this.handelLike.bind(this)}
        handelOpen={this.handelOpen.bind(this)}
      />
    ) */
  }
  render () {
    const {
      data: { links, totalLinks, perPage, page },
      url,
      user,
      isMobile
    } = this.props
    const { query } = url
    return (
      <main>
        <SearchBar url={url} query={query} />
        <PageInfo
          handelSort={this.handelSort.bind(this)}
          url={url}
          query={query}
          page={page}
          totalLinks={totalLinks}
        />
        <ul className='list'>
          {this.renderLinks(isMobile, links, user, query)}
        </ul>
        <div className='pagination'>
          <Pagination
            total={totalLinks}
            pageSize={Number(perPage)}
            current={Number(page)}
            onChange={(current, pageSize) => this.changeRoute(current, true)}
          />
        </div>
        <SnackBar
          onClose={this.onSanckbarClose.bind(this)}
          show={this.state.show}
          timer={3000}
        >
          <p>
            {this.state.message}
          </p>
        </SnackBar>
        <style jsx>
          {`
            main {
              padding: 30px 0;
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
              min-height: 250px;
            }
            .pagination {
              display: flex;
              justify-content: center;
            }
            @media (max-width: 1020px) {
              main {
                margin: 0;
                padding-top: 56px;
              }
              .list {
                margin: 0;
              }
            }
            @media (max-width: 720px) {
              .list {
                margin-top: 10px;
              }
            }
            @media (max-width: 520px) {
              .info span {
                flex-wrap: wrap;
              }
              .filterDetails {
                margin-top: 10px;
              }
            }
          `}
        </style>
      </main>
    )
  }
}
