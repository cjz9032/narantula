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
import fetch from "node-fetch";
import fs from "fs";
import { writeListToCSV } from "./simple-csv";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const MAX_ENTRIES = 30;
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
      MAX_ENTRIES,
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

    writeListToCSV(
      ["text", "url"],
      result,
      path.join(dirname, "../public/output.csv"),
    );
    fs.writeFileSync(
      path.join(dirname, "../public/output.txt"),
      result.map((t) => t.join(",")).join("\n"),
    );

    const imgElements = (await driver.findElements(By.css("img"))).slice(
      0,
      MAX_ENTRIES,
    );
    const imgResults: URL[] = [];
    for (const element of imgElements) {
      const link = await element.getAttribute("src");
      const url = parseUrl(link);

      if (url) {
        const ext = path.extname(url.href).replace('.', '');
        if (["jpg", "jpeg", "png", "gif"].includes(ext.toLocaleLowerCase()))
          imgResults.push(url);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    imgResults.forEach(async (imageUrl) => {
      const response = await fetch(imageUrl.href);
      const arrayBuffer = await response.arrayBuffer();
      const fileName = path.basename(imageUrl.pathname);
      const imagePath = path.join(
        dirname,
        `../public/imgs/${fileName}`,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));
    });
  } catch (e) {
    console.error(e);
  } finally {
    await driver.quit();
  }
})();
