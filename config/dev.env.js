'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  BASE_API: '"http://zhongkeruitong.top:80"',
  // BASE_API: '"http://localhost:8081"',
  //BASE_API: '"http://zhongkeruitong.top"',
  NODE_ENV: '"development"'
})
