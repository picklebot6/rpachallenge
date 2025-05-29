import { test, expect } from '@playwright/test';
import * as actions from '../actions/actions.spec'

test('RPA Challenge', async ({ page }) => {
  //initiate env
  const url = 'https://rpachallenge.com'
  const fields : string[] = ['First Name','Last Name','Company Name','Role in Company','Address','Email','Phone Number']

  //launch website
  await actions.launchWebsite(page, url)
  //download file
  const savePath = await actions.downloadChallenge(page)
  //read file
  const data = await actions.readJson(savePath)
  console.log(JSON.stringify(data, null, 2));
  //start challenge
  await actions.startChallenge(page)
  //for each person
  for (const person of data) {
    //fill in data
    for (const field of fields) {
      if (field == 'Last Name') {
        await actions.enterValue(page,field,person["Last Name "])
      } else {
        await actions.enterValue(page,field,person[field])
      }
    }
    //submit
    await actions.submit(page)
  }
  await page.waitForTimeout(5000)
  await page.pause()
});
