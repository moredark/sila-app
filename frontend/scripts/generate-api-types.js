const fs = require('fs').promises
const swagger2openapi = require('swagger2openapi')
const { exec } = require('child_process')
const { promisify } = require('util')
const execAsync = promisify(exec)

const API_DOCS_URL = 'https://sila-danila.ru/api/swagger/doc.json'
const SCHEMA_ROUTE = './src/shared/api/schema.d.ts'
const TEMP_FILE = './openapi-3.json'

async function convertSwaggerToOpenAPI(swagger) {
  return new Promise((resolve, reject) => {
    swagger2openapi.convert(swagger, {}, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.openapi)
      }
    })
  })
}

async function main() {
  try {
    const response = await fetch(API_DOCS_URL)
    const swagger = await response.json()
    
    const openapi = await convertSwaggerToOpenAPI(swagger)
    await fs.writeFile(TEMP_FILE, JSON.stringify(openapi, null, 2))
    
    await execAsync(`npx openapi-typescript ${TEMP_FILE} -o ${SCHEMA_ROUTE}`)
    await fs.unlink(TEMP_FILE)
    
    console.log('API types successfully generated!')
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main()
