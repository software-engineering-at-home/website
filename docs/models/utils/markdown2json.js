
const marked = require('marked')
const cheerio = require('cheerio')

function markdownTo$ (markdown) {
  const html = marked.parse(markdown)
  return cheerio.load(html)
}

const tagActions = {
  h1: addTitle,
  h2: addTitle,
  h3: addTitle,
  ul: addList,
  li: addListItem,
  p: addParagraph,
  default: addMeta
}

function append (obj, property, value) {
  const list = obj[property] || []
  list.push(value)
  obj[property] = list
}

function addParagraph (acc, item) {
  append(acc.currentNode, 'items', item.text)
  return acc
}

function addMeta (acc, item) {
  append(acc.currentNode, 'items', item)
  return acc
}

function addTitle (acc, item) {
  const level = Number.parseInt(item.tag.split('')[1])
  if (level <= acc.currentLevel) {
    // step up a level
    acc.currentNode = acc.currentParent
  } else {
    // step down a level
    acc.currentParent = acc.currentNode
    acc.currentNode = {}
  }
  append(acc, 'sections', acc.currentNode)
  acc.currentNode.title = item.text

  return acc
}

function addList (acc, item) {
  acc.currentList = []
  append(acc.currentNode, 'items', acc.currentList)
  return acc
}

function addListItem (acc, item) {
  const list = acc.currentList || []
  acc.currentList = list
  list.push(item.text)
  return acc
}

function createHierarchy (acc, item) {
  acc.currentLevel = acc.currentLevel || 0
  acc.currentNode = acc.currentNode || acc
  acc.currentParent = acc.currentParent || acc

  const action = tagActions[item.tag] || tagActions.default

  return action(acc, item)
}

function createDocumentFrom (orderedItems) {
  const { sections, items } = orderedItems.reduce(createHierarchy, {})
  const document = {
    items,
    sections
  }
  return document
}

function convertMarkdownToDocument (markdown) {
  const $ = markdownTo$(markdown)

  const items = $('h1, h2, h3, p, ul, li').toArray().map(el => {
    const tag = el.name
    const text = ($(el).text() || '').trim()
    return {
      tag,
      text
    }
  })
  return createDocumentFrom(items)
}

module.exports = {
  createDocumentFrom,
  convertMarkdownToDocument
}
