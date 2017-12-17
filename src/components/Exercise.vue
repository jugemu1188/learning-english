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
        <transition name="fade" tag="span" v-for="(elm,idx) in shuffledList" :key="'sp-' + idx"
          v-on:before-leave="beforeLeave"
          v-on:after-leave="afterLeave"
        >
          <button type='button' class='btn btn-raised btn-success' v-show="elm.visible" @click="addWordSelection(elm)">{{elm.word}}</button>
        </transition>
      </p>
      <button type='button' v-if="completed" class='btn btn-lg btn-raised btn-primary' @click="nextQuestion" ><i class="fa fa-refresh" aria-hidden="true"></i>次の問題</button>
    </section>
    <hr>
    <section class="answer">
      <p class="sentence">
        <button type='button' disabled class='btn btn-primary btn-raised '>{{determiner}}</button>
        <button type='button' class='btn btn-raised btn-success' v-for="(elm, idx) in selectList" :key="'ans-adj-' + idx" @click="removeWordSelection(elm)">{{elm.word}}</button>
        <button type='button' disabled class='btn btn-warning btn-raised fake' v-for="(n, idx) in countOfPlaceHolder()" :key="'ans-fake-' + idx">&nbsp;</button>
        <button type='button' disabled class='btn btn-primary btn-raised '>{{noun}}</button>
      </p>
    </section>
  </div>
</template>

<script>
import QuestionGenerator from '@/QuestionGenerator'
import SpeechUtil from '@/speech'

function createCompleteMessage (result) {
  let ret = {
    isCorrect: true,
    correctWords: [],
    yourWords: [],
    correctSentence: '',
    determiner: '',
    noun: ''
  }
  if (result.determiner) {
    ret.determiner = result.determiner
    ret.correctSentence = result.determiner + ' '
  }
  result.selectList.forEach((elm, idx) => {
    let correctElm = result.adjectiveList[idx]
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
  result.adjectiveList.forEach((elm, idx) => {
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
    let d = QuestionGenerator.create()
    d.completed = false
    return d
  },
  methods: {
    countOfPlaceHolder: function () {
      return this.adjectiveList.length - this.selectList.length
    },
    addWordSelection: function (obj) {
      for (let i = 0; i < this.shuffledList.length; i++) {
        if (this.shuffledList[i].word === obj.word) {
          // this.shuffled.splice(i, 1)
          // move to afterLeave()
          this.shuffledList[i].visible = false
        }
      }
      SpeechUtil.getInstance().speak(obj.word)
    },
    removeWordSelection: function (obj) {
      this.shuffledList.push(obj)
      for (let i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i].word === obj.word) {
          this.selectList.splice(i, 1)
        }
      }
    },
    nextQuestion: function () {
      let nextQuestion = QuestionGenerator.create()
      Object.keys(nextQuestion).forEach(name => {
        this[name] = nextQuestion[name]
      })
      this.completed = false
    },
    beforeLeave: function (el) {
      Array.prototype.forEach.call(document.querySelectorAll('p.speech > button'), elm => {
        elm.setAttribute('disabled', true)
      })
    },
    afterLeave: function (el) {
      const selWord = el.innerText.toLowerCase()
      const selObj = this.shuffledList.filter(a => {
        return a.word.toLowerCase() === selWord
      })[0]
      for (let i = 0; i < this.shuffledList.length; i++) {
        if (this.shuffledList[i].word.toLowerCase() === selWord) {
          this.shuffledList[i].visible = true
          this.shuffledList.splice(i, 1)
          break
        }
      }
      this.selectList.push(selObj)
      Array.prototype.forEach.call(document.querySelectorAll('p.speech > button'), elm => {
        elm.removeAttribute('disabled')
      })
      if (this.shuffledList.length <= 0) {
        let result = createCompleteMessage(this)
        SpeechUtil.getInstance().speak(result.isCorrect ? 'Correct!' : 'Incorrect!')
        SpeechUtil.getInstance().speak(result.correctSentence)
        this.completed = true
        this.$emit('completed', result)
      }
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
            for (let i = 0; i < self.shuffledList.length; i++) {
              if (self.shuffledList[i].word.toLowerCase() === word.toLowerCase()) {
                self.addWordSelection(self.shuffledList[i])
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

.fade-leave-active {
  transition: opacity .6s
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(70px);
}
</style>
