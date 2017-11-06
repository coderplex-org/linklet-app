import React from 'react'
import Header from '../components/Header'

import ContainerPage from '../hocs/ContainerPage'
import SecretPage from '../hocs/SecretPage'

class SubmitLink extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      info:
        'Temporarly we disabled links submission since we saw lot of spam submission recently. We are working on a new version which will be released soon.'
    }
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
              letter-spacing: 2px;
              max-width: 720px;
              font-size: 2rem;
              font-weight: 300;
              margin: 10px auto;
              background: #ff7058;
              color: #fff;
              border-radius: 4px;
              padding: 20px;
              box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }
            @media (max-width: 720px) {
              main {
                text-align: center;
                display: block;
                padding-bottom: 60px;
              }
              p {
                font-size: 14px;
                line-height: 1.5;
                font-weight: bold;
                padding: 10px;
              }
            }
          `}
        </style>
      </div>
    )
  }
}

export default ContainerPage(SecretPage(SubmitLink))
