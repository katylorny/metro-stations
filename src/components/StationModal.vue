<template>
  <div class="overlay" @click.self="closeModal">
    <div v-if="selectedType === 'stations'" class="modal modal--stations">
      <div class="modal__header">
        <inline-svg
            :src="metroLogoImg"
            width="25"
            height="25"
            :fill="activeStation.color"
            aria-label="My image"
        />
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
    <div v-if="selectedType === 'stops'" class="modal modal--stops">
      <div class="modal__header">
        <h1 class="modal__title modal__title--stop">
          {{ activeStop.name }}
        </h1>
        <button class="modal__close-button" @click="closeModal">
          <i class="el-icon-close"></i>
        </button>
      </div>

      <div class="modal__main">
        <p>Адрес: {{ activeStop.address }}</p>
        <p> ID: {{ activeStop.id }}</p>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import metroLogoImg from "../assets/img/metro-logo.svg"
import mutationTypes from "../store/mutation-types";

export default {
  name: "StationModal",
  data() {
    return {
      metroLogoImg,
    }
  },
  computed: {
    ...mapGetters([
      'activeStationData',
      'activeStopData'
    ]),
    ...mapState([
      'selectedStationIdId',
      'selectedType'
    ]),
    activeStation() {
      return this.activeStationData.properties
    },
    activeStop() {
      return this.activeStopData.properties
    }
  },
  methods: {
    closeModal() {
      this.$store.commit(mutationTypes.SET_SELECTED_STOP_ID, null)
      this.$store.commit(mutationTypes.SET_SELECTED_STATION_ID, null)
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
  margin-left: 8px;
  margin-top: 16px;
}

.modal__title--stop {
  margin-left: 0;
}

.modal__close-button {
  padding: 0;
  margin-left: auto;
  cursor: pointer;
  border: none;
  height: 20px;
  width: 20px;
  background: transparent;
  transition: all 0.2s ease;

  i {
    font-size: 20px;
  }

  &:hover {
    transform: scale(1.3);
  }
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