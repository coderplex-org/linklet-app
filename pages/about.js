import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { logPageView } from '../lib/analytics'

export default class About extends React.Component {
  componentDidMount () {
    logPageView()
  }
  render () {
    return (
      <div className='about'>
        <Header url={this.props.url} title='Linklet | About' home />
        <main>
          <h1>About</h1>
          <p>
            Linklet as of now contains the links which are shared in whatsapp freeCodeCamp Hyderabad group. Since many useful links were shared in the group so I thought to create an app where we can find all links easily based on particular date.
          </p>
        </main>
        <Footer />
        <style jsx>
          {`
        .about {
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
        `}
        </style>
      </div>
    )
  }
}
