import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { injectGlobal } from 'emotion'

import { App } from './components/'

injectGlobal`
    body {
    padding: 0;
    margin: 0;
    font-family: Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; 
    }
`

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
