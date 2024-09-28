const { exec } = require('child_process')
const fs = require('fs')

const API_DOCS_URL = 'http://localhost:8080/swagger/doc.json'

const SCHEMA_ROUTE = './src/shared/api/schema.d.ts'

exec(`swagger2openapi ${API_DOCS_URL} --outfile openapi-3.json`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка преобразования Swagger: ${error.message}`)
    return
  }
  if (stderr) {
    console.error(`Ошибка: ${stderr}`)
    return
  }

  exec(`npx openapi-typescript ./openapi-3.json -o ${SCHEMA_ROUTE}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка генерации типов: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`Ошибка: ${stderr}`)
      return
    }
    console.log(`Типы API успешно сгенерированы: ${stdout}`)

    fs.unlink('./openapi-3.json', err => {
      if (err) {
        console.error(`Ошибка удаления файла: ${err.message}`)
        return
      }
    })
  })
})
