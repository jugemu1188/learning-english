let anime = require('animejs/anime.min.js')
import AdjectiveUtil from './adjective'

$(function () {
  var _tbodyObj = $('table.adjective_order tbody')
  var _tfootObj = $('table.adjective_order tfoot')
  var _selectList = []
  var _seq
  var _fonts = ['Dawning of a New Day', 'Italianno', 'Yesteryear', 'Alex Brush', 'Caveat', 'Damion', 'Pacifico']
  var randomFontName

  function shuffle (array) {
    var n = array.length
    let t
    let i

    while (n) {
      i = Math.floor(Math.random() * n--)
      t = array[n]
      array[n] = array[i]
      array[i] = t
    }

    return array
  }

  var _refresh = function () {
    _selectList = []
    randomFontName = _fonts[Math.floor(Math.random() * _fonts.length)]
    $('button', _tbodyObj).remove()
    $('table.adjective_order tr').each(function () {
      $('td:last', this).empty()
    })
    $('tr.ignore', _tbodyObj).removeClass('ignore')
    var pObj = $('p.speech')
    pObj.empty()
    let adjObj = AdjectiveUtil.create()
    _seq = adjObj.getSeq()
    var randomList = jQuery.extend(true, [], _seq.list)
    console.log('randomList=', randomList)
    $.each(shuffle(randomList), function () {
      var sentence = this
      $('<button type="button" class="btn btn-raised selectable" style="visibility:hidden"></button>')
        .attr('id', 'ss' + sentence.category)
        .text(sentence.word)
        .addClass(sentence.category)
        .data('word', sentence.word)
        .data('category', sentence.category)
        .css('font-family', randomFontName)
        .appendTo(pObj)
    })
    $.each(adjObj.ignoreCategory(), function () {
      var trObj = $('tr.' + this, _tbodyObj)
      trObj.addClass('ignore')
      $('td:last', trObj).text('N/A')
    })
    _refreshYourChoice()

    var drawList = shuffle(randomList)
    _putButton(drawList, pObj)
  }

  var _addSpanedWord = function (sentence, parentObj) {
    var spanObj = $('<span class="large" ></span>')
      .text(sentence.word)
      .addClass(sentence.category)
      .data('word', sentence.word)
      .data('category', sentence.category)
      .css('font-family', randomFontName)
      .appendTo(parentObj)
    return spanObj
  }

  var _openDialog = function () {
    var correctObj = $('p.correct.answer')
    correctObj.empty()
    var yourObj = $('p.your.answer')
    yourObj.empty()
    var wrongCount = 0
    var correctMsg = ''
    var yourMsg = ''
    for (var i = 0; i < _seq.list.length; i++) {
      var sentence = _seq.list[i]
      var yourSentence = _selectList[i]
      var spanObj = _addSpanedWord(sentence, correctObj)
      spanObj = _addSpanedWord(yourSentence, yourObj)
      correctMsg += sentence.word + ' '
      yourMsg += yourSentence.word + ' '
      if (yourSentence.category !== sentence.category) {
        spanObj.addClass('wrong')
        wrongCount++
      }
    }
    correctMsg += _seq.noun
    yourMsg += _seq.noun
    _addSpanedWord({ word: _seq.noun, category: 'Noun' }, correctObj)
    _addSpanedWord({ word: _seq.noun, category: 'Noun' }, yourObj)

    $('#id_result').removeClass('text-danger').removeClass('text-success')
    if (wrongCount > 0) {
      $('#id_result').text('不正解').addClass('text-danger')
    } else {
      $('#id_result').text('正解').addClass('text-success')
    }
    $('#complete-dialog section.correct.answer button.speech.play').data('msg', correctMsg.trim())
    $('#complete-dialog section.your.answer button.speech.play').data('msg', yourMsg.trim())
    var pObj = $('p.speech')
    pObj.empty()
    $('<button type="button" class="btn btn-raised btn-primary next_question" >次の問題</button>')
      .appendTo(pObj)

    $('#complete-dialog').modal('show')
  }

  var _putButton = function (drawList, pObj) {
    for (var i = 0; i < drawList.length; i++) {
      var sentence = drawList[i]
      $('<button type="button" class="btn btn-raised btn-primary btn-xs rm" style="position:absolute;right:0"></button>')
        .attr('id', 'vs' + sentence.category)
        .text(sentence.word)
        .addClass(sentence.category)
        .data('word', sentence.word)
        .data('category', sentence.category)
        .css('font-family', randomFontName)
        .appendTo(pObj)
      var duration = 500
    }

    anime({
      targets: 'button.rm',
      easing: 'easeOutElastic',
      opacity: [{
        value: 0.2,
        duration: duration
      }],
      translateX: function (el, idx, len) {
        var thisObj = $(el)
        var category = thisObj.data('category')
        var divX = $('#ss' + category).position().left - thisObj.position().left
        return divX
      },
      scaleX: [{
        value: 2,
        duration: (duration * 4 / 12),
        easing: 'easeOutExpo'
      },
      {
        value: 1,
        duration: (duration * 2 / 12),
        elasticity: 400
      },
      {
        value: 0.5,
        duration: (duration * 4 / 12),
        easing: 'easeOutExpo'
      },
      {
        value: 1,
        duration: (duration * 2 / 12),
        elasticity: 500
      }
      ],
      scaleY: [{
        value: 1.1,
        duration: (duration * 4 / 12),
        delay: 100,
        easing: 'easeOutExpo'
      },
      {
        value: 1.4,
        duration: (duration * 5 / 12),
        delay: 100,
        easing: 'easeOutExpo'
      },
      {
        value: 1,
        duration: (duration * 3 / 12),
        elasticity: 300
      }
      ],
      delay: function () {
        return anime.random(0, duration / 3)
      },
      complete: function () {
        $('button.rm').remove()
        $('button', pObj).css('visibility', 'visible')
      }
    })
  }

  var _refreshYourChoice = function () {
    $('button', _tbodyObj).remove()
    $('button', _tfootObj).remove()
    $.each(_selectList, function (idx) {
      $('<button type="button" class="btn btn-raised btn-xs btn-success"></button>').text(this.word).appendTo($('tr:not(.ignore):eq(' + idx + ') td:last', _tbodyObj))
    })
    $('<button type="button" class="btn btn-xs btn-success" disabled></button>').text(_seq.noun).appendTo($('tr td:last', _tfootObj))
  }

  $('body').on('click', 'p.speech button.next_question', function () {
    _refresh()
  })

  $('body').on('click', 'p.speech button.selectable', function () {
    var id = 'a' + new Date().getTime()
    var thisObj = $(this)
    thisObj.attr('disabled', 'disabled')
    var cloneObj = thisObj.clone().appendTo(thisObj.parent())
    cloneObj.attr('id', id)
    var pos = thisObj.position()
    cloneObj.css('position', 'absolute')
    cloneObj.css('top', pos.top)
    cloneObj.css('left', pos.left)

    // _speak(thisObj.data('word'))

    var trObj = $('tr:not(.ignore):eq(' + _selectList.length + ')', _tbodyObj)
    var tdObj = $('td:last', trObj)
    var pos2 = tdObj.position()

    var txs = (pos2.left - pos.left > 0) ? '+=' + (pos2.left - pos.left) : '-=' + (pos.left - pos2.left)
    var tys = (pos2.top - pos.top > 0) ? '+=' + (pos2.top - pos.top) : '-=' + (pos.top - pos2.top)

    _selectList.push({
      category: thisObj.data('category'),
      word: thisObj.data('word')
    })
    if (_seq.list.length <= _selectList.length) {
      _openDialog()
    }
    anime({
      targets: '#' + id,
      translateX: txs,
      translateY: tys,
      scale: [{
        value: 1.5,
        duration: 500,
        easing: 'easeOutExpo'
      },
      {
        value: 1,
        duration: 500,
        elasticity: 300
      }
      ],
      rotate: '3turn',
      elasticity: function () {
        return anime.random(150, 400)
      },
      easing: 'easeOutElastic',
      duration: 1000,
      color: ['#000', '#FFF'],
      backgroundColor: ['#EEE', '#59b75c'],
      complete: function (anim) {
        cloneObj.remove()
        _refreshYourChoice()
      }
    })
  })

  $('body').on('click', 'table.adjective_order button', function () {
    var trObj = $(this).closest('tr')
    var index = $('tr:not(.ignore)', _tbodyObj).index(trObj)
    var removed = _selectList.splice(index, 1)
    $('p.speech button.' + removed[0].category).removeAttr('disabled')
    _refreshYourChoice()
  })

  $('.speech.play').click(function () {
    // var thisObj = $(this)
    // _speak(thisObj.data('msg'))
  })

  _refresh()
})

$(document).ready(function () {

  /*
    speech_util.init({'toggle_btn':'#recogniteActionBtn', 'status':'#recogniteStatus'}, function( result ){
      if( result.ok ){
        speech_util.start();
      }
    });

      $('#recogniteActionBtn').click(function(){
        speech_util.toggle();
      });
  */

})
