import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CommonTools from '../../common/common-tools';

CommonTools();

// eslint-disable-next-line react/prefer-stateless-function
class Search extends React.Component {
  render() {
    return (
      <div className="search">
        搜索文字的内容
      </div>
    );
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root'),
);
