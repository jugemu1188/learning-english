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
        <p class="mb-0">右表の赤字部分をとってOPSHACOM オプシャコムと覚えます</p>
      </div>

      </div>
      <div class="col-lg-6">

    <table class="table table-striped table-bordered table-sm  adjective_order">
      <thead>
        <tr>
          <td>順番</td>
          <td>種類</td>
          <td>例</td>
        </tr>
      </thead>
      <tbody>
        <tr class='Determiner warning'>
          <td>1</td>
          <td>限定詞（determiner）</td>
          <td>a, my, this, first</td>
        </tr>
        <tr class='Opinion'>
          <td>2</td>
          <td>意見・感想・評価 （
            <span class='prefix'>op</span>inion）</td>
          <td>lovely, beautiful</td>
        </tr>
        <tr class='Size'>
          <td>3</td>
          <td>大きさ（
            <span class='prefix'>s</span>ize）</td>
          <td>big, small, tall</td>
        </tr>
        <tr class='Shape'>
          <td>4</td>
          <td>形（
            <span class='prefix'>sh</span>ape）</td>
          <td>triangular, square</td>
        </tr>
        <tr class='Age'>
          <td>5</td>
          <td>新しさ・古さ（
            <span class='prefix'>a</span>ge）</td>
          <td>young, old, new</td>
        </tr>
        <tr class='Color'>
          <td>6</td>
          <td>色（
            <span class='prefix'>c</span>olor）</td>
          <td>blue, white, yellow, black</td>
        </tr>
        <tr class='Origin'>
          <td>7</td>
          <td>所属（
            <span class='prefix'>o</span>rigin）</td>
          <td>Japanese, European, Buddhist</td>
        </tr>
        <tr class='Material'>
          <td>8</td>
          <td>素材（
            <span class='prefix'>m</span>aterials）</td>
          <td>silk, cotton, leather</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class='Noun warning'>
          <td>-</td>
          <td>名詞（noun）</td>
          <td>brush, dog, woman</td>
        </tr>
      </tfoot>
    </table>

      </div>
    </div>

      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">練習問題</h4>
              <p>次の語句を正しい順番に並べ替えなさい</p>
        <hr>
          <section class="exercise">
              <p class="speech"></p>
            </section>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </div>


        <section id="Speech">
          <Speech></Speech>
        </section>



    <div class="row">
      <div class="hidden-xs col-sm-6">

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

import Vue from 'vue'
import Speech from './Speech'

Vue.component('Speech', Speech)

export default {
  name: 'hello',
  data: function () {
    return {
      msg: '形容詞'
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
