'use strict';
const Generator = require('yeoman-generator');
const componentFiles = require('./component-files-config');
const changeCase = require('change-case');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'componentType',
        message: 'What type of component are you creating?',
        choices: ['stateful', 'stateless', 'data']
      },
      {
        type: 'list',
        name: 'componentLevel',
        message: 'What level of component are you creating?',
        choices: ['atom', 'molecule', 'organism']
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of your component?',
        validate: function (value) {
          return value.match(/-/i) ? true : 'Please enter a valid component name';
        }
      }];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  writing() {
    const componentType = componentFiles[this.props.componentType];

    componentType.forEach((component) => {
      const name = changeCase.pascalCase(this.props.componentName);
      const tagName = this.props.componentName.toLowerCase();
      const destinationPath = `${this.props.componentLevel}/${tagName}`;
      this.fs.copyTpl(
        this.templatePath(component),
        this.destinationPath(`${destinationPath}/${getFileName(component, tagName)}`),
        {
          name,
          tagName,
          destinationPath
        }
      );
    });
  }
};

function getFileName(component, name) {
  const extension = component.match(/\.[0-9a-z]+$/i)[0];
  return extension === '.html'
    ? component
    : name + extension;
}
