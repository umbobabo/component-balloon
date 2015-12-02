import Balloon from './index';
import Icon from '@economist/component-icon';
import Button from '@economist/component-link-button';
import React from 'react';

export default (
  <div className="balloon-example">
    <Balloon>
      <a href="https://www.economist.com/user/login">
        <Icon icon="user" />Log in
      </a>
      <div>
        <Button href="https://www.economist.com/user/login">
          Log in to The Economist
        </Button>
        <span>New to The Economist?</span><a href="https://www.economist.com/user/register">Register now</a>
      </div>
    </Balloon>
  </div>
);
