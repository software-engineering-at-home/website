const { expect } = require('chai')
const sharedModel = require('../../docs/components/models/sharedStore')

describe('Shared store model', () => {
  it('should expose the expected methods', () => {
    const actual = Object.keys(sharedModel)
    const expected = ['debug', 'state', 'setMessage', 'updateLocalStorage', 'readFromLocalStorage']
    expect(actual).to.deep.equal(expected)
  })

  it('start initialised with basic data', () => {
    const expected = {
      message: 'Hello!'
    }
    const actual = sharedModel.state
    expect(actual).to.deep.equal(expected)
  })

  it('should update the state after calling setMessage', () => {
    sharedModel.setMessage('New message')
    const expected = {
      message: 'New message'
    }
    const actual = sharedModel.state
    expect(actual).to.deep.equal(expected)
  })

  it('should provide a method to read data from local storage', () => {
    sharedModel.readFromLocalStorage()
    const expected = {
      message: 'New message'
    }
    const actual = sharedModel.state
    expect(actual).to.deep.equal(expected)
  })
})
