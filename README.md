<img src="logo.jpg" height="150" />

[![npm version](https://img.shields.io/npm/v/react-site-nav.svg?style=flat-square)](https://www.npmjs.com/package/react-site-nav) [![npm downloads](https://img.shields.io/npm/dm/react-site-nav.svg?style=flat-square)](https://www.npmjs.com/package/react-site-nav) [![npm](https://img.shields.io/npm/dt/react-site-nav.svg?style=flat-square)](https://www.npmjs.com/package/react-site-nav) [![npm](https://img.shields.io/npm/l/react-site-nav.svg?style=flat-square)](https://www.npmjs.com/package/react-site-nav)

> **A beautiful site navigation bar to be proud of. Powered by styled components inspired by stripe.com** :tada:

<b>Check out the live preview <a href="https://now-evztwufdfm.now.sh" target="_blank">here</a> (powered by <a href="https://zeit.co/now">now</a>).</b>

![react-site-nav-clip](/animated.gif)

Your search for the perfect site navigation bar ends here. Finally a world class navigation bar 
you can use straight out of the box. Why use this package?
* Beautiful animations
* Completely customisable
* Powered by css grid, css animations and styled components

No more compromises. Welcome to react-site-nav.

## Installation

yarn add react-site-nav

## Quickstart

```js
import React from 'react';
import {Switch, Link, Route} from 'react-router-dom';
import SiteNav, {ContentGroup} from 'react-site-nav'; // 1. Do this
import Home from './home';
import MyStory from './myStory';

export default () =>
  (
    <div>
      {/* 2. Add SiteNav with ContentGroup as children */}
      <SiteNav>
        <ContentGroup title="About">
          {/* 3. You can add anything in a ContentGroup */}
          <ul>
            {/* react router link! */}
            <li><Link to="/my-story">My Story</Link></li>
            <li>Another list item</li>
          </ul>
        </ContentGroup>
        <ContentGroup title="Contact">
          Free text followed by some links.<br/>
          <a href="mailto:yusinto@gmail.com">Email</a><br/>
          <a href="https://github.com/yusinto">Github</a>
        </ContentGroup>
      </SiteNav>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/my-story" component={MyStory}/>
      </Switch>
    </div>
  );

```

## Api
Coming soon!
