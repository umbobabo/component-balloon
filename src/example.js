import Balloon from './';
import Button from '@economist/component-link-button';
import React from 'react';

const exampleOneTrigger = (
  <a href="https://www.economist.com/user/login" className="balloon-link">
    Bottom positioned balloon
  </a>
);
const exampleTwoTrigger = (
  <Button href="https://www.economist.com/user/login" className="balloon-link">
    Top positioned balloon show on Over
  </Button>
);
const exampleThreeTrigger = (
  <Button href="https://www.economist.com/user/login" className="balloon-link">
    Unstyled
  </Button>
);
export default (
  <div>
    <div className="balloon-example no-mobile">
    </div>
    <div className="balloon-example">
      <Balloon trigger={exampleOneTrigger}>
        <div>
          The position of the balloon, as its width, can be styled by the context.
        </div>
      </Balloon>
    </div>
    <div className="balloon-example right">
      <Balloon balloonPosition="top" showOnHover trigger={exampleTwoTrigger}>
        <div>
          The position of the balloon, as its width, can be styled by the context.
        </div>
      </Balloon>
    </div>
    <div className="balloon-example right">
      <Balloon
        unstyled
        balloonPosition="top"
        prefix="custom-classname"
        trigger={exampleThreeTrigger}
      >
        <div>
          The position of the balloon, as its width, can be styled by the context.
        </div>
      </Balloon>
    </div>
    <div className="balloon-example no-mobile">
    </div>
  </div>
);
