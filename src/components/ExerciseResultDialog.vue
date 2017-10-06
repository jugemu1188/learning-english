<template>
  <div class="modal fade in" tabindex="-1" id="exercise-result-dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">{{ result.isCorrect ? '正解' : '不正解' }}</h1>
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        </div>
        <div class="modal-body">
          <section class="correct answer ">
            <h3 class="text-success">正しい回答
              <button type='button' class='btn btn-raised btn-default' @click="playCorrectAnswer">再生</button>
            </h3>
            <p class="correct answer">{{result.correctSentence}}</p>
          </section>
          <hr>
          <section class="your answer">
            <h3>あなたの回答
              <button type='button' class='btn btn-raised btn-default' @click="playYourAnswer">再生</button>
            </h3>
            <p class="your answer">
              <span v-for="w in result.yourWords" :class="{ wrong: w.wrong }">{{w.word + ' '}}</span>
              <span>{{result.noun}}.</span>
            </p>
          </section>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="close">
              <span class="glyphicon glyphicon-remove"></span>
              <span data-i18n="common.close">Close</span>
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpeechUtil from '@/router/speech'

var log = require('loglevel')
log.setLevel('info')
export default {
  props: {
    title: {
      type: String,
      default: 'お手本詳細設定'
    },
    result: {
      isCorrect: {
        type: Boolean
      },
      correctSentence: {
        type: String
      },
      yourWords: {
        type: Array,
        default: []
      },
      noun: {
        type: String
      }
    }
  },
  data: function () {
    return {}
  },
  methods: {
    close: function () {
      this.$emit('close', {})
    },
    playYourAnswer: function () {
      let sentence = ''
      this.result.yourWords.forEach(w => {
        sentence += w.word + ' '
      })
      sentence += this.result.noun + '.'
      SpeechUtil.getInstance().speak(sentence)
    },
    playCorrectAnswer: function () {
      SpeechUtil.getInstance().speak(this.result.correctSentence)
    }
  }
}
</script>

<style scoped lang="scss">
  section {
    text-align: left;
  }
  .modal-header {
    text-align: center;
  }
  .your.answer {
    .wrong {
      color: red;
    }
  }
</style>