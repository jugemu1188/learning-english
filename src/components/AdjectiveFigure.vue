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
  
  </figure>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  table.adjective_order {
    button {
      margin: 0;
    }
    span.prefix {
      color: red;
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
</style>
