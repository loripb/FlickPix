import React from 'react'
import TableRow from './TableRow'
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

const TableComponent = (props) => {

  let renderQueue = () => {
    return props.userObj.user_queues.map( queue => {
      return <TableRow
        queueObj={ queue }
        key={ queue.id }
        updateQueue={ props.updateQueue }
        backendMovies={ props.backendMovies }
        deleteFromQueue={ props.deleteFromQueue }
      />
    })
  }

  return (
  <Table inverted celled compact definition>
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
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)
}

export default TableComponent;
