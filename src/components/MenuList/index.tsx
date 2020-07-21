import React from 'react';
import { VariableSizeList as List } from 'react-window';

export default function MenuList(props: any) {
  const height = 35;
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  const getItemSize = (index: any) => {
    const len = options[index].label.length
    if (len <= 150)
      return 40;
    else if (len < 250)
      return 50;
    else return 80;
  };

  return (
    <List
      width={'100%'}
      height={maxHeight}
      itemCount={children.length}
      itemSize={getItemSize}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  )
}