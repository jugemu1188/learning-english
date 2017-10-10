<template>
  <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">練習問題</h4>
    <p>
      <i class="fa fa-question-circle" aria-hidden="true"></i>
      次の語句を正しい順番に並べ替えなさい
    </p>
    <hr>
    <section class="question">
      <p class="speech">
        <button type='button' class='btn btn-raised btn-success' v-for="elm in shuffled" @click="addWordSelection(elm)">{{elm.word}}</button>
      </p>
      <button type='button' v-if="completed" class='btn btn-lg btn-raised btn-primary' @click="nextQuestion" ><i class="fa fa-refresh" aria-hidden="true"></i>次の問題</button>
    </section>
    <hr>
    <section class="answer">
      <p class="sentence">
        <button type='button' class='btn btn-raised btn-success' v-for="elm in selectList" @click="removeWordSelection(elm)">{{elm.word}}</button>
        <button type='button' disabled class='btn btn-warning btn-raised fake' v-for="n in countOfPlaceHolder()">&nbsp;</button>
        <button type='button' disabled class='btn btn-primary btn-raised '>{{noun}}</button>
      </p>
    </section>
  </div>
</template>

<script>
require('jquery')

import AdjectiveUtil from '@/router/adjective'
import SpeechUtil from '@/router/speech'

function createCompleteMessage (result) {
  let ret = {
    isCorrect: true,
    correctWords: [],
    yourWords: [],
    correctSentence: '',
    noun: ''
  }
  result.selectList.forEach((elm, idx) => {
    let correctElm = result.list[idx]
    let o = {
      word: elm.word,
      wrong: false
    }
    if (elm.word !== correctElm.word) {
      ret.isCorrect = false
      o.wrong = true
    }
    ret.yourWords.push(o)
  })
  result.list.forEach((elm, idx) => {
    ret.correctWords.push({
      word: elm.word,
      category: elm.category
    })
    ret.correctSentence += elm.word + ' '
  })
  ret.correctSentence += result.noun + '.'
  ret.noun = result.noun
  return ret
}

export default {
  name: 'hello',
  props: {
    acceptSentenceList: {
      type: Array,
      default: []
    }
  },
  data: function () {
    let d = AdjectiveUtil.create()
    d.completed = false
    return d
  },
  methods: {
    countOfPlaceHolder: function () {
      return this.list.length - this.selectList.length
    },
    addWordSelection: function (obj) {
      this.selectList.push(obj)
      for (let i = 0; i < this.shuffled.length; i++) {
        if (this.shuffled[i].word === obj.word) {
          this.shuffled.splice(i, 1)
        }
      }
      if (this.shuffled.length <= 0) {
        let result = createCompleteMessage(this)
        SpeechUtil.getInstance().speak(result.isCorrect ? 'Correct!' : 'Incorrect!')
        SpeechUtil.getInstance().speak(result.correctSentence)
        this.completed = true
        this.$emit('completed', result)
      } else {
        SpeechUtil.getInstance().speak(obj.word)
      }
    },
    removeWordSelection: function (obj) {
      this.shuffled.push(obj)
      for (let i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i].word === obj.word) {
          this.selectList.splice(i, 1)
        }
      }
    },
    nextQuestion: function () {
      let nextQuestion = AdjectiveUtil.create()
      Object.keys(nextQuestion).forEach(name => {
        this[name] = nextQuestion[name]
      })
      this.completed = false
    }
  },
  watch: {
    acceptSentenceList: function (newVal, oldVal) {
      let self = this
      if (newVal && newVal.length > 0) {
        if (newVal.filter(sentence => sentence === 'next question').length > 0) {
          self.nextQuestion()
        }
        newVal.forEach(sentence => {
          sentence.split(' ').forEach(word => {
            for (let i = 0; i < self.shuffled.length; i++) {
              if (self.shuffled[i].word === word) {
                self.addWordSelection(self.shuffled[i])
              }
            }
          })
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div.alert.alert-success {
  margin-top: 4px;
}
button {
  margin-right: 5px;
}
.answer {
  button {
    &.fake {
      width: 4em;
    }
    &[disabled] {
      cursor: not-allowed;
    }
  }
}
</style>
