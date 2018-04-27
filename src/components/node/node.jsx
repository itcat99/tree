/*

  储存所有子节点的状态

  当某个子节点状态改变的时候，更新储存的子节点，并触发重新渲染

*/

import React, {Component} from 'react'

class Node extends Component {
  constructor(props) {
    super(props)

    const {
      status = 'empty'
    } = this.props

    this.state = {
      status: 'empty', // empty, half, checked
      children: null
    }

    this.childrenProps = null
  }

  handleChange = () => {
    /* 自身的状态改变 */
    const {status} = this.state
    let _status = status === 'empty'
      ? 'checked'
      : 'empty'

    this.updateState({
      status: _status,
      children: this.changeChildrenProps({status: _status})
    })

    this.childrenProps.forEach(child => {
      child.status = _status
    })

    if (this.props.onChange) {
      this
        .props
        .onChange({status: _status, index: this.props.index})
    }
  }

  onChildNodeChange = result => {
    /*
     * 确认是哪个child改变了状态
     */
    const childrenPropsCache = [].concat(this.childrenProps)
    const currentStatus = this.state.status
    const {index, status} = result

    if (childrenPropsCache[index].status === status) {
      return
    }

    this.childrenProps[index].status = status

    const newStatus = this.getStatus(this.childrenProps)

    if (newStatus === currentStatus) {
      return
    }

    this.updateState({status: newStatus})
    this.parentMsg = false
  }

  getStatus(childrenProps) {
    const childrenSize = childrenProps.length
      const empty = [],
        checked = []

      childrenProps.forEach(child => {
        switch (child.status) {
          case 'empty':
            empty.push(child);
            break;
          case 'checked':
            checked.push(child);
            break;
          default:
            break;
        }
      })

      if (checked.length === childrenSize) {
        return 'checked'
      }

      if (empty.length === childrenSize) {
        return 'empty'
      }

      return 'half'
    }

    updateState(config) {
      this.setState(config)
    }

    componentWillReceiveProps(newProps) {
      const {status} = newProps

      this.updateState({
        status,
        children: this.changeChildrenProps({status})
      })

      this.childrenProps.forEach(child => {
        child.status = status
      })

      this.parentMsg = true
    }

    componentDidUpdate() {
      if(this.parentMsg) return false
      if (this.props.onChange) {
        this
          .props
          .onChange({status: this.state.status, index: this.props.index})
      }

      // console.log('Node did update', this)
    }

    componentWillMount() {
      if (!this.props.children) {
        return;
      }
      let {children} = this.props;

      const tempArr = []
      const childrenProps = []

      React
        .Children
        .forEach(children, (child, index) => {
          const props = Object.assign({}, child.props, {index, status: 'empty'})

          childrenProps.push(props)
          tempArr.push(React.cloneElement(child, {
            onChange: this.onChildNodeChange,
            index,
            status: 'empty'
          }))
        })

      this.childrenProps = childrenProps
      this.updateState({children: tempArr})
    }

    changeChildrenProps(config) {
      const children = [].concat(this.state.children)

      return children.map(child => {
        return React.cloneElement(child, config)
      });
    }

    getClassName() {
      const {status} = this.state;

      return {
        node: 'node',
        nodeContainer: 'node-container',
        nodeInner: 'node-inner',
        icon: status === 'checked'
          ? 'icon-checked'
          : status === 'half'
            ? 'icon-half'
            : '',
        nodeInput: 'node-input',
        nodeTitle: 'node-title',
        nodeChildren: 'node-children'
      }
    }

    render() {
      const {
        type = 'checkbox',
        title
      } = this.props

      const {children, status} = this.state
      const classes = this.getClassName()

      return (
        <span className={classes.node}>
          <label className={classes.nodeContainer}>
            <div className={classes.nodeInner}>
              <i className={`iconfont ${classes.icon}`}></i>
              <input
                className={classes.nodeInput}
                type={type}
                checked={status === 'checked'}
                onChange={this.handleChange}/>
            </div>
            <span className={classes.nodeTitle}>{title}</span>
          </label>
          <div className={classes.nodeChildren}>
            {children}
          </div>
        </span>
      )
    }
  }

  export default Node;