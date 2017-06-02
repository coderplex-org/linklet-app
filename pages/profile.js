import React from 'react'
import NProgress from 'nprogress'
import Header from '../components/Header'
import { logPageView } from '../lib/analytics'
import FaGithub from 'react-icons/lib/fa/github'
import FaSignOut from 'react-icons/lib/fa/sign-out'

import ContainerPage from '../hocs/ContainerPage'
import PublicPage from '../hocs/PublicPage'

import { login, logout } from '../utils/authenticate'

class Profile extends React.Component {
  componentDidMount () {
    logPageView()
    console.log(this.props)
  }
  render () {
    return (
      <div className='Profile'>
        <Header
          user={this.props.user}
          url={this.props.url}
          title='Linklet | Profile'
        />
        <main>
          <p className='info'>
            {this.props.url.query && this.props.url.query.next === '/my-links'
              ? 'Please login to view links added by you!...'
              : this.props.url.query &&
                  this.props.url.query.next === '/submit-link'
                  ? 'Please login to submit new link'
                  : ''}
          </p>
          {this.props.isAuthenticated
            ? <div className='actual'>
              <div className='avatar'>
                <img
                  src={`//images.weserv.nl/?url=${this.props.user.avatarUrl
                      .replace('http://', '')
                      .replace('https://', '')}&w=180&h=180&&shape=circle`}
                  alt={this.props.username}
                  />
              </div>
              <div className='username'>
                  @{this.props.user.username}
              </div>
              {this.props.user.name &&
              <div className='name'>
                <span className='label'>Name</span>
                <span className='value'>
                  {this.props.user.name}
                </span>
              </div>}
              {this.props.user.email &&
              <div className='email'>
                <span className='label'>Email</span>
                <span className='value'>
                  {this.props.user.email}
                </span>
              </div>}
              <button
                onClick={() => {
                  NProgress.start()
                  logout()
                }}
                >
                <FaSignOut size={20} />
                <span>LogOut</span>
              </button>
            </div>
            : <div className='dummy'>
              <div className='avatar' />
              <div className='info'>
                <div className='name' />
                <div className='links-shared' />
                <div className='notifications' />
              </div>
              <button
                onClick={() => {
                  NProgress.start()
                  login()
                }}
                >
                <FaGithub size={40} />
                <span>Login With Github</span>
              </button>
            </div>}
        </main>
        <style jsx>
          {`
        .Profile {
          min-height: 100%;
          width: 100%;
        }
        main {
          padding: 70px 20px 20px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        p.info {
          font-weight: bold;
        }
        .dummy .avatar {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: #eee;
          margin: 10px auto;
        }
        .dummy .name,
        .dummy .links-shared,
        .dummy .notifications{
          width: 280px;
          height: 20px;
          background: #eee;
          margin: 10px auto;
          border-radius: 4px;
        }
        .dummy .links-shared {
          width: 250px;
        }
        .dummy .notifications {
          width: 200px;
        }
        .actual .avatar img {
          border-radius: 50%;
          margin: 20px auto;
        }
        .actual .username {
          font-weight: 600;
          font-size: 24px;
          margin: 20px auto;
        }
        .actaul .name,
        .actual .email {
          margin: 20px auto;
        }
        .actual .label{
          margin-right: 20px;
          font-weight: bold;
        }
        button {
          width: 100%;
          margin: 50px 0;
          border: none;
          outline: none;
          -webkit-appearence: none;
          padding: 10px 20px;
          color: #fff;
          font-size: 16px;
          text-transform: uppercase;
          background: #222;
          border-radius: 4px;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        button span {
          padding: 0 5px; 
        }
        button:hover {
          background: #111;
        }
        .actual button {
          background: #f1f2f3;
          color: #222;
          font-size: 12px;
          padding: 10px;
        }
        .actual button:hover {
          background: #eee;
        }
        @media (max-width: 720px) {
          main {
            padding-bottom: 60px;
          }
          .dummy .avatar,
          .dummy .name, 
          .dummy .links-shared,
          .dummy .notifications{
            margin: 10px auto;
          }
          .dummy .avatar {
            width: 100px;
            height: 100px;
          }
          .dummy button {
            margin: 20px auto;
          }
          .actual .avatar {
            margin: 0 auto;
            text-align: center;
          }
          .actual .avatar img {
            margin: 0 auto 10px auto;
            width: 100px;
            height: 100px;
          }
        }
        `}
        </style>
      </div>
    )
  }
}

export default ContainerPage(PublicPage(Profile))
