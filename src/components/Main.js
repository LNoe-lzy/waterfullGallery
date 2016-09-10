require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imgData = require('../data/imgdata.json');

imgData = ((imgArr) => {
  for (let i = 0, j = imgArr.length; i < j; i++ ) {
    let singleImg = imgArr[i];
    singleImg.imgUrl = require('../images/' + singleImg.filename);
    imgArr[i] = singleImg;
  }
  return imgArr;
})(imgData);

class ImgFigure extends React.Component {
  render () {
    return (
      <figure className="img-item">
        <img src={this.props.data.imgUrl} />
      </figure>
    )
  }
}

class AppComponent extends React.Component {
  render() {
    let imgItem = [];
    imgData.forEach((value, index) => {
      imgItem.push(<ImgFigure data={value} key={index} />)
    });
    return (
      <section className="stage">
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
