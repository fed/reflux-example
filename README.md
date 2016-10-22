# Reflux Example

This is a simple sample project built with [React](https://facebook.github.io/react/), [Reflux](https://github.com/reflux/refluxjs), [Gulp](http://gulpjs.com/) and [Browserify](http://browserify.org/) to demo what Reflux is, how it works and how we can integrate it into our React apps.

![App Screenshot](http://i.imgur.com/NEl6ruJ.jpg)

## API key

Before building and running the app, make sure you set your Imgur API Key to the `API_KEY` constant in the `/src/js/utils/constants.js` file. You can register your app and get a key [here](https://api.imgur.com/oauth2/addclient).

## Building and running the app

First run `npm install` to fetch all of the dependencies. Then run `npm start` to have the app build and go live on [http://localhost:6789](http://localhost:6789). To just build the app without running a webserver and watching for changes, use `npm run build` instead.

## About Reflux.js

Reflux is a simple library for uni-directional dataflow application architecture inspired by React's Flux. Reflux is **one** implementation of Flux, with some key differences:

* The singleton dispatcher is removed in favor for letting every action act as dispatcher instead.
* Because actions are listenable, the stores may listen to them. Stores don't need to have big switch statements that do static type checking (of action types) with strings.
* Stores may listen to other stores, i.e. it is possible to create stores that can aggregate data further, similar to a map/reduce.
* Action creators are not needed because RefluxJS actions are functions that will pass on the payload they receive to anyone listening to them.

Check the [official docs](https://github.com/reflux/refluxjs) for more info on how to use it.

## About this code example

This project is inspired on one of the sections of [this course on Udemy](https://www.udemy.com/learn-and-understand-reactjs/).
