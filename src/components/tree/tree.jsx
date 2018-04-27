/* 
  接受data，处理，生成Node和Leaf的节点树

*/

import React, {Component} from 'react'

import Leaf from '../leaf'
import Node from '../node'

class Tree extends Component{

  getChildren(data = this.props.data){
    const tempArr = []

    for(let child of data){
      tempArr.push(this.handleData(child))
    }

    return tempArr
  }

  handleData(data){
    if(!data.children){
      return <Leaf key={data.key || data.title || null}>{data.title}</Leaf>
    }

    const {children, key, title,} = data
    return <Node title={data.title} key={key || title || null}>
      {this.getChildren(children)}
    </Node>
  }

  render(){
    return (
      <section
        className='tree'
      >
        {this.getChildren()}
      </section> 
    )
  }
}

export default Tree;