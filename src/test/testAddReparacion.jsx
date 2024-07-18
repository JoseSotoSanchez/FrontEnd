const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function testAddReparacion() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:5173/reparaciones/add');

    await driver.findElement(By.id('id_vehiculo')).click();
    await driver.wait(until.elementLocated(By.xpath("//li[text()='AABB99']")), 5000); 
    await driver.findElement(By.xpath("//li[text()='AABB99']")).click();

    await driver.findElement(By.id('tipo_reparacion')).click();
    await driver.wait(until.elementLocated(By.xpath("//li[text()='Reparaciones del Motor']")), 5000); 
    await driver.findElement(By.xpath("//li[text()='Reparaciones del Motor']")).click();

    // Obtener la fecha actual
    let currentDate = new Date();
    let formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}T${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}`;

    // Enviar la fecha a los campos respectivos
    await driver.executeScript(`document.getElementById('fecha_ingreso').value = "${formattedDate}"`);
    await driver.executeScript(`document.getElementById('fecha_salida').value = "${formattedDate}"`);
    await driver.executeScript(`document.getElementById('fecha_entrega_cliente').value = "${formattedDate}"`);
    
    await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Guardar')]")), 5000);
    await driver.findElement(By.xpath("//button[contains(text(),'Guardar')]")).click();

    await driver.sleep(3000);

    let pageSource = await driver.getPageSource();
    if (pageSource.includes('AABB99')) {
      console.log('Test Passed: La reparación fue añadida correctamente.');
    } else {
      console.log('Test Failed: La reparación no fue añadido.');
    }
  } finally {
    await driver.quit();
  }
}

testAddReparacion();