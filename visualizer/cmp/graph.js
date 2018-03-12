'use strict'

module.exports = (render) => Object.assign(() => render `
  <chart class='db overflow-y-scroll overflow-x-hidden' style='padding-left: 5%; padding-right: 5%; height: 85%;'>
  </chart>
`, { v8cats })

function v8cats (child, merge) {
  var name = child.name

  if (/\[PRE-INLINED\]/.test(name)) return {type: 'pre-inlined'}

  if (!/\.js/.test(name)) {
    switch (true) {
      case /\[CODE:RegExp\]/.test(name): return {type: 'regexp'}
      case /\[CODE:.*\]/.test(name): return {type: 'v8'}
      case /\.$/.test(name): return {type: 'core'}
      case /\[CPP\]/.test(name): return {type: 'cpp'}
      case /\[SHARED_LIB\]/.test(name): return {type: 'cpp'}
      case /\[eval\]/.test(name): return {type: 'native'} // unless we create an eval checkbox
                                                          // "native" is the next best label since
                                                          // you cannot tell where the eval comes
                                                          // from (app, deps, core)
      default: return {type: 'v8'}
    }
  }

  switch (true) {
    case / native /.test(name): return {type: 'native'}
    case (name.indexOf('/') === -1 || /internal\//.test(name) && !/ \//.test(name)): return {type: 'core'}
    case /node_modules/.test(name): return {type: 'deps'}
    default: return {type: 'app'}
  }
}