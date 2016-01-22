import Balloon from './index';
import Button from '@economist/component-link-button';
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
      <Balloon balloonPosition="top" showOnHover>
        <Button href="https://www.economist.com/user/login" className="balloon-link">
          Top positioned balloon show on Over
        </Button>
        <div>
          The position of the balloon, as its width, can be styled by the context.
        </div>
      </Balloon>
    </div>
    <div className="balloon-example right">
      <Balloon
        unstyled
        balloonPosition="top"
        prefix="customClassname"
      >
        <Button
          href="https://www.economist.com/user/login" className="balloon-link"
        >
          Unstyled
        </Button>
        <div>
          The position of the balloon, as its width, can be styled by the context.
        </div>
      </Balloon>
    </div>
    <div className="balloon-example no-mobile">
    </div>
  </div>
);
