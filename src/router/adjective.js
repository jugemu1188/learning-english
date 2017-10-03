var numeral = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
var opinion = ['beautiful', 'unusual', 'lovely']
var size = {
  big: ['huge', 'big', 'large', 'enormous'],
  small: ['small', 'little', 'slim', 'enormous']
}
var shape = ['round', 'square', 'rectangular']
var age = {
  animal: ['young', 'old', 'baby'],
  object: ['new', 'old']
}
var color = ['black', 'gray', 'blue', 'brown', 'purple', 'red', 'green', 'pink', 'yellow', 'orange']
var origin = ['German', 'Japanese', 'Turkish', 'American', 'Asian', 'Chadian', 'Colombian']
var material = ['metal', 'wooden', 'plastic', 'silver', 'gold', 'cotton', 'paper']
var animal = {
  big: ['elephant', 'bird', 'spider', 'whale', 'hippo', 'giraffe'],
  small: ['raccoon', 'bird', 'turtle', 'rabbit', 'frog', 'dove']
}
var objects = ['bag', 'Ruck sack', 'Luggage']

const IGNORE_CATEGORIES = ['Determiner', 'Opinion', 'Size', 'Shape', 'Age', 'Color', 'Origin', 'Material']

export default class AdjectiveUtil {

  constructor (category, word) {
    this.seq = {
      list: [],
      noun: null,
      toString: function () {
        var arr = []
        for (var i = 0; i < this.list.length; i++) {
          arr.push(this.list[i].word)
        }
        return arr.join(' ')
      }
    }
  }

  static rnd (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  ignoreCategory () {
    let arr = []
    Object.assign(arr, IGNORE_CATEGORIES)
    for (var i = 0; i < this.seq.list.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (this.seq.list[i].category === arr[j]) {
          arr.splice(j, 1)
          break
        }
      }
    }
    return arr
  }

  getSeq () {
    return this.seq
  }

  put (category, word) {
    if (category === 'Noun') {
      this.seq.noun = word
    } else {
      this.seq.list.push({
        category: category,
        word: word
      })
    }
  }

  // five huge young black Canadian bears
  setPattern00 () {
    var numStr = AdjectiveUtil.rnd(numeral)
    var unit = (numStr === 'one')
    this.put('Determiner', numStr)
    let sizeFlg = new Date().getTime() % 2 === 0
    this.put('Size', AdjectiveUtil.rnd(size[sizeFlg ? 'big' : 'small']))
    this.put('Age', AdjectiveUtil.rnd(age.animal))
    this.put('Color', AdjectiveUtil.rnd(color))
    this.put('Noun', AdjectiveUtil.rnd(animal[sizeFlg ? 'big' : 'small']) + (unit ? '' : 's'))
  }

  // a beautiful big round clean new red dotted Italian silk shopping bag
  setPattern01 () {
    // var numStr = AdjectiveUtil.rnd(numeral)
    // var unit = (numStr === 'one')
    var flg = new Date().getTime() % 2 === 0
    this.put('Determiner', flg ? 'The' : 'A')
    this.put('Opinion', AdjectiveUtil.rnd(opinion))
    var sizeFlg = new Date().getTime() % 2 === 0
    this.put('Size', AdjectiveUtil.rnd(size[sizeFlg ? 'big' : 'small']))
    this.put('Shape', AdjectiveUtil.rnd(shape))
    this.put('Age', AdjectiveUtil.rnd(age.object))
    this.put('Color', AdjectiveUtil.rnd(color))
    this.put('Origin', AdjectiveUtil.rnd(origin))
    this.put('Material', AdjectiveUtil.rnd(material))
    this.put('Noun', AdjectiveUtil.rnd(objects))
  }

  setTonguetwisters01 () {
    var flg = new Date().getTime() % 2 === 0
    this.put('Determiner', 'A')
    this.put('Size', 'big')
    this.put('Color', 'black')
    this.put('Noun', flg ? 'bug' : 'bear')
  }

  static create () {
    let obj = new AdjectiveUtil()
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        obj.setPattern00()
        break
      case 1:
        obj.setPattern01()
        break
      case 2:
        obj.setTonguetwisters01()
        break
    }
    console.log('created', obj)
    return obj
  }

  static create00 () {
    let obj = new AdjectiveUtil()
    obj.setPattern00()
    return obj
  }
}

