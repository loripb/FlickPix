import React from 'react'
import TableRow from './TableRow'
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

const TableComponent = (props) => {

  let renderQueue = () => {
    return props.userObj.user_queues.map( queue => {
      return <TableRow queueObj={ queue } key={ queue.id } />
    })
  }

  return (
  <Table celled compact definition>
    <Table.Header fullWidth>
      <Table.Row>
        <Table.HeaderCell>Watched</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
        <Table.HeaderCell>Release_date</Table.HeaderCell>
        <Table.HeaderCell>Genres?</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>

    { renderQueue() }

    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button
            floated='right'
            icon
            labelPosition='left'
            primary
            size='small'
          >
            <Icon name='user' /> Add User
          </Button>
          <Button size='small'>Approve</Button>
          <Button disabled size='small'>
            Approve All
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)
}

export default TableComponent;
