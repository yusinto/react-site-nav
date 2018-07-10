import React, {Component, Timeout} from 'react';

export default props =>
  <div style={{marginTop: '30px', marginLeft: '30px'}}>
    <h1>This is spa link #1</h1>
    <p>Thanks for checking react-site-nav!</p>
    <p>
      Check out my blog at <a href="http://reactjunkie.com" target="_blank"
                              rel="noopener noreferrer">reactjunkie.com</a>
    </p>
    <div>You can reach me via:</div>
    <ul>
      <li>
        <a href="mailto:yusinto@gmail.com">email</a>
      </li>
      <li>
        <a href="https://github.com/yusinto">github</a>
      </li>
      <li>
        <a href="https://twitter.com/yusinto">twitter</a>
      </li>
      <li>
        <a href="https://linkedin.com/in/yusinto">linkedin</a>
      </li>
    </ul>
  </div>;
