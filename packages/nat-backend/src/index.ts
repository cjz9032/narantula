import {
  Builder,
  Browser,
  By,
  Key,
  until,
  type WebElementCondition,
} from "selenium-webdriver";
import { parseUrl } from "./url";
import path from "path";
import { writeListToCSV } from "./simple-csv";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const MAX_A_LINK = 100;
void (async function main() {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get("https://baidu.com/");
    await driver.findElement(By.name("wd")).sendKeys("go", Key.RETURN);
    await driver.wait(
      until.titleIs("go_百度搜索") as unknown as WebElementCondition,
      3000,
    );
    const elements = (await driver.findElements(By.css("a"))).slice(
      0,
      MAX_A_LINK,
    );
    const result: string[][] = [];
    for (const element of elements) {
      const text = (await element.getText()).trim();
      const link = await element.getAttribute("href");
      const url = parseUrl(link);
      if (text && url) {
        result.push([text, url.href]);
      }
    }
    
    writeListToCSV(["text", "url"],result, path.join(dirname, "../public/output.csv"));
  } catch (e) {
    console.error(e);
  } finally {
    await driver.quit();
  }
})();
