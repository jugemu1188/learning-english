import QuestionGenerator from './QuestionGenerator'

let sleep = require('sleep-async/sleep-async')()
var log = require('loglevel')
log.setLevel('info')
let single = null

function createRecognitionResult (rs) {
  let result = {
    status: 'success',
    said_list: []
  }
  for (var i = 0; i < rs.length; i++) {
    for (var j = 0; j < rs[i].length; j++) {
      result.said_list.push(rs[i][j])
    }
  }

  return result
}

export default class SpeechUtil {

  constructor (lang) {
    let self = this
    this.voice = SpeechUtil.getFirstVoice(lang)
    this.rec = null
    this.isRunnningRecognition = false
    this.isLoopRequired = false
    this.numOfEndRecognitionResult = 0
    this.callbackOnRecognitionResult = null
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
    var words = QuestionGenerator.getWords()
    var grammar = '#JSGF V1.0; grammar words; public <words> = ' + words.join(' | ') + ' ;'
    try {
      this.rec = new SpRec()
      var speechRecognitionList = new SpGrm()
      speechRecognitionList.addFromString(grammar, 1)
      this.rec.grammars = speechRecognitionList
      this.rec.continuous = false
      this.rec.lang = 'en-US'
      this.rec.interimResults = false
      this.rec.maxAlternatives = 3
    } catch (e) {
      log.error('SpeechRecognition is not defined. ', e)
      this.rec = {}
    }

    this.rec.onresult = function (event) {
      this.hasRecognitionResult = true
      var rs = event.results
      if (self.callbackOnRecognitionResult) {
        self.callbackOnRecognitionResult(createRecognitionResult(rs))
      }
    }
    this.rec.onend = function (event) {
      self.isRunnningRecognition = false
      self.numOfEndRecognitionResult++
      log.info('end...', self.isLoopRequired)
      if (self.isLoopRequired && self.numOfEndRecognitionResult < 100) {
        self.isRunnningRecognition = true
        self.rec.start()
      } else {
        if (self.callbackOnRecognitionResult) {
          self.callbackOnRecognitionResult({
            status: 'end'
          })
        }
      }
    }
    this.rec.onerr = function (event) {
      if (self.callbackOnRecognitionResult) {
        self.callbackOnRecognitionResult({
          status: 'error'
        })
      }
    }
    this.rec.onstart = function (event) {
      self.numOfEndRecognitionResult = 0
      self.isRunnningRecognition = true
      log.info('start...')
    }
  }

  stop () {
    this.rec.stop()
    this.isLoopRequired = false
  }

  start (callback) {
    if (this.isAvailableRecognition()) {
      this.isLoopRequired = true
      this.rec.start()
      this.callbackOnRecognitionResult = callback
    } else {
      callback({
        status: 'error'
      })
    }
  };

  toggle () {
    if (this.isRunnningRecognition) {
      this.stop()
    } else {
      this.start()
    }
  }

  isAvailableRecognition () {
    return this.rec && this.rec.start
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
    if (!window.speechSynthesis) {
      return []
    }
    let arr = window.speechSynthesis.getVoices()
    if (arr) {
      return arr
    }
    return []
  }

  static getAsyncVoices (callback) {
    if (!window.speechSynthesis) {
      callback([])
      return
    }
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
    if (!window.speechSynthesis) {
      return null
    }
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
