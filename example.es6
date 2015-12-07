import Balloon from './index';
import React from 'react';

export default (
  <div>
    <div className="balloon-example">
      <Balloon>
        <a href="https://www.economist.com/user/login" className="balloon-link">
          Click here to see the bottom positioned balloon
        </a>
        <div>
          The position of the balloon, as its width, can be styled by the context.
        </div>
      </Balloon>
    </div>
    <div className="balloon-example">
      <Balloon balloonPosition="top">
        <a href="https://www.economist.com/user/login" className="balloon-link">
          Click here to see the top positioned balloon
        </a>
        <div>
          The position of the balloon, as its width, can be styled by the context.
        </div>
      </Balloon>
    </div>
  </div>
);
