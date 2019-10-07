import React from 'react';

import Waterfall from "./waterfall";
import styles from './styles';

class App extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <Waterfall/>
        </div>
      </div>
    );
  }
}

export default App;
