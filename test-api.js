// Script para probar la conexión con la API de Perdidog
// Ejecutar con: node test-api.js

const API_URL = 'https://backend.perdidog.cloud/api';

async function testAPI() {
  console.log('🔍 Probando conexión con la API de Perdidog...\n');
  console.log(`📡 URL: ${API_URL}\n`);

  try {
    // Test 1: Health check
    console.log('1️⃣ Test: Health Check');
    const healthResponse = await fetch(`${API_URL}/health`);
    console.log(`   Status: ${healthResponse.status}`);
    if (healthResponse.ok) {
      console.log('   ✅ API está funcionando\n');
    } else {
      console.log('   ⚠️ API respondió pero con error\n');
    }

    // Test 2: Documentación
    console.log('2️⃣ Test: Documentación Swagger');
    const docsResponse = await fetch(`${API_URL}/docs`);
    console.log(`   Status: ${docsResponse.status}`);
    if (docsResponse.ok) {
      console.log('   ✅ Documentación disponible\n');
    } else {
      console.log('   ⚠️ Documentación no disponible\n');
    }

    // Test 3: Endpoint de reportes (sin autenticación)
    console.log('3️⃣ Test: Endpoint de Reportes');
    const reportsResponse = await fetch(`${API_URL}/report`);
    console.log(`   Status: ${reportsResponse.status}`);
    
    if (reportsResponse.ok) {
      const data = await reportsResponse.json();
      console.log(`   ✅ Reportes obtenidos exitosamente`);
      console.log(`   📊 Total de reportes: ${Array.isArray(data) ? data.length : data.data?.length || 0}\n`);
    } else if (reportsResponse.status === 401) {
      console.log('   ℹ️ Requiere autenticación (esperado)\n');
    } else {
      console.log('   ⚠️ Error al obtener reportes\n');
    }

    console.log('✅ Pruebas completadas!\n');
    console.log('📝 Notas:');
    console.log('   - Si ves errores 401, es normal - esos endpoints requieren login');
    console.log('   - Puedes ver la documentación completa en: https://backend.perdidog.cloud/api/docs');
    console.log('   - Para probar con autenticación, usa el dashboard después de hacer login\n');

  } catch (error) {
    console.error('❌ Error al conectar con la API:', error.message);
    console.log('\n💡 Posibles causas:');
    console.log('   - La API no está disponible');
    console.log('   - Problemas de red o CORS');
    console.log('   - URL incorrecta\n');
  }
}

testAPI();
