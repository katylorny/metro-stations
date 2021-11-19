<template>
  <ul class="list" ref="list">
    <li
        :class="['list__item',  item.children ? 'list__item--with-sub' : '']"
        v-for="(item, i) in items"
        :key="i"
    >
      <a
          href="#"
          @click.prevent="handleItemClick($event, item.children)"
          :id="item.id"
      >
        {{ item.label }}
      </a>
      <ul v-if="item.children" class="list__sub">
        <li v-for="subItem in item.children"
            :key="subItem.id"
        >
          <a
              :id="subItem.id"
              href="#"
              @click.prevent="handleItemClick($event)"
          >
            {{ subItem.label }}
          </a>
        </li>
      </ul>
    </li>
  </ul>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "List",
  props: {
    items: []
  },
  watch: {
    stationsInputValue() {
      if (this.stationsInputValue === "") {
        this.collapseAll()
      } else {
        this.expandAll()
      }
    }
  },
  computed: {
    ...mapState([
      'stationsInputValue'
    ])
  },
  methods: {
    handleItemClick(e, children) {
      if (children) {
        const li = e.currentTarget.parentNode
        li.classList.contains(`active`) ? li.classList.remove(`active`) : li.classList.add(`active`)
      } else {
        this.$emit(`item-click`, e.target.id)
      }
    },
    expandAll() {
      Array.from(this.$refs.list.children).forEach((item) => {
        item.classList.add(`active`)
      })
    },
    collapseAll() {
      Array.from(this.$refs.list.children).forEach((item) => {
        item.classList.remove(`active`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding-left: 0;
  margin: 0;

  a {
    display: flex;
    align-items: flex-start;
    padding: 5px 10px 5px 20px;
    cursor: pointer;
    text-decoration: none;
    color: black;


    &:hover {
      background-color: #F5F7FA;

    }
  }
}


.list__item {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #606266;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  padding: 0;
  font-size: 14px;
  align-items: stretch;
  position: relative;

  &.list__item--with-sub::before {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    left: 5px;
    top: 8px;
    background-image: url("../assets/img/arrow-icon.svg");
    background-position: 50% 50%;
    background-size: cover;
    transform: rotate(90deg);
  }

  a {
    margin: 0;
  }

}


.list__item.active {
  &.list__item--with-sub::before {
    transform: rotate(180deg);
  }
  .list__sub {
    display: flex;
  }
}

.list__sub {
  list-style: none;
  display: none;
  flex-direction: column;
  padding: 0;
  align-items: stretch;

  a {
    padding-left: 35px;
  }
}

</style>