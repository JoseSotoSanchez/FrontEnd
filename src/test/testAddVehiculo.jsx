const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function testAddVehicle() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:5173/vehiculos/add');

    await driver.findElement(By.id('patente')).sendKeys('AABB99');
    await driver.findElement(By.id('marca')).sendKeys('Toyota');
    await driver.findElement(By.id('modelo')).sendKeys('Corolla');
    await driver.findElement(By.id('anio_fabricacion')).sendKeys('2023');
    await driver.findElement(By.id('tipo')).click();
    await driver.wait(until.elementLocated(By.xpath("//li[text()='SUV']")), 5000); 
    await driver.findElement(By.xpath("//li[text()='SUV']")).click();
    await driver.findElement(By.id('tipo_motor')).click();
    await driver.wait(until.elementLocated(By.xpath("//li[text()='Gasolina']")), 5000); 
    await driver.findElement(By.xpath("//li[text()='Gasolina']")).click();
    await driver.findElement(By.id('numero_asientos')).sendKeys('2');
    await driver.findElement(By.id('kilometraje')).sendKeys('5000');

    await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Guardar')]")), 5000);
    await driver.findElement(By.xpath("//button[contains(text(),'Guardar')]")).click();

    await driver.sleep(3000);

    let pageSource = await driver.getPageSource();
    if (pageSource.includes('AABB99')) {
      console.log('Test Passed: El vehículo fue añadido correctamente.');
    } else {
      console.log('Test Failed: El vehículo no fue añadido.');
    }
  } finally {
    await driver.quit();
  }
}

testAddVehicle();