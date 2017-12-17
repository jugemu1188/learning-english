<template>
  <figure>
    <figcaption>表1. 形容詞の語順</figcaption>
    <table class="table table-striped table-bordered table-sm adjective_order">
      <thead>
        <tr>
          <td>順番</td>
          <td>種類</td>
          <td>例</td>
        </tr>
        <tr class='Determiner warning'>
          <td>-</td>
          <td>限定詞（determiner）</td>
          <td>a, my, this, first, seven</td>
        </tr>
      </thead>
      <tbody>
        <tr class='Opinion'>
          <td>1</td>
          <td>意見・感想<span class='hidden-lgsm'>・評価</span> （
            <span class='prefix text-danger'>op</span>inion）</td>
          <td>lovely, beautiful</td>
        </tr>
        <tr class='Size'>
          <td>2</td>
          <td>大きさ（
            <span class='prefix text-danger'>s</span>ize）</td>
          <td>big, small, tall</td>
        </tr>
        <tr class='Shape'>
          <td>3</td>
          <td>形（
            <span class='prefix text-danger'>sh</span>ape）</td>
          <td>triangular, square</td>
        </tr>
        <tr class='Age'>
          <td>4</td>
          <td>新しさ・古さ（
            <span class='prefix text-danger'>a</span>ge）</td>
          <td>young, old, new</td>
        </tr>
        <tr class='Color'>
          <td>5</td>
          <td>色（
            <span class='prefix text-danger'>c</span>olor）</td>
          <td>blue, white, yellow, black</td>
        </tr>
        <tr class='Origin'>
          <td>6</td>
          <td>所属（
            <span class='prefix text-danger'>o</span>rigin）</td>
          <td>Japanese, European<span class='hidden-lgsm'>, Buddhist</span></td>
        </tr>
        <tr class='Material'>
          <td>7</td>
          <td>素材（
            <span class='prefix text-danger'>m</span>aterials）</td>
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
    
    
  </figure>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/scss/_mixins.scss";
  @import "../assets/scss/_variables.scss";

  table.adjective_order {
    button {
      margin: 0;
    }
    span.prefix {
      font-weight: bold;
    }
    tr.ignore {
      td:last-child {
        background-image: linear-gradient( -45deg, #fff 25%, #ddd 25%, #ddd 50%, #fff 50%, #fff 75%, #ddd 75%, #ddd);
        background-size: 12px 12px;
      }
    }
    tr.ignore:nth-child(odd) td:last-child {
      background-image: linear-gradient( -45deg, #fff 25%, #eee 25%, #eee 50%, #fff 50%, #fff 75%, #eee 75%, #eee);
      background-size: 15px 15px;
    }
  }
  .hidden-lgsm {
    display: inline-block;
  }
  @media screen and (min-width: map-get($breakpoints, lg)) and (max-width: 1140px) {
    .hidden-lgsm {
      display: none;
    }
  }

</style>
