import React from 'react'
import ListCard from './list_card'
import AddCard from './add_card'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(event) {
    let cardId  = parseInt(event.dataTransfer.getData("text"))
    let card    = this.props.store.findCard(cardId)
    card.listId = this.props.listId

    this.props.store.updateCard(card)
  }

  preventDefault(event) {
    event.preventDefault()
  }

  list() {
    return this.props.store.findList(this.props.listId)
  }

  render() {
    let listCards    = this.props.store.findCardsByList(this.props.listId)
    let listCardsPartial = listCards.map((card) => {
      return <ListCard store={ this.props.store } cardId={ card.id } key={ card.id } />
    })

    return (
      // Chrome has a drag-and-drop bug that requires onDragOver to not propogate its event
      <div className="List" onDrop={ this.onDrop } onDragOver={ this.preventDefault } >
        <div className="List__title">{ this.list().title }</div>
        { listCardsPartial }
        <AddCard listId={ this.props.listId } store={ this.props.store }/>
      </div>
    )
  }
}