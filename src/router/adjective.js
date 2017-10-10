const numeral = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const opinion = ['beautiful', 'unusual', 'lovely']
const size = {
  big: ['huge', 'big', 'large', 'enormous'],
  small: ['small', 'little', 'slim', 'enormous']
}
const shape = ['round', 'square', 'rectangular']
const age = {
  animal: ['young', 'old', 'baby'],
  object: ['new', 'old']
}
const color = ['black', 'gray', 'blue', 'brown', 'purple', 'red', 'green', 'pink', 'yellow', 'orange']
const origin = ['German', 'Japanese', 'Turkish', 'American', 'Asian', 'Chadian', 'Colombian']
const material = ['metal', 'wooden', 'plastic', 'silver', 'gold', 'cotton', 'paper']
const animal = {
  big: ['elephant', 'bird', 'spider', 'whale', 'hippo', 'giraffe', 'bear'],
  small: ['raccoon', 'bird', 'turtle', 'rabbit', 'frog', 'dove']
}
const objects = ['bag', 'Ruck sack', 'Luggage']

const IGNORE_CATEGORIES = ['Determiner', 'Opinion', 'Size', 'Shape', 'Age', 'Color', 'Origin', 'Material']

var single

export default class AdjectiveUtil {

  constructor (category, word) {
    this.list = []
    this.selectList = []
    this.noun = null
  }

  static shuffle (array) {
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

  static rnd (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  ignoreCategory () {
    let arr = []
    Object.assign(arr, IGNORE_CATEGORIES)
    for (var i = 0; i < this.list.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (this.list[i].category === arr[j]) {
          arr.splice(j, 1)
          break
        }
      }
    }
    return arr
  }

  put (category, word) {
    if (category === 'Noun') {
      this.noun = word
    } else {
      this.list.push({
        category: category,
        isShowing: true,
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
    single = new AdjectiveUtil()
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        single.setPattern00()
        break
      case 1:
        single.setPattern01()
        break
      case 2:
        single.setTonguetwisters01()
        break
    }
    let clonedList = JSON.parse(JSON.stringify(single.list))
    single.shuffled = AdjectiveUtil.shuffle(clonedList)
    return single
  }

  static create00 () {
    single = new AdjectiveUtil()
    single.setPattern00()
    return single
  }

  static getInstance () {
    return single
  }

  static getWords () {
    let arr = ['The', 'A'].concat(numeral)
    arr = arr.concat(opinion)
    arr = arr.concat(size.big)
    arr = arr.concat(size.small)
    arr = arr.concat(shape)
    arr = arr.concat(age.animal)
    arr = arr.concat(age.object)
    arr = arr.concat(color)
    arr = arr.concat(origin)
    arr = arr.concat(material)
    arr = arr.concat(animal.big)
    arr = arr.concat(animal.small)
    arr = arr.concat(objects)

    return arr
  }

}

