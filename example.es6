import Balloon from './index';
import React from 'react';

export default (
  <div>
    <div className="balloon-example no-mobile">
    </div>
    <div className="balloon-example">
      <Balloon>
        <a href="https://www.economist.com/user/login" className="balloon-link">
          Bottom positioned balloon
        </a>
        <div>
          The position of the balloon, as its width, can be styled by the context.
        </div>
      </Balloon>
    </div>
    <div className="balloon-example right">
      <Balloon balloonPosition="top">
        <a href="https://www.economist.com/user/login" className="balloon-link">
          Top positioned balloon
        </a>
        <div>
          The position of the balloon, as its width, can be styled by the context.
        </div>
      </Balloon>
    </div>
    <div className="balloon-example no-mobile">
    </div>
  </div>
);
