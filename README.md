<img src="logo.jpg" width="200" height="100" />

[![npm version](https://img.shields.io/npm/v/react-site-nav.svg?style=flat-square)](https://www.npmjs.com/package/react-site-nav) [![npm downloads](https://img.shields.io/npm/dm/react-site-nav.svg?style=flat-square)](https://www.npmjs.com/package/react-site-nav) [![npm](https://img.shields.io/npm/dt/react-site-nav.svg?style=flat-square)](https://www.npmjs.com/package/react-site-nav) [![npm](https://img.shields.io/npm/l/react-site-nav.svg?style=flat-square)](https://www.npmjs.com/package/react-site-nav)

> **A beautifully animated nav bar to be proud of. Powered by styled components inspired by stripe.com** :tada:

## Installation

yarn add react-site-nav

## Quickstart

```js
import React from 'react';
import {Switch, Link, Route} from 'react-router-dom';
import SiteNav, {ContentGroup} from 'react-site-nav';
import Home from './home';
import MyStory from './myStory';

export default () =>
  (
    <div>
      <header>
        <SiteNav>
          <ContentGroup title="About" width="320" height="200">
            <p>You can add anything in a ContentGroup. Like a list:</p>
            <ul>
              <li><Link to="/my-story">My Story</Link></li>
              <li>Another list item</li>
            </ul>
          </ContentGroup>
          <ContentGroup title="Contact" width="350" height="180">
            This is free text. Followed by some links.<br/>
            <a href="mailto:yusinto@gmail.com">Email</a><br/>
            <a href="https://github.com/yusinto">Github</a>
          </ContentGroup>
        </SiteNav>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/my-story" component={MyStory}/>
        </Switch>
      </main>
    </div>
  );

```

## Api

