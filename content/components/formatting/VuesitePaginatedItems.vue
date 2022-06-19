<template>
  <div class="paginated-items">
    <div v-if="showFilter" class="filter-row">
      <Icon icon="filter" />
      <input
        v-model="filter"
        type="text"
        placeholder="Type to filter"
        class="search-filter"
        @change="resetPageNumber()"
        @keydown="resetPageNumber()"
      >
      <span class="hide-on-small-screen">Found {{ filteredItems(items).length }} {{ itemTypePlural }} {{ filter ? `containing "${filter}"` : '' }}</span>
    </div>
    <div v-if="items && filteredItems(items).length > 0">
      <div v-if="isPaginated(items)" class="pagination-top">
        <span class="pagination-size hide-on-small-screen">{{ pageSize }} {{ itemTypePlural }} / page; {{ paginatedItems.length }} in view of {{ items.length }}:</span>
        <span class="buttons">
          <button @click="previousPage">
            <Icon icon="angle-left" />
            <label class="right">Prev Page</label>
          </button>
          <span class="pagination-numbers">{{ pageNumber + 1 }} of {{ maxPages }}</span>
          <button @click="nextPage">
            <label class="left">Next Page</label>
            <Icon icon="angle-right" />
          </button>
        </span>
      </div>
      <slot :paginatedItems="paginatedItems">
        <pre>Please provide a template to render <b>paginatedItems</b></pre>
        <pre>{{ paginatedItems }}</pre>
      </slot>
      <div v-if="isPaginated(items)" class="pagination-bottom">
        <span class="pagination-eop hide-on-small-screen">End of page</span>
        <span class="buttons">
          <button @click="previousPage">
            <Icon icon="angle-left" />
            <label class="right">Prev Page</label>
          </button>
          <span class="pagination-numbers">{{ pageNumber + 1 }} of {{ maxPages }}</span>
          <button @click="nextPage">
            <label class="left">Next Page</label>
            <Icon icon="angle-right" />
          </button>
        </span>
      </div>
    </div>
    <div v-else>
      <p>No {{ itemTypePlural }} found containing "{{ filter }}".</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    showFilter: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 20
    },
    itemTypePlural: {
      type:String,
      default: 'items'
    }
  },
  data() {
    return {
      filter: '',
      pageNumber: 0
    }
  },
  computed: {
    paginatedItems() {
      return this.displayedItems(this.items)
    },
    maxPages() {
      return Math.ceil(this.filteredItems(this.items).length / this.pageSize)
    }
  },
  methods: {
    displayedItems(items) {
      const startItem = this.pageNumber * this.pageSize
      const endItem = startItem + this.pageSize
      return this.filteredItems(items)
          .slice(startItem, endItem)
    },
    filteredItems(items) {
      const filterWord = (this.filter || '').toLowerCase()
      if (filterWord) {
        return items
          .filter(item => {
            return JSON.stringify(item).toLowerCase().includes(filterWord)
          })
      }
      return items || []
    },
    isPaginated(items) {
      const pagedItems = this.filteredItems(items)
      return pagedItems.length > this.pageSize
    },
    resetPageNumber() {
      this.pageNumber = 0
    },
    nextPage() {
      this.gotoPage(this.pageNumber + 1)
    },
    previousPage() {
      this.gotoPage(this.pageNumber - 1)
    },
    gotoPage(number) {
      number = Math.max(0, number)
      number = Math.min(number, this.maxPages - 1)
      this.pageNumber = number
    }
  }
}
</script>

<style scoped>
pre {
  color: white;
}
.paginated-items {
  margin: 0.5em 0;
}

.filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5em 0;
}
input.search-filter {
  font-size: 0.9em;
  margin: 0 0.5em;
  padding: 0.3em;
  flex: 1 20;
}

.pagination-top {
  display: flex;
  padding-bottom: 5px;
  border-bottom: 2px solid #eee;
  align-items: center;
  justify-content: space-between;
}
.pagination-top > .buttons {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: -0.5em;
}

.pagination-bottom {
  display: flex;
  padding-top: 5px;
  border-top: 2px solid #eee;
  align-items: center;
  justify-content: space-between;
}
.pagination-bottom > .buttons {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: -0.5em;
}

button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  margin: 0 0.5em;
  padding: 0.5em 0.5em;
  font-family: inherit;
  font-weight: bold;
  background: #ccc;
  color: black;
}
button:hover {
  background: #ddd;
}
button:active {
  background: #aaa;
}
button > label.left {
  margin-left: 0.5em;
}
button > label.right {
  margin-right: 0.5em;
}
.pagination-numbers {
  min-width: 50px;
  text-align: center;
}
.pagination-size, .pagination-eop {
  font-size: 1.0em;
  color: #aaa;
}
@media (max-width: 719px) {
  .hide-on-small-screen {
    display: none;
  }
  .pagination-top, .pagination-bottom {
    justify-content: space-evenly;
    margin-left: -0.5em;
  }
  .pagination-top > .buttons, .pagination-bottom > .buttons {
    flex: 1 10;
  }
  .pagination-numbers {
    flex: 1 10;
  }
  input.search-filter {
    margin: 0;
  }
}
</style>
