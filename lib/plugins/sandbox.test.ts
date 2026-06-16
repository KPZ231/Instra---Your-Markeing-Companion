import { describe, it, expect } from 'vitest'
import { loadPluginModule, callPluginExport } from './sandbox'

describe('loadPluginModule', () => {
  it('executes a CommonJS-style bundle and returns its exports', () => {
    const { exports } = loadPluginModule('module.exports = { hello: () => "hi" }')
    expect(typeof exports.hello).toBe('function')
  })

  it('throws on syntax errors instead of crashing the host', () => {
    expect(() => loadPluginModule('this is not valid js {{{')).toThrow()
  })

  it('has no access to require or process', () => {
    const { exports } = loadPluginModule(
      'module.exports = { check: () => typeof require + "," + typeof process }',
    )
    const result = (exports.check as () => string)()
    expect(result).toBe('undefined,undefined')
  })
})

describe('callPluginExport', () => {
  it('resolves with the export return value', async () => {
    const { exports } = loadPluginModule('module.exports = { run: () => 42 }')
    const result = await callPluginExport<number>(exports, 'run', [], 50)
    expect(result).toBe(42)
  })

  it('rejects when the named export is missing', async () => {
    const { exports } = loadPluginModule('module.exports = {}')
    await expect(callPluginExport(exports, 'missing', [], 50)).rejects.toThrow('not a function')
  })

  it('rejects when the export exceeds the timeout', async () => {
    const { exports } = loadPluginModule(
      'module.exports = { run: () => new Promise((r) => setTimeout(r, 200)) }',
    )
    await expect(callPluginExport(exports, 'run', [], 20)).rejects.toThrow('timed out')
  })
})
