<template>
  <div>
    <input type="range" ref="range" v-model="value" step="0.001" class="slider">
    <span>{{value}}</span>
  </div>
</template>

<script>
export default {
    name: 'RangeSlider',
    props: ['max'],
    data: () => ({
        value: 0
    }),
    mounted() {
        this.setMax();
    },
    watch: {
        max() {
            this.setMax();
        }
    },
    methods: {
        setMax() {
            this.$refs.range.setAttribute('max', this.max);
        }
    }
}
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  height: 7px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  margin-right: 5px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%; 
  background: #e0a800;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #e0a800;
  cursor: pointer;
}
</style>