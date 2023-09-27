# Unique Name Generator Action

This action creates a random name and outputs it to Github Actions environment variables. [unique-names-generator](https://github.com/andreasonny83/unique-names-generator) is used to generate the random names.

## Inputs

### `separator`

**Required** What separator to use. Default `-`.

### `length`

**Required** How many words in the name. Default `2`.

### `style`

**Required** Name output case style. Default `lowerCase`.

## Outputs

### `generated_name`

The generated random name output.

## Example usage

```
uses: TGPSKI/name-generator-node-action@v3
```

```
uses: TGPSKI/name-generator-node-action@v3
id: random-name
with:
  separator: '_'
  length: '4'
  style: 'upperCase'

name: test generator output
run: echo "latest,${{ steps.random-name.outputs.generated_name }}"
```
