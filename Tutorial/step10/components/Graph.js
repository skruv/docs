import { css, div } from 'skruv/html.js'
import UPlot from 'uplot'

import { sub } from '../state.js'

const styles = css`
.u-wrap {
  position: relative;
}

.u-over,
.u-under {
  position: absolute;
}
`

const opts = {
  width: 600,
  height: 400,
  cursor: {
    show: false
  },
  select: {
    show: false
  },
  legend: {
    show: false
  },
  scales: {
    x: {
      time: false
    },
    z: {
      from: 'y',
      range: (u, min, max) => [(min - 32) * 5 / 9, (max - 32) * 5 / 9]
    }
  },
  series: [
    {},
    {
      stroke: 'green'
    }
  ],
  axes: [
    {},
    {
      values: (u, vals) => vals.map(v => v + '° F')
    },
    {
      scale: 'z',
      range: (u, min, max) => [Math.ceil(min), Math.ceil(max)],
      values: (u, vals) => vals.map(v => v + '° C'),
      side: 1,
      grid: { show: false },
      space: 20
    }
  ]
}

const data = [
  [1, 2, 3, 4, 5, 6, 7],
  [40, 43, 60, 65, 71, 73, 80]
]

export default () => {
  sub.title = 'Graph - Skruv'
  return div({}, styles, div({
    opaque: true,
    key: 'Graph',
    oncreate: (elem) => new UPlot(opts, data, elem)
  }))
}
