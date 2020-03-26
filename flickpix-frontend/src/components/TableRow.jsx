import React, { Component } from 'react';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

class TableRow extends Component {

  render() {
    console.log(this.props.movieObj);
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>{ this.props.movieObj.movie_id }</Table.Cell>
          <Table.Cell>September 14, 2013</Table.Cell>
          <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
          <Table.Cell>No</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  }

}

export default TableRow;
