import { Question } from '@/model/Question'

const numeral = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const opinion = ['beautiful', 'unusual', 'lovely', 'excellent', 'wonderful', 'elegant', 'cheap']
const size = {
  big: ['huge', 'big', 'large', 'enormous'],
  small: ['small', 'little', 'slim', 'enormous']
}
const shape = ['round', 'square', 'rectangular', 'oval', 'flat']
const age = {
  animal: ['young', 'old', 'baby'],
  object: ['new', 'old']
}
const color = ['black', 'gray', 'blue', 'brown', 'purple', 'red', 'green', 'pink', 'yellow', 'orange']
const origin = ['German', 'Japanese', 'Turkish', 'American', 'Asian', 'Canadian', 'Colombian']
const material = ['metal', 'wooden', 'plastic', 'silver', 'gold', 'cotton', 'paper', 'steel']
const animal = {
  big: ['elephant', 'bird', 'spider', 'whale', 'hippo', 'giraffe', 'bear'],
  small: ['raccoon', 'bird', 'turtle', 'rabbit', 'frog', 'dove']
}
const objects = ['bag', 'table', 'skirt', 'car', 'castle', 'dress']

export default class QuestionGenerator {

  static rnd (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  static getRandomSizeOf (key) {
    return QuestionGenerator.rnd(size[key])
  }

  // five huge young black Canadian bears
  static setPattern00 () {
    const numStr = QuestionGenerator.rnd(numeral)
    const unit = (numStr === 'one')
    const sizeFlg = new Date().getTime() % 2 === 0

    return new Question(
      numStr, // Determiner
      undefined, // Opinion
      QuestionGenerator.getRandomSizeOf(sizeFlg ? 'big' : 'small'), // Size
      undefined, // Shape
      QuestionGenerator.rnd(age.animal), // Age
      QuestionGenerator.rnd(color), // Color
      undefined, // Origin
      undefined, // Material
      QuestionGenerator.rnd(animal[sizeFlg ? 'big' : 'small']) + (unit ? '' : 's') // Noun
    )
  }

  // a beautiful big round clean new red dotted Italian silk shopping bag
  static setPattern01 () {
    const flg = new Date().getTime() % 2 === 0
    const sizeFlg = new Date().getTime() % 2 === 0

    return new Question(
      flg ? 'The' : 'A', // Determiner
      QuestionGenerator.rnd(opinion), // Opinion
      QuestionGenerator.getRandomSizeOf(sizeFlg ? 'big' : 'small'), // Size
      QuestionGenerator.rnd(shape), // Shape
      QuestionGenerator.rnd(age.object), // Age
      QuestionGenerator.rnd(color), // Color
      QuestionGenerator.rnd(origin), // Origin
      QuestionGenerator.rnd(material), // Material
      QuestionGenerator.rnd(objects) // Noun
    )
  }

  // Some delicious Indian cuisine
  static setPattern02 () {
    const flg = new Date().getTime() % 2 === 0

    return new Question(
      'Some', // Determiner
      'delicious', // Opinion
      undefined, // Size
      undefined, // Shape
      undefined, // Age
      undefined, // Color
      flg ? 'Indian' : 'Thai', // Origin
      undefined, // Material
      'cuisine' // Noun
    )
  }

  // a beautiful tall thin young Japanese man
  static setPattern03 () {
    const flg = new Date().getTime() % 2 === 0

    return new Question(
      'A', // Determiner
      'beautiful', // Opinion
      'tall', // Size
      undefined, // Shape
      'young', // Age
      undefined, // Color
      QuestionGenerator.rnd(origin), // Origin
      undefined, // Material
      flg ? 'man' : 'woman' // Noun
    )
  }

  // a wonderful old Italian clock
  static setPattern04 () {
    return new Question(
      'A', // Determiner
      'wonderful', // Opinion
      undefined, // Size
      undefined, // Shape
      QuestionGenerator.rnd(age.object), // Age
      undefined, // Color
      QuestionGenerator.rnd(origin), // Origin
      undefined, // Material
      'clock' // Noun
    )
  }

  static setTonguetwisters01 () {
    const flg = new Date().getTime() % 2 === 0

    return new Question(
      'A', // Determiner
      undefined, // Opinion
      'big', // Size
      undefined, // Shape
      undefined, // Age
      'black', // Color
      undefined, // Origin
      undefined, // Material
      flg ? 'bug' : 'bear' // Noun
    )
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
  static create () {
    const patternList = []
    patternList.push(QuestionGenerator.setPattern00)
    patternList.push(QuestionGenerator.setPattern01)
    patternList.push(QuestionGenerator.setPattern02)
    patternList.push(QuestionGenerator.setPattern03)
    patternList.push(QuestionGenerator.setPattern04)
    patternList.push(QuestionGenerator.setTonguetwisters01)
    return QuestionGenerator.rnd(patternList)()
  }
}

