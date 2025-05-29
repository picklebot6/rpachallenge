export const downloadButton = "//a[contains(text(),'Download Excel')]"

export const challengeButton = "//button[text()='Start']"

export function dynamicField(field: string) {
    return `//label[text()='${field}']/following-sibling::input`
}

export const submitButton = "//input[@value='Submit']"