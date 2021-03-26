import { createState } from 'skruv/state.js'

export const sub = createState({
  title: 'Skruv',
  url: window.location.href,
  routeArguments: {},
  text: '',
  texts: [
    'Example text'
  ],
  route: '^/$',
  pages: {
    '^/$': 'index.js',
    '/name': 'NameBox.js',
    '/graph': 'Graph.js',
    '/markdown': 'Markdown.js',
    '/': '404.js'
  }
})
