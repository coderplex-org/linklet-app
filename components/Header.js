import React from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
import Link from 'next/link'
import Meta from './Meta'
import GlobalStyles from './GlobalStyles'
import LinkIcon from './LinkIcon'
import FilterIcon from './FilterIcon'
import BottomBar from './BottomBar'
import { logEvent } from '../lib/analytics'
import NotificationBtn from './Notification'
import FaSpinner from 'react-icons/lib/fa/spinner'

console.log('started')
Router.onRouteChangeStart = () => {
  console.log('started listening')
  NProgress.start()
}

Router.onRouteChangeComplete = url => {
  logEvent('Navigation', `Navigated to ${url}`)
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interactive: false
    }
  }
  componentDidMount () {
    this.setState({
      interactive: true
    })
  }
  render () {
    return (
      <header>
        <Meta title={this.props.title} />
        <GlobalStyles />
        <Link href='/'>
          <a className='logo'>
            <LinkIcon />
            <h1>
              <span>Link</span>
              <span>let</span>
            </h1>
          </a>
        </Link>
        <nav>
          <BottomBar user={this.props.user} url={this.props.url} />

          {this.state.interactive
            ? <ul>
              {this.props.about &&
              <li className='filterBtn'>
                <a onClick={this.props.toggleFilter} href='#'>
                  <FilterIcon />
                </a>
              </li>}
              <NotificationBtn />
            </ul>
            : <ul>
              <li className='spinner'>
                <FaSpinner size={20} />
              </li>
            </ul>}
        </nav>
        <style jsx>
          {`
            header {
              background: #253592;
              height: 56px;
              width: 100%;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
              position: fixed;
              top: 0;
              left: 0;
              z-index: 9;
              display: flex;
              align-items: center;
            }
            .spinner {
              color: #fff;
              animation: load3 1.4s infinite linear;
            }
            @keyframes load3 {
              0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
              }
              100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
              }
            }
            nav {
              width: 100%;
              padding: 0 30px;
              display: flex;
            }
            nav ul {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              list-style: none;
              padding: 0;
              margin: 0;
            }
            nav ul li {
              margin: 0 30px;
            }
            nav ul li a {
              text-decoration: none;
              color: #fff;
              font-weight: bold;
              cursor: pointer;
            }
            nav ul li a:hover {
              color: #ccc;
            }
            .filterBtn {
              display: none;
            }
            .logo {
              display: flex;
              align-items: center;
              margin-left: 20px;
              text-decoration: none;
            }
            .logo h1 {
              margin: 0;
              padding: 0 5px;
              font-size: 24px;
              line-height: 56px;
              color: #FFF;
              text-align: center;
            }
            .logo h1 span:first-child {
              color: #FFD15C;
            }
            .logo h1 span {
              color: #FF7058;
            }
            @media (max-width: 1020px) {
              .filterBtn {
                display: block;
              }
            }
            @media (max-width: 1020px) {
              nav {
                display: block;
              }
            }
          `}
        </style>
      </header>
    )
  }
}
