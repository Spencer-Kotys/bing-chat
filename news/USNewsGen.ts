import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { BingChat } from '../src'

dotenv.config()

/**
 * Demo CLI for testing conversation support.
 *
 * ```
 * npx tsx news/USNewsGen.ts
 * ```
 */
async function main() {
  const api = new BingChat({ cookie: "1c-6nx5dn9TomP2rkgpljthk3u9BxVh_KKXMOV0LzefQ_-zTfTUbj9y5s5t3m1WNrwKAf7HMOOrDQmqJ6iLHNfejIJcBrJoR817Rmd7CSx5CAjWsaDkf9zawK5MI5xhG1WN7-k9BXpDYEEq_ke2xOozSHJPTr8PKLTZYsjDLwFa6UbD5aX6hPj_bDH8LW1hHJnb01utmNtLX-ZbPjtRjMn_Cu3egDnkypoTmvhPZpxEw" })

  const prompt = 'Write a poem about cats.'

  let res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })

  console.log('\n' + res.text + '\n')

  const prompt2 = 'Can you make it cuter and shorter?'

  res = await oraPromise(api.sendMessage(prompt2, res), {
    text: prompt2
  })
  console.log('\n' + res.text + '\n')

  const prompt3 = 'Now write it in French.'

  res = await oraPromise(api.sendMessage(prompt3, res), {
    text: prompt3
  })
  console.log('\n' + res.text + '\n')

  const prompt4 = 'What were we talking about again?'

  res = await oraPromise(api.sendMessage(prompt4, res), {
    text: prompt4
  })
  console.log('\n' + res.text + '\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
