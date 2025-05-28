import { test, expect } from '@playwright/test';
import * as actions from '../actions/actions.spec'

test('RPA Challenge', async ({ page }) => {
  //initiate env
  const url = 'https://rpachallenge.com'

  //launch website
  await actions.launchWebsite(page, url)
  //download file
  const savePath = await actions.downloadChallenge(page)
  //read file
  const data = await actions.readJson(savePath)
  console.log(JSON.stringify(data, null, 2));

  await page.waitForTimeout(5000)
  await page.pause()
});
