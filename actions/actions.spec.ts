import { Page, expect } from '@playwright/test';
import fs from 'fs';
import xlsx from 'xlsx'
import * as selectors from '../helper/selectors.help'

//function to launch website
export async function launchWebsite(page: Page, url: string): Promise<void> {
    await page.goto(url);
    await expect(page).toHaveTitle(/Rpa/);
}

//function to download challenge excel file
export async function downloadChallenge(page: Page): Promise<string> {
    const downloadDir = './downloads';
    if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click(selectors.downloadButton) // Replace with your real selector
        ]);

    const filename = download.suggestedFilename();
    const savePath = `${downloadDir}/${filename}`;
    await download.saveAs(savePath);

    console.log('Downloaded file saved as:', savePath);
    return savePath
}

//read json file into array of objects
export async function readJson(savePath: string): Promise<any> {
    const workbook = xlsx.readFile(savePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet);
    return data;
}

//start challenge
export async function startChallenge(page: Page): Promise<void> {
    await page.click(selectors.challengeButton)
}

//fill in value
export async function enterValue(page: Page, field: string, value: string): Promise<void> {
    await page.locator(selectors.dynamicField(field)).fill(value.toString())
}

//submit
export async function submit(page: Page): Promise<void> {
    await page.click(selectors.submitButton)
}
