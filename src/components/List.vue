<template>
  <ul class="list">
    <li
        v-for="(item, i) in itemsWithState"
        :class="['list__item', item.isActive && 'active', item.children && 'list__item--with-sub']"
        :key="i"
    >
      <a
          href="#"
          @click.prevent="handleItemClick(item, i)"
          :id="item.id"
      >
        {{ item.label }}
      </a>
      <ul v-if="item.children" v-show="item.isActive" class="list__sub">
        <li v-for="subItem in item.children"
            :key="subItem.id"
        >
          <a
              :id="subItem.id"
              href="#"
              @click.prevent="handleItemClick(subItem)"
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
  data() {
    return {
      itemsWithState: []
    }
  },
  props: {
    items: Array,
  },
  watch: {
    stationsInputValue() {
      if (this.stationsInputValue === "") {
        // this.collapseAll()
      } else {
        this.$nextTick(() => {
          this.expandAll()
        })
      }
    },
    items() {
      this.itemsWithState = this.items.map((item) => {
        return {
          ...item,
          isActive: false
        }
      })
    }
  },

  computed: {
    ...mapState([
      'stationsInputValue'
    ]),
  },

  methods: {
    handleItemClick(item, i) {
      if (item.children) {
        this.$set(this.itemsWithState, i, {
            ...item,
            isActive: !item.isActive
          })
      } else {
        this.$emit(`item-click`, item.id)
      }
    },
    expandAll() {
      this.itemsWithState = this.itemsWithState.map((item) => {
        return {
          ...item,
          isActive: true
        }
      })
    },

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

}

.list__sub {
  list-style: none;
  flex-direction: column;
  padding: 0;
  align-items: stretch;

  a {
    padding-left: 35px;
  }
}

</style>