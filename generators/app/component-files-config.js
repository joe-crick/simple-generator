const allFiles = ['test.js'];
const standardComponent = allFiles.concat([
  'less.less',
  'index.html',
  'test.html',
  'readme.md'
]);

module.exports = {
  stateful: standardComponent.concat(['react-mobx-class.js']),
  stateless: standardComponent.concat(['react-mobx-function.js']),
  data: allFiles.concat(['mobx-data.js'])
};
