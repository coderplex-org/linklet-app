import format from 'date-fns/format'
import addDays from 'date-fns/add_days'
import Router from 'next/router'

const changeRoute = (start, end, props) => {
  const search = props.url.query
    ? props.url.query.search ? props.url.query.search : null
    : null
  const sort = props.url.query
    ? props.url.query.sort ? props.url.query.sort : null
    : null
  console.log({ start, end, search, sort })
  if (search) {
    if (sort) {
      Router.push(
        `${props.url.pathname}?start=${start}&end=${end}&search=${search}&sort=${sort}`
      )
        .then(() => window.scrollTo(0, 0))
        .catch(e => console.log(e))
    } else {
      Router.push(
        `${props.url.pathname}?start=${start}&end=${end}&search=${search}`
      )
        .then(() => window.scrollTo(0, 0))
        .catch(e => console.log(e))
    }
  } else {
    if (sort) {
      Router.push(
        `${props.url.pathname}?start=${start}&end=${end}&sort=${sort}`
      )
        .then(() => window.scrollTo(0, 0))
        .catch(e => console.log(e))
    } else {
      Router.push(`${props.url.pathname}?start=${start}&end=${end}`)
        .then(() => window.scrollTo(0, 0))
        .catch(e => console.log(e))
    }
  }
}

export default props => {
  const {
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
  } = props.filterOptions

  const todayStr = format(today, 'dddd, MMM Do')
  const yesterdayStr = format(yesterday, 'dddd, MMM Do')
  const last7Days = `${format(last7thDay, 'MMM Do')} - ${format(today, 'MMM Do')}`
  const thisWeek = `${format(thisWeekStartDay, 'MMM Do')} - ${format(thisWeekLastDay, 'MMM Do')}`
  const lastWeek = `${format(lastWeekStartDay, 'MMM Do')} - ${format(lastWeekLastDay, 'MMM Do')}`
  const last30days = `${format(last30thDay, 'MMM Do')} - ${format(today, 'MMM Do')}`
  const thisMonth = format(today, 'MMMM')
  const lastMonth = format(last30thDay, 'MMMM')
  return (
    <aside className={props.filterOpenState ? 'show' : ''}>
      <h3>Filter By</h3>
      <main>
        <section>
          <h4># Day</h4>
          <ul>
            <li>
              <div className='input'>
                <input
                  onClick={() => {
                    console.log('clicked')
                    props.toggleFilter()
                    changeRoute(
                      new Date(yesterday).getTime(),
                      new Date(today).getTime(),
                      props
                    )
                  }}
                  id='today'
                  type='radio'
                  name='filter'
                />
              </div>
              <label htmlFor='today'>
                <div className='title'>Today</div>
                <div className='sub-title'>
                  {todayStr}
                </div>
              </label>
            </li>
            <li>
              <div className='input'>
                <input
                  onClick={() => {
                    props.toggleFilter()
                    changeRoute(
                      addDays(yesterday, -1).getTime(),
                      new Date(yesterday).getTime(),
                      props
                    )
                  }}
                  id='yesterday'
                  type='radio'
                  name='filter'
                />
              </div>
              <label htmlFor='yesterday'>
                <div className='title'>Yesterday</div>
                <div className='sub-title'>
                  {yesterdayStr}
                </div>
              </label>
            </li>
          </ul>
        </section>
        <section>
          <h4># Week</h4>
          <ul>
            <li>
              <div className='input'>
                <input
                  onClick={() => {
                    props.toggleFilter()
                    changeRoute(
                      new Date(last7thDay).getTime(),
                      new Date(today).getTime(),
                      props
                    )
                  }}
                  id='last-seven-days'
                  name='filter'
                  type='radio'
                />
              </div>
              <label htmlFor='last-seven-days'>
                <div className='title'>Last 7 days</div>
                <div className='sub-title'>
                  {last7Days}
                </div>
              </label>
            </li>
            <li>
              <div className='input'>
                <input
                  onClick={() => {
                    props.toggleFilter()
                    changeRoute(
                      new Date(thisWeekStartDay).getTime(),
                      new Date(thisWeekLastDay).getTime(),
                      props
                    )
                  }}
                  id='this-week'
                  name='filter'
                  type='radio'
                />
              </div>
              <label htmlFor='this-week'>
                <div className='title'>This week</div>
                <div className='sub-title'>
                  {thisWeek}
                </div>
              </label>
            </li>
            <li>
              <div className='input'>
                <input
                  onClick={() => {
                    props.toggleFilter()
                    changeRoute(
                      new Date(lastWeekStartDay).getTime(),
                      new Date(lastWeekLastDay).getTime(),
                      props
                    )
                  }}
                  id='last-week'
                  name='filter'
                  type='radio'
                />
              </div>
              <label htmlFor='last-week'>
                <div className='title'>Last week</div>
                <div className='sub-title'>
                  {lastWeek}
                </div>
              </label>
            </li>
          </ul>
        </section>
        <section>
          <h4># Month</h4>
          <ul>
            <li>
              <div className='input'>
                <input
                  onClick={() => {
                    props.toggleFilter()
                    changeRoute(
                      new Date(last30thDay).getTime(),
                      new Date(today).getTime(),
                      props
                    )
                  }}
                  id='last-30-days'
                  name='filter'
                  type='radio'
                />
              </div>
              <label htmlFor='last-30-days'>
                <div className='title'>Last 30 days</div>
                <div className='sub-title'>
                  {last30days}
                </div>
              </label>
            </li>
            <li>
              <div className='input'>
                <input
                  onClick={() => {
                    props.toggleFilter()
                    changeRoute(
                      new Date(thisMonthStartDay).getTime(),
                      new Date(today).getTime(),
                      props
                    )
                  }}
                  id='this-month'
                  name='filter'
                  type='radio'
                />
                <span />
              </div>
              <label htmlFor='this-month'>
                <div className='title'>This month</div>
                <div className='sub-title'>
                  {thisMonth}
                </div>
              </label>
            </li>
            <li>
              <div className='input'>
                <input
                  onClick={() => {
                    props.toggleFilter()
                    changeRoute(
                      new Date(lastMonthStartDay).getTime(),
                      new Date(lastMonthEndDay).getTime(),
                      props
                    )
                  }}
                  id='last-month'
                  name='filter'
                  type='radio'
                />
              </div>
              <label htmlFor='last-month'>
                <div className='title'>Last month</div>
                <div className='sub-title'>
                  {lastMonth}
                </div>
              </label>
            </li>
          </ul>
        </section>
        <section>
          <h4># Custom</h4>
          <ul>
            <li>
              <div className='input'>
                <input
                  onClick={e => {
                    props.toggleFilter()
                    props.showModal()
                  }}
                  name='filter'
                  id='custom'
                  type='radio'
                />
              </div>
              <label htmlFor='custom'>
                <div className='title'>Select date range</div>
              </label>
            </li>
          </ul>
        </section>
      </main>
      <style jsx>
        {`
        aside {
          width: 200px;
          position: fixed;
          left: 0;
          top: 56px;
          bottom: 0;
          background: #3f51b5;
          color: #fff;
          overflow-y: auto;
          box-shadow: 0 0 4px rgba(0,0,0,.14), 2px 4px 8px rgba(0,0,0,.28);
          z-index: 3;
        }
        main {
          padding: 0 20px;
        }
        section {
          margin: 0 0 20px 0;
        }
        h3 {
          color: #FFD15C;
          padding: 0 20px;
        }
        section h4 {
          margin: 0 0 15px 0;
          color: #FF7058;
        }
        section ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        section ul li {
          display: flex;
          align-items: center;
          margin: 10px 0;
        }
        li label {
          margin-left: 10px;
          font-size: 12px;
          line-height: 1.5;
          cursor: pointer;
        }
        label .title {
          font-weight: bold;
        }
        @media(max-width: 720px) {
          aside {
            width: 100%;
            display: none;
            top: 56px;
            bottom: 56px;
          }
          aside.show {
            display: block;
          }
          main {
            display: flex;
            flex-wrap: wrap;
            position: relative;
            height: 0;
          }
          h3 {
            text-align: center;
          }
          main section {
            width: calc(50% - 40px);
            margin: 20px;
          }
        }
        @media(max-width: 480px) {
          main section {
            width: calc(100% - 40px);
            margin: 20px;
          }
        }
      `}
      </style>
    </aside>
  )
}
