require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

let imgData = require('../data/imgdata.json');

imgData = ((imgArr) => {
  for (let i = 0, j = imgArr.length; i < j; i++ ) {
    let singleImg = imgArr[i];
    singleImg.imgUrl = require('../images/' + singleImg.filename);
    imgArr[i] = singleImg;
  }
  return imgArr;
})(imgData);

let getMinIndex = (arr, value) => {
  for (let i of Object.keys(arr)) {
    if (arr[i] === value) {
      return i;
    }
  }
};

class ImgFigure extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <figure className="img-item">
        <img src={this.props.data.imgUrl} />
      </figure>
    )
  }
}

class AppComponent extends React.Component {

  constructor (props) {
    super(props);
    this.stageOnload = this.stageOnload.bind(this);
    this.state = {
      imgList: []
    }
  }

  stageOnload () {
    // 获取全部的图片元素
    let imgArray = [],
      heightArr = [];
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage);
    for (let i = 0,j = imgData.length; i < j; i ++) {
      let ref = this.refs['img' + i];
      imgArray.push(ReactDOM.findDOMNode(ref));
    }
    // 计算整个页面显示的页数
    let stageW = stageDOM.offsetWidth,
      itemW = imgArray[0].offsetWidth,
      cols = Math.floor(stageW / itemW);
    for (let i = 0, j = imgArray.length; i < j; i++) {
      if (i < cols) {
        heightArr.push(imgArray[i].offsetHeight);
      } else {
        let minH = Math.min.apply(null, heightArr),
          index = getMinIndex(heightArr, minH);
        imgArray[i].style.position = 'absolute';
        imgArray[i].style.top = minH + 20 + 'px';
        imgArray[i].style.left = (itemW + 20) * index + 'px';
        heightArr[index] += imgArray[i].offsetHeight + 20;
      }
    }
  }

  render() {
    let imgItem = [];
    imgData.forEach((value, index) => {
      imgItem.push(<ImgFigure data={value} key={index} ref={'img' + index} />)
    });
    this.state.imgList.forEach((value, index) => {
      imgItem.push(<ImgFigure data={value} key={index} ref={'img' + index} />)
    });
    return (
      <section className="stage" ref="stage" onLoad={this.stageOnload}>
        <section className="img-section">
          {imgItem}
        </section>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
