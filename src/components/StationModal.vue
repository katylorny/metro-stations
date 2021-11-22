<template>
  <el-dialog :visible.sync="isVisible" class="modal">
    <div v-if="selectedType === 'stations'" class="modal__body modal__body--stations">
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
      </div>

      <div class="modal__main">
        <p>Округ: {{ activeStation.admArea }}</p>
        <p>Район: {{ activeStation.district }}</p>
        <p>Статус: {{ activeStation.status }}</p>
      </div>

    </div>
    <div v-if="selectedType === 'stops'" class="modal__body modal__body--stops">
      <div class="modal__header">
        <h1 class="modal__title modal__title--stop">
          {{ activeStop.name }}
        </h1>
      </div>

      <div class="modal__main">
        <p>Адрес: {{ activeStop.address }}</p>
        <p> ID: {{ activeStop.id }}</p>
      </div>

    </div>
  </el-dialog>


</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import metroLogoImg from "../assets/img/metro-logo.svg"
import {SET_SELECTED_STATION_ID, SET_SELECTED_STOP_ID, SET_SELECTED_TYPE} from "../store/helpers/mutation-types";

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
      'selectedStationId',
      'selectedStopId',
      'selectedType'
    ]),
    activeStation() {
      return this.activeStationData && this.activeStationData.properties
    },
    activeStop() {
      return this.activeStopData && this.activeStopData.properties
    },
    isVisible: {
      get() {
        return !!(this.selectedStopId || this.selectedStationId)
      },
      set() {
        this.SET_SELECTED_TYPE(null)
        this.SET_SELECTED_STATION_ID(null)
        this.SET_SELECTED_STOP_ID(null)
      }
    }
  },
  methods: {
    ...mapMutations([
      SET_SELECTED_TYPE,
      SET_SELECTED_STATION_ID,
      SET_SELECTED_STOP_ID,
    ])
  }
}
</script>

<style lang="scss" scoped>

.modal {
  &::v-deep {
    .el-dialog__body {
      padding-top: 0;
    }
  }
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

.modal__body--stops {
  .modal__title {
    margin-left: 0;
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