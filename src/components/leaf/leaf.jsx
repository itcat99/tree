import React, {PureComponent} from 'react'

class Leaf extends PureComponent {
  constructor(props) {
    super(props)

    const {
      status = 'empty'
    } = this.props
    this.state = {
      status
    }
  }

  updateState(config) {
    this.setState(config)
  }

  handleChange = e => {
    const status = this.state.status === 'checked'
    ? 'empty'
    : 'checked'

    this.updateState({
      status
    })

    if (this.props.onChange) {
      this
        .props
        .onChange({
          index: this.props.index,
          status
        })
    }
  }

  componentWillReceiveProps(newProps, newState) {
    this.updateState({status: newProps.status})
  }

  getClassName() {
    const {status} = this.state;

    return {
      leaf: 'leaf',
      leafInner: 'leaf-inner',
      icon: status === 'checked'
        ? 'icon-checked'
        : '',
      leafInput: 'leaf-input',
      leafTitle: 'leaf-title'
    }
  }

  render() {
    // console.log('Leaf is rendered!')
    const {
      children,
      type = 'checkbox'
    } = this.props
    const {status} = this.state
    const classes = this.getClassName()

    return (
      <label className={classes.leaf} onClick={this.onClick}>
        <div className={classes.leafInner}>
          <i className={`iconfont ${classes.icon}`}></i>
          <input
            className={classes.leafInput}
            type={type}
            checked={status === 'checked'}
            onChange={this.handleChange}
            />
        </div>
        {children
          ? <span className={classes.leafTitle}>{children}</span>
          : null}
      </label>
    )
  }
}

export default Leaf;