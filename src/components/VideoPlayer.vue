<script setup>
import { ref } from 'vue'

const props = defineProps({
  videoUrl: String
})

const isPlaying = ref(false);

const emit = defineEmits([
  'playVideo',
  'pauseVideo',
  'previousVideo',
  'nextVideo',
])

const togglePlay = () => {
  // STOP: videoUrl empty হলে Play করা যাবে না
  if (!props.videoUrl || props.videoUrl.trim() === "") {
    return
  }

  isPlaying.value = !isPlaying.value
  isPlaying.value ? emit('playVideo') : emit('pauseVideo')
}

const prev = () => {
  emit('previousVideo')
  isPlaying.value = false
  emit('pauseVideo')
}

const next = () => {
  emit('nextVideo')
  isPlaying.value = false
  emit('pauseVideo')
}
</script>

<template>
  <div style="width: 320px; height: 180px; border: 1px solid #ccc; position: relative;">

    <!-- Play / Pause -->
    <div
      class="play-pause-button"
      @click="togglePlay"
      :style="{ opacity: (!videoUrl || videoUrl.trim()==='') ? 0.4 : 1 }"
    >
      {{ isPlaying ? '❚❚' : '▶' }}
    </div>

    <!-- Previous -->
    <div class="control-btn left" @click="prev">
      ‹
    </div>

    <!-- Next -->
    <div class="control-btn right" @click="next">
      ›
    </div>

    <div style="position: absolute; bottom: 5px; left: 10px; font-size: 12px;">
      {{ isPlaying ? 'Playing' : 'Paused' }}: {{ videoUrl || 'No video selected' }}
    </div>
  </div>
</template>

<style scoped>
.play-pause-button {
  border: 1px solid red;
  color: red;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  font-size: 16px;
  transition: 0.2s;
}

.control-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  user-select: none;
}

.control-btn.left {
  left: 10px;
}

.control-btn.right {
  right: 10px;
}
</style>
