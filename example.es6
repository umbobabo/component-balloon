import Balloon from './index';
import Button from '@economist/component-link-button';
import React from 'react';

export default (
  <div className="balloon-example">
    <Balloon>
      <a href="https://www.economist.com/user/login">
        Click here to see the balloon
      </a>
      <div>
        The position of the balloon, as its width, can be styled by the context.
      </div>
    </Balloon>
  </div>
);
