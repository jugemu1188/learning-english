
export class Question {
  constructor (determiner, opinion, size, shape, age, color, origin, material, noun) {
    this.determiner = determiner
    this.adjectiveList = []
    this.selectList = []
    if (opinion) {
      this.adjectiveList.push({visible: true, category: 'opinion', word: opinion})
    }
    if (size) {
      this.adjectiveList.push({visible: true, category: 'size', word: size})
    }
    if (shape) {
      this.adjectiveList.push({visible: true, category: 'shape', word: shape})
    }
    if (age) {
      this.adjectiveList.push({visible: true, category: 'age', word: age})
    }
    if (color) {
      this.adjectiveList.push({visible: true, category: 'color', word: color})
    }
    if (origin) {
      this.adjectiveList.push({visible: true, category: 'origin', word: origin})
    }
    if (material) {
      this.adjectiveList.push({visible: true, category: 'material', word: material})
    }
    this.shuffledList = Question.shuffle(JSON.parse(JSON.stringify(this.adjectiveList)))
    this.noun = noun
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
}
