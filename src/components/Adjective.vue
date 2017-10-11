<template>
  <div class="hello">

    <div class="jumbotron">
      <h1 class="display-3"><ruby>形容詞<rt>Adjective</rt></ruby></h1>
      <p class="lead">形容詞は名詞の形や性質や状態をあらわす単語です</p>
    </div>

    <div class="row">
      <div class="col-lg-6">

        <div class="alert alert-info text-left" role="alert">
          <p>日本語では形容詞の順番は気にしませんが、英語ではだいたいの語順があります</p>
          <blockquote>
            <p>表1.の<span class='text-danger'>赤字部分</span>をとって*1 <span class='text-danger'>OPSHACOM オプシャコム</span>と覚えます</p>
            <cite><a href="http://www.professorgrammar.com/opshacom2.shtml" target="grammer">*1 引用元 professorgrammar</a></cite>
          </blockquote>
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
import Speech from './Speech'
import AdjectiveFigure from './AdjectiveFigure'
import Exercise from './Exercise'
import ExerciseResultDialog from './ExerciseResultDialog'

export default {
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

<style lang="scss" scoped>

  .row {
    margin: 0px;
  }

</style>
