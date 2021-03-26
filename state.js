import { createState } from 'skruv/state.js'

export const sub = createState({
  title: 'Skruv',
  url: window.location.href,
  routeArguments: {},
  activeRoute: '',
  pages: {
    '^/$': 'Home.js',
    '/API/?(?<file>.*)': 'API.js',
    '/Tutorial/(?<step>.*)/': 'GettingStarted.js',
    '/': '404.js'
  },
  files: [],
  activeFile: '',
  steps: [],
  activeStep: '',
  menu: {
    '/': {
      title: 'Home',
      icon: true
    },
    '/Tutorial/step0/': {
      title: 'Tutorial'
    },
    '/API': {
      title: 'API'
    },
    'https://github.com/skruv/skruv': {
      title: 'Github'
    },
    'https://www.npmjs.com/package/skruv': {
      title: 'NPM'
    }
  }
})
