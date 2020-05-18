const core = require('@actions/core')
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
    core.setOutput('generated_name', output)
    core.exportVariable('generated_name', output)
} catch (error) {
    core.setFailed(error.message)
}
