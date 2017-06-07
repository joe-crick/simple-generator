import React from 'react';
import {observer} from 'mobx';

@observer
export default class <%= name %> extends React.Component {
  render() {
    return (
      <<%= tagName %>>
      </<%= tagName %>>
  );
  }
}
