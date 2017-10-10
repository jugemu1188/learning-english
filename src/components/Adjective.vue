<template>
  <div class="hello">

    <div class="jumbotron">
      <h1 class="display-3">形容詞</h1>
      <p class="lead">形容詞は名詞の形や性質や状態をあらわす単語です</p>
    </div>

    <div class="row">
      <div class="col-lg-6">

        <div class="alert alert-info text-left" role="alert">
          <p>日本語では形容詞の順番は気にしませんが、英語ではだいたいの語順があります</p>
          <p>表1.の<span class='text-danger'>赤字部分</span>をとってOPSHACOM オプシャコムと覚えます</p>
        </div>

        <Speech v-on:onRecognized=acceptSentence></Speech>

      </div>
      <div class="col-lg-6">
        <AdjectiveFigure></AdjectiveFigure>
      </div>
    </div>

    <Exercise v-on:completed="openDialog" :acceptSentenceList="acceptSentenceList"></Exercise>

    <ExerciseResultDialog :result="exerciseResult"></ExerciseResultDialog>

  </div>
</template>

<script>
require('jquery')

import Speech from './Speech'
import AdjectiveFigure from './AdjectiveFigure'
import Exercise from './Exercise'
import ExerciseResultDialog from './ExerciseResultDialog'

export default {
  name: 'hello',
  components: {
    Speech,
    AdjectiveFigure,
    Exercise,
    ExerciseResultDialog
  },
  data: function () {
    return {
      msg: '形容詞',
      acceptSentenceList: [],
      exerciseResult: {
        isCorrect: false,
        correctWords: [],
        yourWords: [],
        correctSentence: '',
        noun: ''
      }
    }
  },
  methods: {
    openDialog: function (result) {
      this.exerciseResult = result
      $('#exercise-result-dialog').modal('toggle')
    },
    acceptSentence: function (saidList) {
      this.acceptSentenceList = saidList
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.row {
  margin: 0px;
}

</style>
