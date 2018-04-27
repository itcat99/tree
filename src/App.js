import React, { Component } from 'react';
import './App.css';

import Tree from './components/tree'

function getLeaf(count, prefix){
  const arr = []

  for(let i = 0; i<count; i++){
    const badge = `${prefix}-${i}`
    arr.push({
      title: badge,
      key: badge
    })
  }

  return arr
}

function getNode(count, LeafCount, prefix){
  const arr = []

  for(let i = 0; i< count; i++){
    const badge = `${prefix}_${i}`

    arr.push({
      title: badge,
      key: badge,
      children: getLeaf(LeafCount, badge)
    })
  }

  return arr
}

const prefix = 'Node'

const bigTree = [{
  title: `${prefix}::1`,
  key: `${prefix}::1`,
  children: [{
    title: `${prefix}::1-1`,
    key: `${prefix}::1-1`,
    children: getNode(5, 10, `${prefix}::1-1`,)
  },{
    title: `${prefix}::1-2`,
    key: `${prefix}::1-2`,
    children: getNode(3, 10, `${prefix}::1-2`,)
  },{
    title: `${prefix}::1-3`,
    key: `${prefix}::1-3`,
    children: getNode(4, 50, `${prefix}::1-3`,)
  },{
    title: `${prefix}::1-4`,
    key: `${prefix}::1-4`,
    children: getNode(5, 10, `${prefix}::1-4`,)
  }]
},{
  title: `${prefix}::2`,
  key: `${prefix}::2`,
  children: getNode(1, 60, `${prefix}::2`,)
},{
  title: `${prefix}::3`,
  key: `${prefix}::3`,
  children: getNode(10, 50, `${prefix}::3`,)
},{
  title: `${prefix}::4`,
  key: `${prefix}::4`,
  children: getNode(10, 10, `${prefix}::4`,)
}];


console.log(bigTree)


class App extends Component {
  constructor(){
    super()
  }
  componentWillMount(){
    this.startDate = new Date()
  }

  componentDidMount(){
    console.log(`Used ${new Date() - this.startDate} ms`)
  }

  render() {
    return (
      <Tree data={bigTree} />
      // <div className="App">
      //   <Node title={'Node1'}>
      //     <Node title={'Node1_1'}>
      //       <Leaf>Node1_1 - 1</Leaf>
      //       <Leaf>Node1_1 - 2</Leaf>
      //       <Node title={'Node1_1 - 3'}>
      //         <Leaf>Node1_1 - 3 - 1</Leaf>
      //         <Leaf>Node1_1 - 3 - 2</Leaf>
      //         <Leaf>Node1_1 - 3 - 3</Leaf>
      //         <Leaf>Node1_1 - 3 - 4</Leaf>
      //         <Leaf>Node1_1 - 3 - 5</Leaf>
      //         <Leaf>Node1_1 - 3 - 6</Leaf>
      //         <Leaf>Node1_1 - 3 - 7</Leaf>
      //         <Leaf>Node1_1 - 3 - 8</Leaf>
      //         <Leaf>Node1_1 - 3 - 9</Leaf>
      //         <Leaf>Node1_1 - 3 - 10</Leaf>
      //         <Leaf>Node1_1 - 3 - 11</Leaf>
      //         <Leaf>Node1_1 - 3 - 12</Leaf>
      //         <Leaf>Node1_1 - 3 - 13</Leaf>
      //         <Leaf>Node1_1 - 3 - 14</Leaf>
      //         <Leaf>Node1_1 - 3 - 15</Leaf>
      //         <Leaf>Node1_1 - 3 - 16</Leaf>
      //         <Leaf>Node1_1 - 3 - 17</Leaf>
      //         <Leaf>Node1_1 - 3 - 18</Leaf>
      //         <Leaf>Node1_1 - 3 - 19</Leaf>
      //         <Leaf>Node1_1 - 3 - 20</Leaf>
      //       </Node>
      //     </Node>
      //     <Leaf>Node1_2</Leaf>
      //     <Leaf>Node1_3</Leaf>
      //     <Leaf>Node1_4</Leaf>
      //   </Node>
      //   {/* <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p> */}
      // </div>
    );
  }
}

export default App;
