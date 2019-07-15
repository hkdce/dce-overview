import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

type Props = {
  items: { [index: string]: string };
  itemOrder: string[];
  selectedKey: string;
  className?: string;
  onSelect: (eventKey: string, event: Object) => any;
}

const ItemsDropdown: React.FunctionComponent<Props> = (props: Props) => {
  if (!(props.selectedKey in props.items)) {
    console.error("Selected key does not exist in items object.", props.selectedKey, props.items);
    throw ReferenceError("Selected key does not exist in items object.");
  }

  return (
    <Dropdown className={props.className} onSelect={props.onSelect}>
      <Dropdown.Toggle size="sm" variant="info" id="dropdown-basic" onSelect={props.onSelect}>
      { props.items[props.selectedKey] }
      </Dropdown.Toggle>
      <Dropdown.Menu>
      {
        props.itemOrder.map((k: string) =>
          <Dropdown.Item key={k} eventKey={k}>{props.items[k]}</Dropdown.Item>
        )
      }
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ItemsDropdown;
