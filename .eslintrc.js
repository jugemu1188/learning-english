// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  globals: {
    "$": true,
    "jQuery": true,
    "webkitSpeechRecognition": true,
    "webkitSpeechGrammarList": true,
    "webkitSpeechRecognitionEvent": true,
    "mozSpeechRecognition": true,
    "mozSpeechGrammarList": true,
    "mozSpeechRecognitionEvent": true,
    "msSpeechRecognition": true,
    "msSpeechGrammarList": true,
    "msSpeechRecognitionEvent": true,
    "SpeechRecognition": true,
    "SpeechGrammarList": true,
    "SpeechRecognitionEvent": true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
