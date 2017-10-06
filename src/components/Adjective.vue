<template>
  <div class="hello">

    <div class="jumbotron">
      <h1 class="display-3">形容詞</h1>
      <p class="lead">形容詞は名詞の形や性質や状態をあらわす単語です</p>
    </div>

    <div class="row">
      <div class="col-lg-6">

        <div class="alert alert-info text-left" role="alert">
          <p>日本語では形容詞の順番は気にしませんが、</p>
          <p>英語ではだいたいの語順があります</p>
          <hr>
          <p class="mb-0">表1.の赤字部分をとってOPSHACOM オプシャコムと覚えます</p>
        </div>

        <Speech></Speech>

      </div>
      <div class="col-lg-6">
        <AdjectiveFigure></AdjectiveFigure>
      </div>
    </div>

    <Exercise v-on:completed="openDialog"></Exercise>

    <ExerciseResultDialog :result="exerciseResult"></ExerciseResultDialog>

  </div>
</template>

<script>
require('jquery')
require('popper.js/dist/umd/popper.min.js')
require('bootstrap-material-design/dist/css/bootstrap-material-design.min.css')
require('bootstrap-material-design/dist/js/bootstrap-material-design.min.js')
require('font-awesome/css/font-awesome.css')
// var i18next = require('i18next/dist/umd/i18next.min.js')

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
      exerciseResult: {
        isCorrect: false,
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
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1,
h2 {
  font-weight: normal;
}


</style>
