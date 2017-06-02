import React from 'react'
import Header from '../components/Header'
import NProgress from 'nprogress'
import Router from 'next/router'
import LinkCard from '../components/LinkCard'
import { logPageView } from '../lib/analytics'
import db from '../lib/db'

import ContainerPage from '../hocs/ContainerPage'
import SecretPage from '../hocs/SecretPage'

class SubmitLink extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      info:
        'Simply give us the URL we will fetch metadata and show preview before you can submit it to linklet',
      url: '',
      showPreview: false,
      linkData: {},
      error: ''
    }
  }
  componentDidMount () {
    logPageView()
    this.input.focus()
  }
  handleFetch (e) {
    e && e.preventDefault()
    let url = this.state.url
    if (url && !/^https?:\/\//i.test(url)) {
      url = 'http://' + url
    }
    NProgress.start()
    db
      .getMetaData(url)
      .then(({ data }) => {
        console.log(data)
        NProgress.done()
        this.setState({
          info: 'Click Save to submit link to linklet',
          linkData: data,
          showPreview: true,
          error: ''
        })
      })
      .catch(e => {
        NProgress.done()
        console.log(e.response)
        this.setState({ error: e.response.data.message })
      })
  }
  handleSave () {
    console.log('---Saving---')
    NProgress.start()
    db
      .saveLink(this.state.linkData)
      .then(link => {
        NProgress.done()
        Router.push('/my-links')
      })
      .catch(e => {
        NProgress.done()
        let message
        console.log(e.response)
        if (e.response.data.code === 11000) {
          message =
            'Sorry, its seems like this link already exist in linklet!...'
        } else {
          message = e.message
        }
        console.log(message)
        this.setState({ error: message })
      })
  }
  handleBack () {
    this.setState({
      info:
        'Simply give us the URL we will fetch metadata and show preview before you can submit it to linklet',
      linkData: {},
      showPreview: false,
      error: ''
    })
  }
  render () {
    return (
      <div className='SubmitLink'>
        <Header
          user={this.props.user}
          url={this.props.url}
          title='Linklet | SubmitLink'
        />
        <main>
          <p className='error'>
            {this.state.error}
          </p>
          {!this.state.showPreview &&
            <div className='card'>
              <form onSubmit={this.handleFetch.bind(this)}>
                <div className='group'>
                  <input
                    ref={node => (this.input = node)}
                    onChange={e => {
                      this.setState({ url: e.target.value })
                    }}
                    value={this.state.url}
                    type='text'
                    required
                  />
                  <span className='highlight' />
                  <span className='bar' />
                  <label>URL</label>
                </div>
                <div className='group'>
                  <button type='submit'>Fetch</button>
                </div>
              </form>
            </div>}
          {this.state.showPreview &&
            <ul className='preview'>
              <LinkCard
                link={Object.assign(this.state.linkData, {
                  timestamp: new Date().getTime(),
                  _creator: this.props.user
                })}
                url={this.props.url}
              />
              {' '}
            </ul>}
          {this.state.showPreview &&
            <div className='btns'>
              <div className='group'>
                <button
                  className='secondary'
                  onClick={this.handleBack.bind(this)}
                >
                  Back
                </button>
              </div>
              <div className='group'>
                <button onClick={this.handleSave.bind(this)}>save</button>
              </div>
            </div>}
          <p className='info'>{this.state.info}</p>
        </main>
        <style jsx>
          {`
        .SubmitLink {
          min-height: 100%;
          width: 100%;
        }
        main {
          padding: 100px 20px 0 20px;
          text-align: center;
          min-height: calc(100vh - 180px);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        p {
          color: #444;
          letter-spacing: 2px;
          max-width: 480px;
          font-size: 14px;
          font-weight: 300;
          margin: 10px auto;
        }
        p.error {
          color: red;
          font-weight: bold;
        }
        .group { 
          position:relative;
        }
        .btns {
          display: flex;
          justify-content: center;
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
          background: #253592;
          border-radius: 4px;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
          cursor: pointer;
          align-self: right;
        }
        button:hover {
          background: #0d1c75;
        }
        button.secondary {
          background: #888;
        }
        button.secondary:hover {
          background: #eee;
        }
        ul.preview {
          list-style-type: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .card {
          width: 480px;
          margin: 20px auto;
          background: #fff;
          padding: 50px 30px;
          border-radius: 4px;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
        }
        input {
          font-size:18px;
          padding:10px 10px 10px 5px;
          display:block;
          width:100%;
          border:none;
          border-bottom:1px solid #757575;
          background: transparent;
        }
        input:focus { outline:none; }
        label {
          color:#999; 
          font-size:18px;
          font-weight:normal;
          position:absolute;
          pointer-events:none;
          left:5px;
          top:10px;
          transition:0.2s ease all; 
          -moz-transition:0.2s ease all; 
          -webkit-transition:0.2s ease all;
        }
        input:focus ~ label, input:valid ~ label {
          top:-20px;
          font-size:14px;
          color:#5264AE;
        }
        .bar { position:relative; display:block; width:100%; }
        .bar:before, .bar:after {
          content:'';
          height:2px; 
          width:0;
          bottom:1px; 
          position:absolute;
          background:#5264AE; 
          transition:0.2s ease all; 
          -moz-transition:0.2s ease all; 
          -webkit-transition:0.2s ease all;
        }
        .bar:before {
          left:50%;
        }
        .bar:after {
          right:50%; 
        }
        input:focus ~ .bar:before, input:focus ~ .bar:after {
          width:50%;
        }
        .highlight {
          position:absolute;
          height:60%; 
          width:100px; 
          top:25%; 
          left:0;
          pointer-events:none;
          opacity:0.5;
        }
        input:focus ~ .highlight {
          -webkit-animation:inputHighlighter 0.3s ease;
          -moz-animation:inputHighlighter 0.3s ease;
          animation:inputHighlighter 0.3s ease;
        }

        @-webkit-keyframes inputHighlighter {
          from { background:#5264AE; }
          to { width:0; background:transparent; }
        }
        @-moz-keyframes inputHighlighter {
          from { background:#5264AE; }
          to { width:0; background:transparent; }
        }
        @keyframes inputHighlighter {
          from { background:#5264AE; }
          to { width:0; background:transparent; }
        }
        @media(max-width: 720px) {
          main {
            text-align: center;
            display: block;
            padding-bottom: 60px;
          }
          .card {
            width: 100%;
          }
        }
        `}
        </style>
      </div>
    )
  }
}

export default ContainerPage(SecretPage(SubmitLink))
