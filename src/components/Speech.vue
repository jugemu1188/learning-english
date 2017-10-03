<template>
  <div class="speech">
    <div class="card" >
      <div class="card-header">
        Screen reader
      </div>
      <div class="card-body">
        <h4 class="card-title">Voice</h4>
        <select v-model="voice" >
          <option v-for="option in voiceOptions" v-bind:value="option.name" >{{  option.name  }}</option>
        </select>

        <label for="id_volume">Volume</label>

        <div id="id_volume" class="slider shor slider-material-orange"></div>
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
// var i18next = require('i18next/dist/umd/i18next.min.js')

var _rec = null
var runningFlg = false

var _resetRecognition = function () {
/*

var SpRec = null
  var SpGrm = null
//  var SpREv = null

  console.log('STTT8888888888888')
  if (typeof SpeechRecognition !== 'undefined') {
    SpRec = SpeechRecognition
    SpGrm = SpeechGrammarList
//    SpREv = SpeechRecognitionEvent
  } else if (typeof webkitSpeechRecognition !== 'undefined') {
    SpRec = webkitSpeechRecognition
    SpGrm = webkitSpeechGrammarList
//    SpREv = webkitSpeechRecognitionEvent
  } else if (typeof msSpeechRecognition !== 'undefined') {
    SpRec = msSpeechRecognition
    SpGrm = msSpeechGrammarList
//    SpREv = msSpeechRecognitionEvent
  } else if (typeof mozSpeechRecognition !== 'undefined') {
    SpRec = mozSpeechRecognition
    SpGrm = mozSpeechGrammarList
//    SpREv = mozSpeechRecognitionEvent
  }

  var colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow']
  var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

  console.log('STTT77777777777', SpRec)
  _rec = new SpRec()
  console.log('STTT6666666666')
  var speechRecognitionList = new SpGrm()
  console.log('STTT0000000')
  speechRecognitionList.addFromString(grammar, 1)
  console.log('STTT1111111111111')
  _rec.grammars = speechRecognitionList
  _rec.continuous = true
  _rec.lang = 'en-US'
  _rec.interimResults = false
  _rec.maxAlternatives = 5

  console.log('STTT')

  _rec.onresult = function (event) {
    console.log('onresult' + event)
    var rs = event.results
    for (var i = 0; i < rs.length; i++) {
      for (var j = 0; j < rs[i].length; j++) {
        console.log('You said: [' + i + '][' + j + ']' + rs[i][j].transcript)
      }
    }
  }
  _rec.onend = function (event) {
    console.log('end...' + event)
  }
  _rec.onerr = function (event) {
    console.log('err...' + event)
  }
  _rec.onstart = function (event) {
  }
  */
}

var _start = function () {
  _rec.start()
  runningFlg = true
}

var _stop = function () {
  _rec.stop()
  runningFlg = false
}

function start () {
  _start()
};
function toggle () {
  if (runningFlg) {
    _stop()
  } else {
    _start()
  }
};

function speak (shortNoiceName, msg) {
  var utterThis = new SpeechSynthesisUtterance(msg)
  utterThis.voice = 'aaa'
  window.speechSynthesis.speak(utterThis)
};

function resetSelectOptions (thisData, list) {
  thisData.voiceOptions.splice(0, thisData.voiceOptions.length)
  thisData.voice = null
  for (let i = 0; i < list.length; i++) {
    if (list[i].lang === 'en-GB' || list[i].lang === 'en-US') {
      thisData.voice = list[i].name
    }
    thisData.voiceOptions.push(list[i])
  }
  if (thisData.voice === null) {
    thisData.voice = list[0].name
  }
};

export default {
  name: 'hello',
  data: function () {
    return {
      msg: '形容詞',
      voice: '',
      voiceOptions: [{lang: 'ja-JP', name: 'No-voice-list'}]
    }
  },
  created: function () {
    console.log('created=', this)
  },
  mounted: function () {
    console.log('mounted=', this)
    var self = this
    setTimeout(function () {
      let list = window.speechSynthesis.getVoices()
      if (list && list.length > 0) {
        resetSelectOptions(self, list)
      } else {
        setTimeout(function () {
          let list = window.speechSynthesis.getVoices()
          if (list && list.length > 0) {
            resetSelectOptions(self, list)
          } else {
            console.log('dame')
          }
        }, 1500)
      }
      _resetRecognition()
    }, 1500)
  },
  methods: {
    getShortVoiceName: function (name, lang) {
      if (name === 'native' && lang === '') {
        return name + ' (ネイティブ)'
      }
      return name.replace('Google ', '') + ' (' + lang + ')'
    }
  },
  speak: speak,
  toggle: toggle,
  start: start
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
