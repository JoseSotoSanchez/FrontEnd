const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testEliminarVehiculo() {
  let options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://localhost:5173/vehiculos/list');

    await driver.sleep(2000);

    await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Eliminar')]")), 5000);
    let botonesEliminar = await driver.findElements(By.xpath("//button[contains(text(),'Eliminar')]"));

    if (botonesEliminar.length > 0) {
      await botonesEliminar[0].click();

      await driver.switchTo().alert().accept();

      await driver.sleep(2000);

      let vehiculosDespuesDeEliminar = await driver.findElements(By.xpath("//button[contains(@class, 'MuiButtonBase-root') and contains(@style, 'error')]"));
      if (vehiculosDespuesDeEliminar.length < botonesEliminar.length) {
        console.log('Test Passed: El vehículo fue eliminado correctamente.');
      } else {
        console.log('Test Failed: El vehículo no fue eliminado.');
      }
    } else {
      console.log('No hay vehículos para eliminar.');
    }

  } finally {
    await driver.quit();
  }
}

testEliminarVehiculo();