const { ethers } = require('ethers')
const { api_key, message_api, user_id } = require("./config.json")
const axios = require('axios')

const provider = new ethers.providers.EtherscanProvider(undefined, api_key)

let times = 0
async function main() {
  let gas = await provider.getGasPrice()
  gas = ethers.utils.formatEther(gas) * 1e9
  if (gas < 50) {
    times++
    if (times > 120) {
      await axios.post(message_api, {
        to: user_id,
        text: "Gas price is too low: " + gas
      })
      times = 0
    }
  } else {
    times = 0
  }
  setTimeout(() => {
    main()
  }, 1000)
}

main()