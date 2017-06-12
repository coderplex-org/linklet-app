import React, { Component } from 'react'
import Router from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'

import ContainerPage from '../hocs/ContainerPage'
import SecretPage from '../hocs/SecretPage'

import mobileJs from 'ismobilejs'
import addDays from 'date-fns/add_days'
import startOfWeek from 'date-fns/start_of_week'
import lastDayOfWeek from 'date-fns/last_day_of_week'
import addWeeks from 'date-fns/add_weeks'
import startOfMonth from 'date-fns/start_of_month'
import lastDayOfMonth from 'date-fns/last_day_of_month'

import { ModalContainer, ModalDialog } from 'react-modal-dialog'

import db from '../lib/db'
import SideBar from '../components/Sidebar'
import LinksList from '../components/LinksList'

class Bookmarks extends Component {
  static async getInitialProps ({ query, req }) {
    const { start, end, page = 1, search, sort = -1 } = query

    const today = new Date()
    const yesterday = addDays(today, -1)
    const last7thDay = addDays(today, -7)
    const thisWeekStartDay = startOfWeek(today)
    const thisWeekLastDay = lastDayOfWeek(today)
    const lastWeekStartDay = startOfWeek(addWeeks(today, -1))
    const lastWeekLastDay = lastDayOfWeek(addWeeks(today, -1))
    const last30thDay = addDays(today, -31)
    const thisMonthStartDay = startOfMonth(today)
    const lastMonthStartDay = startOfMonth(last30thDay)
    const lastMonthEndDay = lastDayOfMonth(last30thDay)

    const filterOptions = {
      today,
      yesterday,
      last7thDay,
      thisWeekStartDay,
      thisWeekLastDay,
      lastWeekStartDay,
      lastWeekLastDay,
      last30thDay,
      thisMonthStartDay,
      lastMonthStartDay,
      lastMonthEndDay
    }
    let res
    try {
      if (start && end) {
        res = await db.getByFilter({
          start,
          end,
          page,
          search,
          req,
          bookmarks: true,
          sort
        })
      } else {
        res = await db.getAll({ page, search, req, bookmarks: true, sort })
      }
    } catch (e) {
      throw e
    }
    const isMobile = req
      ? mobileJs(req.headers['user-agent']).any
      : mobileJs.any
    return { data: res.data, filterOptions, isMobile }
  }
  constructor (props) {
    super(props)
    this.state = {
      toggleFilter: false,
      isShowingModal: false,
      from: null,
      to: null
    }
  }
  toggleFilter (e) {
    e && e.preventDefault()
    this.setState({
      toggleFilter: !this.state.toggleFilter
    })
  }
  handleClick () {
    this.setState({ isShowingModal: true })
  }
  handleClose () {
    this.setState({ isShowingModal: false })
  }
  handleFrom (e) {
    this.setState({
      from: e.target.value
    })
  }
  handleTo (e) {
    this.setState({
      to: e.target.value
    })
  }
  search (e) {
    const { from, to } = this.state
    this.handleClose()
    Router.push(
      `/?start=${new Date(from).getTime()}&end=${new Date(to).getTime()}`
    )
      .then(() => window.scrollTo(0, 0))
      .catch(e => console.log(e))
  }
  render () {
    const { data, filterOptions, url, user, isMobile } = this.props
    return (
      <div className='home'>
        <Header
          user={this.props.user}
          url={url}
          about
          title='Linklet | MyLinks'
          toggleFilter={this.toggleFilter.bind(this)}
        />
        <SideBar
          url={url}
          filterOptions={filterOptions}
          toggleFilter={this.toggleFilter.bind(this)}
          filterOpenState={this.state.toggleFilter}
          showModal={this.handleClick.bind(this)}
        />
        <LinksList user={user} data={data} url={url} isMobile={isMobile} />
        <Footer />
        {this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose.bind(this)}>
            <ModalDialog onClose={this.handleClose.bind(this)}>
              <h1>Select Date Range</h1>
              <p>
                <strong>From: </strong>
                <input
                  onChange={this.handleFrom.bind(this)}
                  value={this.state.from}
                  type='date'
                />
              </p>
              <p>
                <strong>To: </strong>
                <input
                  onChange={this.handleTo.bind(this)}
                  value={this.state.to}
                  type='date'
                />
              </p>
              <button onClick={this.search.bind(this)}>Search</button>
            </ModalDialog>
          </ModalContainer>}
        <style jsx>
          {`
            .home {
              min-height: 100%;
              width: 100%;
            }
            input[type=date] {
              border: none;
              width: 100%;
              font-size: 20px;
              border-bottom: 2px solid #888;
              margin-top: 10px;
              -webkit-appearance: none;
            }
            button {
              cursor: pointer;
              float: right;
              background: teal;
              border: none;
              outline: none;
              padding: 10px 20px;
              box-shadow: 0 0 5px #888;
              border-radius: 4px;
              color: #fff;

              font-size: 18px;
            }
            button:hover {
              background: green;
            }
          `}
        </style>
      </div>
    )
  }
}

export default ContainerPage(SecretPage(Bookmarks))
