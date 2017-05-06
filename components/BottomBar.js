import React from 'react'
import Link from 'next/link'
import FaUser from 'react-icons/lib/md/face'
import FaHeart from 'react-icons/lib/fa/bookmark-o'

const IconPlaceHolder = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 58 58'>
    <path d='M57 6H1c-.552 0-1 .447-1 1v44c0 .553.448 1 1 1h56c.552 0 1-.447 1-1V7c0-.553-.448-1-1-1zm-1 44H2V8h54v42z' />
    <path d='M16 28.138c3.071 0 5.569-2.498 5.569-5.568 0-3.072-2.498-5.57-5.569-5.57s-5.569 2.498-5.569 5.569c0 3.071 2.498 5.569 5.569 5.569zM16 19c1.968 0 3.569 1.602 3.569 3.569S17.968 26.138 16 26.138s-3.569-1.601-3.569-3.568S14.032 19 16 19zM7 46c.234 0 .47-.082.66-.249l16.313-14.362L34.275 41.69c.391.391 1.023.391 1.414 0s.391-1.023 0-1.414l-4.807-4.807 9.181-10.054 11.261 10.323c.407.373 1.04.345 1.413-.062s.346-1.04-.062-1.413l-12-11c-.196-.179-.457-.268-.72-.262-.265.012-.515.129-.694.325l-9.794 10.727-4.743-4.743c-.374-.373-.972-.392-1.368-.044L6.339 44.249c-.415.365-.455.997-.09 1.412.198.225.474.339.751.339z' />
    <style jsx>{`
      svg {
        width: 30px;
        height: 40px;
        fill: #888;
      } 
    `}</style>
  </svg>
)

export default class BottomBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: true,
      interactive: false
    }
  }
  componentDidMount () {
    this.setState({
      interactive: true
    })
    const input = document.querySelector('.react-autosuggest__input')
      ? document.querySelector('.react-autosuggest__input')
      : document.querySelector('input')
    if (input) {
      input.addEventListener('focus', this.handelFocus.bind(this))
      input.addEventListener('blur', this.handelBlur.bind(this))
    }
  }
  componentWillUnMount () {
    const input = document.querySelector('.react-autosuggest__input')
      ? document.querySelector('.react-autosuggest__input')
      : document.querySelector('input')
    if (input) {
      input.removeEventListener('focus', this.handelFocus.bind(this))
      input.removeEventListener('blur', this.handelBlur.bind(this))
    }
  }
  handelFocus () {
    this.setState({
      show: false
    })
  }
  handelBlur () {
    this.setState({
      show: true
    })
  }
  render () {
    const { url: { pathname } } = this.props
    return (
      <div className={this.state.show ? 'show' : 'hide'}>
        <nav>
          <ul>
            <li>
              <Link prefetch href='/'>
                {this.state.interactive
                  ? <a className={pathname === '/' ? 'active' : ''}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 503.118 503.118'
                      >
                      <path d='M107.067 317.195c1.713-1.708 2.568-3.898 2.568-6.563 0-2.663-.855-4.853-2.568-6.571-1.714-1.707-3.905-2.562-6.567-2.562H9.135c-2.666 0-4.853.855-6.567 2.562C.859 305.772 0 307.962 0 310.632c0 2.665.855 4.855 2.568 6.563 1.714 1.711 3.905 2.566 6.567 2.566H100.5c2.666.005 4.853-.851 6.567-2.566zm203.562-207.561c2.669 0 4.859-.855 6.563-2.568 1.718-1.711 2.574-3.901 2.574-6.567V9.138c0-2.659-.856-4.85-2.574-6.565-1.704-1.711-3.895-2.57-6.563-2.57-2.662 0-4.853.859-6.563 2.57-1.711 1.713-2.566 3.903-2.566 6.565v91.361c0 2.666.855 4.856 2.566 6.567 1.718 1.713 3.908 2.568 6.563 2.568zm-191.858 237.55c-2.478 0-4.664.855-6.567 2.563l-73.089 73.087c-1.713 1.902-2.568 4.093-2.568 6.567s.855 4.664 2.568 6.566c2.096 1.708 4.283 2.57 6.567 2.57 2.475 0 4.665-.862 6.567-2.57l73.089-73.087c1.714-1.902 2.568-4.093 2.568-6.57 0-2.471-.854-4.661-2.568-6.563-1.902-1.708-4.093-2.563-6.567-2.563zm237.544-219.279c2.283 0 4.473-.855 6.571-2.565l73.087-73.089c1.707-1.903 2.562-4.093 2.562-6.567 0-2.475-.855-4.665-2.562-6.567-1.91-1.709-4.093-2.568-6.571-2.568-2.471 0-4.66.859-6.563 2.568l-73.087 73.089c-1.708 1.903-2.57 4.093-2.57 6.567s.862 4.661 2.57 6.567c2.094 1.71 4.285 2.565 6.563 2.565zm-5.708 65.1c-4-3.999-9.328-7.994-15.988-11.991l-5.14 68.238 78.23 78.508c5.328 5.328 7.987 11.807 7.987 19.417 0 7.423-2.662 13.802-7.987 19.13l-41.977 41.686c-5.146 5.146-11.608 7.666-19.417 7.566-7.81-.1-14.271-2.707-19.411-7.854l-77.946-78.225-68.234 5.144c3.999 6.656 7.993 11.988 11.991 15.985l95.362 95.643c15.803 16.18 35.207 24.27 58.238 24.27 22.846 0 42.154-7.898 57.957-23.695l41.977-41.685c16.173-15.8 24.27-35.115 24.27-57.958 0-22.46-7.994-41.877-23.982-58.248l-95.93-95.931zm121.911-35.116c-1.711-1.709-3.901-2.565-6.563-2.565H374.59c-2.662 0-4.853.855-6.563 2.565-1.715 1.713-2.57 3.903-2.57 6.567 0 2.666.855 4.856 2.57 6.567 1.711 1.712 3.901 2.568 6.563 2.568h91.365c2.662 0 4.853-.856 6.563-2.568 1.708-1.711 2.563-3.901 2.563-6.567.001-2.664-.855-4.854-2.563-6.567zm-363.17-90.79c5.523-5.14 11.991-7.705 19.417-7.705 7.611 0 14.084 2.663 19.414 7.993l77.943 78.227 68.234-5.142c-4-6.661-7.99-11.991-11.991-15.987l-95.358-95.643c-15.798-16.178-35.212-24.27-58.242-24.27-22.841 0-42.16 7.902-57.958 23.7l-41.97 41.683C12.659 85.756 4.57 105.073 4.57 127.912c0 22.463 7.996 41.877 23.982 58.245l95.93 95.93c3.995 4.001 9.325 7.995 15.986 11.991l5.139-68.521-78.23-78.227c-5.327-5.33-7.992-11.801-7.992-19.417 0-7.421 2.662-13.796 7.992-19.126l41.971-41.688zm55.106 298.352c-2.667 0-4.854.855-6.567 2.563-1.711 1.711-2.568 3.901-2.568 6.57v91.358c0 2.669.854 4.853 2.568 6.57 1.713 1.707 3.9 2.566 6.567 2.566 2.666 0 4.853-.859 6.567-2.566 1.713-1.718 2.568-3.901 2.568-6.57v-91.358c0-2.662-.855-4.853-2.568-6.57-1.715-1.707-3.905-2.563-6.567-2.563z' />
                    </svg>
                    <span>Links</span>
                  </a>
                  : <a className={pathname === '/' ? 'active' : ''}>
                    <IconPlaceHolder />
                    <span>Loading</span>
                  </a>}
              </Link>
            </li>
            <li>
              <Link prefetch href='/my-links'>
                {this.state.interactive
                  ? <a className={pathname === '/my-links' ? 'active' : ''}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 503.118 503.118'
                      >
                      <path d='M453.323 39.655l-16.564-14.656C418.729 9.021 395.521.22 371.405.22c-28.223 0-55.118 12.079-73.791 33.143L250.207 86.86c-6.105 6.876-9.164 15.722-8.608 24.901.557 9.166 4.642 17.576 11.518 23.673l4.438 3.94c6.299 5.594 14.416 8.673 22.842 8.673l2.054-.059c9.166-.551 17.582-4.637 23.699-11.523l47.418-53.503c8.342-9.416 24.169-10.362 33.601-2.026l16.558 14.688c4.748 4.203 7.57 10.021 7.955 16.384.386 6.358-1.722 12.465-5.937 17.208L302.042 246.198c-6.982 7.887-19.377 10.164-28.734 5.342-14.577-7.519-33.58-3.93-44.392 8.256l-.813.926c-7.573 8.518-10.727 19.838-8.674 31.104 2.074 11.198 9.047 20.801 19.153 26.09 13.986 7.311 29.763 11.33 45.621 11.33h.012c28.21 0 55.117-12.238 73.8-33.308l103.691-117.046c36.04-40.666 32.298-103.161-8.383-139.237z' />
                      <path d='M228.873 347.458c-13.669-12.103-36.426-10.743-48.574 2.938l-47.396 53.487c-8.342 9.412-24.159 10.387-33.58 2.043l-16.576-14.705c-4.747-4.207-7.57-10.025-7.955-16.383-.387-6.348 1.722-12.453 5.935-17.196l103.692-116.974c6.876-7.765 19.047-10.111 28.297-5.566 15.121 7.448 34.359 3.818 46.05-9.416 7.433-8.374 10.555-19.496 8.586-30.463-1.956-11.031-8.747-20.389-18.618-25.666-14.201-7.604-30.274-11.624-46.466-11.624-28.223 0-55.118 12.084-73.791 33.151L24.772 308.038C-11.29 348.704-7.536 411.12 33.133 447.181l16.564 14.482c18.021 15.979 41.229 24.582 65.345 24.582h.011c28.223 0 55.129-11.889 73.812-32.957l47.388-53.379c6.116-6.887 9.176-15.691 8.618-24.819-.533-9.068-4.736-17.694-11.538-23.706l-4.46-3.926z' />
                    </svg>
                    <span>My Links</span>
                  </a>
                  : <a className={pathname === '/my-links' ? 'active' : ''}>
                    <IconPlaceHolder />
                    <span>Loading</span>
                  </a>}
              </Link>
            </li>
            <li>
              <Link prefetch href='/bookmarks'>
                {this.state.interactive
                  ? <a className={pathname === '/bookmarks' ? 'active' : ''}>
                    <FaHeart size={35} />
                    <span>Bookmarks</span>
                  </a>
                  : <a className={pathname === '/my-links' ? 'active' : ''}>
                    <IconPlaceHolder />
                    <span>Loading</span>
                  </a>}
              </Link>
            </li>
            <li>
              <Link prefetch href='/submit-link'>
                {this.state.interactive
                  ? <a className={pathname === '/submit-link' ? 'active' : ''}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 503.118 503.118'
                      >
                      <path d='M191.852 260.427l-60.628 60.62c-22.054 22.048-59.52 20.479-83.508-3.505-23.991-23.998-25.569-61.446-3.51-83.517l68.694-68.69c22.057-22.057 59.52-20.479 83.511 3.505 10.214 10.212 16.321 22.859 18.313 35.727 8.889-.929 17.271-4.569 23.795-11.089l2.53-2.53c-4.052-15.396-12.125-30.14-24.37-42.377-35.171-35.171-90.824-36.744-124.056-3.505l-68.69 68.69c-33.239 33.229-31.662 88.889 3.507 124.061 35.168 35.166 90.821 36.739 124.06 3.505l68.69-68.69c3.89-3.888 7.269-8.116 10.207-12.563-12.599 2.589-25.686 2.645-38.545.358z' />
                      <path d='M210.06 27.633l-68.7 68.695c-3.899 3.901-7.273 8.13-10.218 12.578 12.603-2.581 25.694-2.66 38.545-.359l60.642-60.639c22.052-22.057 59.52-20.479 83.508 3.509 23.994 23.994 25.571 61.452 3.51 83.508l-68.689 68.695c-22.057 22.057-59.515 20.483-83.511-3.51-10.214-10.212-16.321-22.869-18.314-35.731-8.888.92-17.275 4.583-23.795 11.094l-2.527 2.53c4.051 15.401 12.123 30.14 24.367 42.381 35.171 35.172 90.824 36.739 124.059 3.51l68.685-68.69c33.239-33.239 31.662-88.889-3.505-124.056-35.163-35.171-90.823-36.753-124.057-3.515zm140.978 224.109c-52.794 0-95.581 42.797-95.581 95.582 0 52.789 42.787 95.591 95.581 95.591 52.79 0 95.577-42.802 95.577-95.591 0-52.785-42.787-95.582-95.577-95.582zm56.154 115.276h-35.348v35.503c0 11.164-9.055 20.199-20.214 20.199s-20.208-9.035-20.208-20.199v-35.503h-35.358c-11.149 0-20.198-9.054-20.198-20.208s9.049-20.208 20.198-20.208h35.358v-35.214c0-11.154 9.049-20.203 20.208-20.203s20.214 9.049 20.214 20.203v35.214h35.348c11.159 0 20.213 9.054 20.213 20.208-.004 11.164-9.053 20.208-20.213 20.208z' />
                    </svg>
                    <span>Submit Link</span>
                  </a>
                  : <a className={pathname === '/submit-link' ? 'active' : ''}>
                    <IconPlaceHolder />
                    <span>Loading</span>
                  </a>}
              </Link>
            </li>
            <li>
              <Link prefetch href='/profile'>
                {this.state.interactive
                  ? <a className={pathname === '/profile' ? 'active' : ''}>
                    {this.props.user
                        ? <img
                          src={`//images.weserv.nl/?url=${this.props.user.avatarUrl
                              .replace('http://', '')
                              .replace(
                                'https://',
                                ''
                              )}&w=40&h=40&&shape=circle`}
                          alt={this.props.user.username}
                          />
                        : <FaUser size={40} />}
                    <span>
                      {this.props.user ? this.props.user.username : 'Login'}
                    </span>
                  </a>
                  : <a className={pathname === '/profile' ? 'active' : ''}>
                    <IconPlaceHolder />
                    <span>Loading</span>
                  </a>}
              </Link>
            </li>
          </ul>
        </nav>
        <style jsx>{`
          div {
            width: calc(100% - 200px);
            margin-left: 200px;
            min-height: 56px;
            display: flex;
          }
          nav {
            display: flex;
            width: 100%;
          }
          ul {
            flex: 1;
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
            text-align: center;
            align-items: center;
          }
          svg {
            width: 30px;
            height: 40px;
            fill: #fff;
          }
          a {
            min-height: 56px;
            width: 100%;
            text-decoration: none;
            font-size: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
          }
          a img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          a span {
            margin-left: 10px;
            font-size: 16px;
            color: #fff;
          }
          a:hover {
            background: #0d1c75;
          }
          a.active:hover {
            background: #253592;
            border-bottom: 2px solid #fff;
          }
          a.active {
            border-bottom: 2px solid #fff;
          }
          li {
            min-height: 56px;
            flex: 1;
            display: flex;
            align-items: center;
          }
          li:last-child {
            border-right: none;
          }
          @media(max-width: 1080px) {
            div {
              width: 100%;
              margin-left: 0;
            }
          }
          @media(max-width: 720px) {
            div {
              position: fixed;
              left: 0;
              bottom: 0;
              background: #253592;
            }
            div.show {
              display: flex;
            }
            div.hide {
              display: none;
            }
            a {
              flex-direction: column;
            }
            a span {
              flex: 1;
              margin-left: 0;
              font-size: 8px;
              color: #fff;
              display: flex;
              align-items: flex-end;
              padding-bottom: 5px;
            }
            a.active {
              background: #0d1c75;
              border-bottom: none;
            }
            a.active:hover {
              background: #0d1c75;
              border-bottom: none;
            }
            a:hover {
              background: #253592;
            }
          }
        `}</style>
      </div>
    )
  }
}
