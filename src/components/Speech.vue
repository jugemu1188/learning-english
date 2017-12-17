<template>
  <div class="speech">
    <div class="card" >
      <div class="card-body">
        <div class="row">
          <div class="col-4 text-left">
            <i class="fa fa-volume-up" aria-hidden="true"></i>
            読上音声選択
          </div>
          <div class="col-8 text-left">
            <select class="custom-select" id='reader' v-model="voiceShotName" @change="resetVoice">
              <option v-for="option in voiceOptions" v-bind:value="getShortVoiceName(option.name, option.lang)" >{{  option.name  }}</option>
              <option value='' >読み上げない</option>
            </select>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-4 text-left">
            <i class="fa fa-lightbulb-o" aria-hidden="true"></i>
            音声認識
          </div>
          <div class="col-8  text-left">
            <label class="custom-control custom-checkbox">
              <input type="checkbox" name='recognition' class="custom-control-input" v-model="useSpeechRecognition" @click="toggleRecognition">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description" :class="{ 'text-muted': !useSpeechRecognition}">
                <i class="fa fa-microphone" aria-hidden="true"></i>利用する
              </span>
            </label>
          </div>
        </div>
        <div class="row result">
          <div class="col-4 text-left" :class="{ 'text-muted': !useSpeechRecognition}">
            <i class="fa fa-commenting-o" aria-hidden="true"></i>
            認識状態
          </div>
          <div class="col-8  text-left">
            <p :class="{ 'text-muted': !useSpeechRecognition}">{{status}}</p>
            <ol class="text-left">
              <li v-for="said in said_list">{{said.confidence}} : {{said.sentence}}</li>
            </ol>
            <p v-if="availableRecognition" :class="{ 'text-muted': !useSpeechRecognition}">問題を変更する場合は「Next Question!」と喋って下さい</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpeechUtil from '@/speech'

export default {
  name: 'hello',
  data: function () {
    return {
      msg: '形容詞',
      useSpeechRecognition: false,
      voiceShotName: '',
      voiceOptions: [],
      status: '停止状態',
      availableRecognition: false,
      said_list: []
    }
  },
  mounted: function () {
    var self = this
    SpeechUtil.getAsyncVoices((list) => {
      self.availableRecognition = SpeechUtil.getInstance().isAvailableRecognition()
      if (!self.availableRecognition) {
        self.status = '当ブラウザでは音声認識をご利用できません'
      }
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
        if (voice) {
          self.voiceShotName = SpeechUtil.getShortVoiceName(voice.name, voice.lang)
          SpeechUtil.getInstance().resetVoice(self.voiceShotName)
        }
      }
    })
  },
  methods: {
    getShortVoiceName: function (name, lang) {
      return SpeechUtil.getShortVoiceName(name, lang)
    },
    resetVoice: function () {
      SpeechUtil.getInstance().resetVoice(this.voiceShotName)
    },
    toggleRecognition: function () {
      let self = this
      if (this.useSpeechRecognition) {
        self.status = '認識中。正しい語順で発音してください。'
        SpeechUtil.getInstance().start(function (result) {
          if (result.status === 'end') {
            self.status = '停止状態'
            self.useSpeechRecognition = false
          } else if (result.status === 'error') {
            self.status = 'エラー状態'
            self.useSpeechRecognition = false
          } else {
            let sentendList = []
            self.status = '認識成功'
            self.said_list.splice(0, self.said_list.length)
            result.said_list.forEach(s => {
              self.said_list.push({
                confidence: '[' + (100 * s.confidence).toFixed(2) + '%]',
                sentence: s.transcript
              })
              sentendList.push(s.transcript)
            })
            self.$emit('onRecognized', sentendList)
          }
        })
      } else {
        self.status = '停止状態'
        SpeechUtil.getInstance().stop()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card-body, .card-footer {
  padding: 10px;
}
.result {
  p {
    margin-bottom: 2px;
  }
  ol {
    padding: 0px;
    margin-left: 1em;

    li {
      display: list-item;
      margin: 0px;
      padding: 0px;
    }
  }
}
</style>
