<template>
  <div class="overlay" v-if="isOpened" @click.self="closeModal">
    <div class="modal">
      <div class="modal__header">
        <h1 class="modal__title">
          {{ activeStation.name }}
        </h1>
        <button class="modal__close-button" @click="closeModal">
          <i class="el-icon-close"></i>
        </button>
      </div>

      <div class="modal__main">
        <p>Округ: {{ activeStation.admArea }}</p>
        <p>Район: {{ activeStation.district }}</p>
        <p>Статус: {{ activeStation.status }}</p>
      </div>

    </div>
  </div>
</template>

<script>
import {eventBus} from "../main";
import {mapGetters} from "vuex";

export default {
  name: "StationModal",
  props: {
    title: String
  },
  data() {
    return {
      id: '',
      isOpened: false,
      activeStation: {},
      // admArea: '',
      // color: ''
    }
  },
  created() {
    eventBus.$on(`onStationClick`, ({activeStationId}) => {
      this.id = activeStationId
      this.isOpened = true
      this.activeStation = this.getStationById(this.id).properties
    })
  },
  computed: {
    ...mapGetters([
      'getStationById'
    ])
  },
  methods: {
    closeModal() {
      this.isOpened = false
      // this.$emit(`close`)
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(128, 128, 128, 0.55);
  position: absolute;
  top: 0;
  left: 0;
}

.modal {
  min-width: 500px;
  background: white;
  padding: 20px;
  min-height: 200px;
  border-radius: 6px;
}

.modal__header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.modal__title {
  margin-right: 10px;
  font-size: 18px;
}

.modal__close-button {
  padding: 0;
  margin-left: auto;
  cursor: pointer;
  border: none;
  height: 20px;
  width: 20px;
  background: transparent;
}

.modal__main {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  p {
    margin-top: 0;
  }
}
</style>