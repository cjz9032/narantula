import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import { parseUrl } from "./url";

void (async function main() {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get("https://bing.com/");
    await driver.findElement(By.name("wd")).sendKeys("go", Key.RETURN);
    await driver.wait(until.titleIs("go_百度搜索"), 3000);
    //

    const elements = await driver.findElements(By.css("a"));
    for (const element of elements) {
      const text = (await element.getText()).trim();
      const link = await element.getAttribute("href");
      const url = parseUrl(link);
      if (text && url) {
        console.log(text, url);
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    await driver.quit();
  }
})();
