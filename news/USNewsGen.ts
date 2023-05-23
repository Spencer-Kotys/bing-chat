import dotenv from 'dotenv-safe';
import { oraPromise } from 'ora';

import { BingChat } from '../src';

dotenv.config();

/**
 * CLI for generating US News Headlines.
 *
 * ```
 * npx tsx news/USNewsGen.ts
 * ```
 */
async function main() {
  var sumText;
  const api = new BingChat({ cookie: '1gdAhVNcuprCC0teLdxNXc2SDzwhrCfgmfmXHp6vGU6LzJ9hXufW9KH0qHmdnSKj6hkjc_R2tjY7FlkxP7Cld1KAnFpZEEwdS1wWSh-DqEneYSHpgYs-7FgtaQKw6vd45htg0AJnJgFMoDwg-2HuvNIpwtSqjZIK4Qa_8uDvGVawWSloecY6oksaJ5dRc187IJp-OaGfa36hiVZHgBoeVY6VD6NCB9qs4UJ3HBqy4HAg' });

  const prompt = 'US news headlines from May 22, 2023';

  let res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })

  console.log('\n' + res.text + '\n');
  sumText += res.text;

  var stories = res.text.split('- ');
  stories.shift();
  console.log(stories);

  for (let story of stories) {
    const prompt2 = `Can you expand on ${story}?`;

    res = await oraPromise(api.sendMessage(prompt2, res), {
      text: prompt2
    })
    console.log('\n' + res.text + '\n')
    sumText += res.text;
  }
  console.log(sumText);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
})
