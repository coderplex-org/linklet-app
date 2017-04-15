import React from 'react'
import Header from '../components/Header'
import { initGA, logPageView } from '../lib/analytics'
import FaGithub from 'react-icons/lib/fa/github'

export default class Profile extends React.Component {
  componentDidMount () {
    initGA()
    logPageView()
  }
  render () {
    return (
      <div className='Profile'>
        <Header url={this.props.url} title='Linklet | Profile' />
        <main>
          <div className='dummy'>
            <div className='avatar' />
            <div className='info'>
              <div className='name' />
              <div className='links-shared' />
              <div className='notifications' />
            </div>
            <button>
              <FaGithub size={40} />
              <span>Login With Github</span>
            </button>
          </div>
        </main>
        <style jsx>
          {
            `
        .Profile {
          min-height: 100%;
          width: 100%;
        }
        main {
          padding: 70px 20px 200px 20px;
          text-align: center;
        }
        .dummy {

        }
        .avatar {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: #eee;
          margin: 30px auto;
        }
        .name, .links-shared, .notifications{
          width: 280px;
          height: 20px;
          background: #eee;
          margin: 40px auto;
          border-radius: 4px;
        }
        .links-shared {
          width: 250px;
        }
        .notifications {
          width: 200px;
        }
        button {
          margin: 20px 20px 0 20px;
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
          align-self: right;
        }
        button span {
          padding: 0 5px; 
        }
        button:hover {
          background: #111;
        }
        @media (max-width: 720px) {
          .avatar, .name, .links-shared, .notifications{
            margin: 20px auto;
          }
        }
        `
          }
        </style>
      </div>
    )
  }
}
