import React from 'react';
import View from './View';

function Portal({children}) {
  return (
    <View>
      {children}
    </View>
  )
}

export { Portal };