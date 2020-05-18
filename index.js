'use strict'

const core = require('@actions/core')
const github = require('@actions/github')
const { uniqueNamesGenerator, adjectives, colors, animals, names } = require('unique-names-generator')

try {
    const config = {
        dictionaries: [adjectives, colors, animals, names],
        separator: core.getInput('separator'),
        length: core.getInput('length'),
        style: core.getInput('style')
    }
    const output = uniqueNamesGenerator(config)
    console.log(`Generated name: ${output}`)
    core.setOutput('name', output)
} catch (error) {
    core.setFailed(error.message)
}
