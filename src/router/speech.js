let sleep = require('sleep-async/sleep-async')()
var log = require('loglevel')
log.setLevel('info')
let single = null

export default class SpeechUtil {

  constructor (lang) {
    this.voice = SpeechUtil.getFirstVoice(lang)
    this.rec = null
    this.isRunning = false
    var SpRec = null
    var SpGrm = null

//    var SpREv = null

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
    try {
      this.rec = new SpRec()
      var speechRecognitionList = new SpGrm()
      speechRecognitionList.addFromString(grammar, 1)
      this.rec.grammars = speechRecognitionList
      this.rec.continuous = true
      this.rec.lang = 'en-US'
      this.rec.interimResults = false
      this.rec.maxAlternatives = 5
    } catch (e) {
      log.error('SpeechRecognition is not defined. ', e)
      this.rec = {}
    }

    this.rec.onresult = function (event) {
      log.info('onresult' + event)
      var rs = event.results
      for (var i = 0; i < rs.length; i++) {
        for (var j = 0; j < rs[i].length; j++) {
          log.info('You said: [' + i + '][' + j + ']' + rs[i][j].transcript)
        }
      }
    }
    this.rec.onend = function (event) {
      log.info('end...' + event)
    }
    this.rec.onerr = function (event) {
      log.info('err...' + event)
    }
    this.rec.onstart = function (event) {
    }
  }

  stop () {
    this.rec.stop()
    this.isRunning = false
  }

  start () {
    this.rec.start()
    this.isRunning = true
  };

  toggle () {
    if (this.isRunning) {
      this.stop()
    } else {
      this.start()
    }
  }

  speak (msg) {
    if (this.voice) {
      var utterThis = new SpeechSynthesisUtterance(msg)
      utterThis.voice = this.voice
      window.speechSynthesis.speak(utterThis)
    }
  }

  resetVoice (shortNoiceName) {
    let newVoice = SpeechUtil.getVoiceByShortVoiceName(shortNoiceName)
    this.voice = newVoice
  }

  static getVoices () {
    let arr = window.speechSynthesis.getVoices()
    if (arr) {
      return arr
    }
    return []
  }

  static getAsyncVoices (callback) {
    let options = {
      sleep: 1000,
      interval: 300
    }
    sleep.sleepWithCondition(
      () => {
        let arr = window.speechSynthesis.getVoices()
        return arr.length > 0
      },
      options,
      function () {
        callback(window.speechSynthesis.getVoices())
      }
    )
  }

  static getFirstVoice (lang) {
    let arr = window.speechSynthesis.getVoices()
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].lang.indexOf(lang) >= 0) {
        return arr[i]
      }
    }
    if (arr.length > 0) {
      return arr[0]
    }
    return null
  }

  static getShortVoiceName (name, lang) {
    if (name === 'native' && lang === '') {
      return name + ' (ネイティブ)'
    }
    return name.replace('Google ', '') + ' (' + lang + ')'
  }

  static getVoiceByShortVoiceName (name) {
    let obj = SpeechUtil.getVoices().filter(elm => {
      let sn = SpeechUtil.getShortVoiceName(elm.name, elm.lang)
      return sn === name
    })
    if (obj) {
      return obj[0]
    }
    return null
  }

  static getInstance () {
    if (single === null) {
      single = new SpeechUtil()
    }
    return single
  }
}
