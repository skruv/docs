import Prism from 'prismjs' // eslint-disable-line simple-import-sort/imports

import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-css-extras.js'
import 'prismjs/components/prism-graphql.js'
import 'prismjs/components/prism-markdown.js'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-diff.js'
import 'prismjs/components/prism-js-templates.js'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.js'

import { promises as fs } from 'fs'
import _glob from 'glob'
import { JSDOM } from 'jsdom'
import marked from 'marked'
import util from 'util'

const glob = util.promisify(_glob)

const parseNode = (elem) => {
  if (elem.nodeName === '#text') {
    return {
      nodeName: elem.nodeName,
      data: elem.data,
      attributes: {},
      childNodes: []
    }
  }
  return {
    nodeName: elem.nodeName.toLowerCase(),
    attributes: !elem.getAttributeNames ? {} : elem.getAttributeNames().reduce((prev, curr) => { prev[curr] = elem.getAttribute(curr); return prev }, {}),
    childNodes: Array.from(elem.childNodes).map(parseNode)
  }
}

const parseHtml = html => {
  const dom = new JSDOM(`<body>${html}</body>`)
  Array.from(dom.window.document.querySelectorAll('code')).filter(elem => !!elem.textContent).forEach(elem => {
    elem.parentNode.classList.add('language-js')
    elem.innerHTML = Prism.highlight(
      elem.textContent,
      Prism.languages.js,
      'js'
    )
  })

  const nodes = parseNode(dom.window.document.querySelector('body')).childNodes
  dom.window.close()
  return nodes
}

const parseAndWrite = async (name, html) => {
  await fs.writeFile(`${name}.js`, `export default ${JSON.stringify(parseHtml(html))}`)
}

(async () => {
  for (const type of ['js', 'html', 'json']) {
    const files = await glob(`{Tutorial,API}/**/!(libraries_built)/!(package-lock).${type}`, { ignore: '**/node_modules/**' })
    for (const file of files) {
      await parseAndWrite(file, Prism.highlight(
        await fs.readFile(file, 'utf8'),
        Prism.languages[type],
        type
      ))
    }
  }

  const diffs = await glob('{Tutorial,API}/**/diff', { ignore: '**/node_modules/**' })
  for (const file of diffs) {
    await parseAndWrite(file, Prism.highlight(
      await fs.readFile(file, 'utf8'),
      Prism.languages.diff,
      'diff-js'
    ))
  }

  const mds = await glob('{Tutorial,API}/**/*.md', { ignore: '**/node_modules/**' })
  for (const file of mds) {
    const content = await fs.readFile(file, 'utf8')
    parseAndWrite(file, marked(content))
  }

  const content = await fs.readFile('index.md', 'utf8')
  await parseAndWrite('index.md', marked(content))
})()
