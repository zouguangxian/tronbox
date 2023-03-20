const { deployProxy } = require('@openzeppelin/truffle-upgrades')
const Box = artifacts.require('TransparentBox')

module.exports = async function (deployer) {
  try {
    // Setup tronbox deployer
    deployer.trufflePlugin = true
    const instance = await deployProxy(Box, [42], { deployer })
    console.log('Deployed', instance.address)

    // Call proxy contract
    const box = await Box.deployed()
    const beforeValue = await box.value()
    console.log('Value before', beforeValue.toNumber())

    // Set new Value
    await box.setValue(beforeValue.toNumber() + 100)
    const afterValue = await box.value()
    console.log('Value after', afterValue.toNumber())
  } catch (error) {
    console.log('Transparent: deploy box error', error)
  }
}
