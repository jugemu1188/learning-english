<template>
  <div class="speech">
    <div class="card" >
      <div class="card-header">
        読み上げ音声選択
      </div>
      <div class="card-body">
        <select v-model="voiceShotName" @change="resetVoice">
          <option v-for="option in voiceOptions" v-bind:value="getShortVoiceName(option.name, option.lang)" >{{  option.name  }}</option>
          <option value='' >読み上げない</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
require('jquery')
require('popper.js/dist/umd/popper.min.js')
require('bootstrap-material-design/dist/css/bootstrap-material-design.min.css')
require('bootstrap-material-design/dist/js/bootstrap-material-design.min.js')
require('font-awesome/css/font-awesome.css')
import SpeechUtil from '@/router/speech'

export default {
  name: 'hello',
  data: function () {
    return {
      msg: '形容詞',
      voiceShotName: '',
      voiceOptions: []
    }
  },
  mounted: function () {
    var self = this
    SpeechUtil.getAsyncVoices((list) => {
      if (list) {
        self.voiceOptions.splice(0, self.voiceOptions.length)
        self.voiceShotName = null
        for (let i = 0; i < list.length; i++) {
          self.voiceOptions.push(list[i])
        }
        let voice = SpeechUtil.getFirstVoice('en-')
        if (voice === null) {
          voice = self.voiceOptions[0]
        }
        self.voiceShotName = SpeechUtil.getShortVoiceName(voice.name, voice.lang)
        SpeechUtil.getInstance().resetVoice(self.voiceShotName)
      }
    })
  },
  methods: {
    getShortVoiceName: function (name, lang) {
      return SpeechUtil.getShortVoiceName(name, lang)
    },
    resetVoice: function () {
      SpeechUtil.getInstance().resetVoice(this.voiceShotName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
