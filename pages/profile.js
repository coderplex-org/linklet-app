import React from 'react'
import Header from '../components/Header'
import BottomBar from '../components/BottomBar'
import { initGA, logPageView } from '../lib/analytics'

export default class Profile extends React.Component {
  componentDidMount () {
    initGA()
    logPageView()
  }
  render () {
    return (
      <div className='Profile'>
        <Header title='Linklet | Profile' />
        <main>
          <h1>Profile</h1>
          <p>
            😎 Implement Soon!...
          </p>
        </main>
        <BottomBar url={this.props.url} />
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
        p {
          color: #444;
          letter-spacing: 2px;
          line-height: 2;
          max-width: 600px;
          margin: 20px auto;
        }
        `
          }
        </style>
      </div>
    )
  }
}
