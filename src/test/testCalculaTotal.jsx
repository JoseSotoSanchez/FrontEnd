const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function testCalculaTotal() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:5173/calculatotal');

    await driver.findElement(By.id('id_vehiculo')).click();
    await driver.wait(until.elementLocated(By.xpath("//li[text()='AABB99']")), 5000); 
    await driver.findElement(By.xpath("//li[text()='AABB99']")).click();

    await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'pagar')]")), 5000);
    await driver.findElement(By.xpath("//button[contains(text(),'pagar')]")).click();

    let alert = await driver.switchTo().alert();
    await alert.accept();

    await driver.sleep(3000);

    let pageSource = await driver.getPageSource();
    if (pageSource.includes('AABB99')) {
      console.log('Test Passed: el pago se ha realizado correctamente.');
    } else {
      console.log('Test Failed: No fue posible realizar el pago.');
    }
  } finally {
    await driver.quit();
  }
}

testCalculaTotal();