import React from 'react'

export default class SnackBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSnackBar: this.props.show,
      timer: this.props.timer || 4000
    }
  }

  componentWillReceiveProps (nextProps) {
    var { showSnackBar, timer } = this.state
    if (showSnackBar !== nextProps.show) {
      this.setState({
        showSnackBar: nextProps.show,
        timer: nextProps.timer
      })

      setTimeout(() => {
        this.setState({ showSnackBar: false })
        this.props.onClose && this.props.onClose()
      }, timer)
    }
  }

  render () {
    const { showSnackBar } = this.state
    return (
      <div className={showSnackBar ? 'show' : ''}>
        {this.props.children}
        <style jsx>{`
          div{
            position: fixed;
            left: 50%;
            transform: translate(-50%, 20px);
            bottom: 60px;
            border-radius: 20px;
            font-size: 14px;
            padding: 0 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #404040;
            color: #fff;
            font-weight: 500;
            white-space: nowrap;
            text-transform: initial;
            opacity: 0;
            will-change: transform;
            transition: transform 0.3s cubic-bezier(0, 0, 0.30, 1);
            z-index: 999999;
          }
          div.show {
            opacity: 1;
            transform: translate(-50%, 0)
          }
        `}</style>
      </div>
    )
  }
}
