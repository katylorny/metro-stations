<template>
  <el-dialog :visible.sync="isVisible" class="modal">
    <div class="modal__body modal__body--stations">
      <div class="modal__header">
        <inline-svg
            :src="metroLogoImg"
            width="25"
            height="25"
            :fill="activeCardData.color || 'black'"
            aria-label="My image"
        />
        <h1 class="modal__title">
          {{ activeCardData.name }}
        </h1>
      </div>

      <div class="modal__main">
        <p v-for="(prop, i) in activeCardData.properties" :key="i">
          {{ prop.name }}: {{ activeCardData[prop.id] }}
        </p>
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
      config: {
        stations: {
          properties: [
            {
              id: 'admArea',
              name: 'Округ'
            },
            {
              id: 'district',
              name: 'Район'
            },
            {
              id: 'status',
              name: 'Статус'
            }
          ]
        },
        stops: {
          properties: [
            {
              id: 'id',
              name: 'ID'
            },
            {
              id: 'address',
              name: 'Адрес'
            },

          ]
        }
      }
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
    activeCardData() {
      let data = {}
      if (this.activeStationData) {
        data = {
          properties: this.config.stations.properties,
          ...this.activeStationData.properties
        }
      } else if (this.activeStopData) {
        data = {
          properties: this.config.stops.properties,
          ...this.activeStopData.properties
        }
      }
      return data
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

.modal__main {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  p {
    margin-top: 0;
  }
}


</style>