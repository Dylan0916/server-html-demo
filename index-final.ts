import { serve } from 'bun'
import { join } from 'path'

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url)

    switch (url.pathname) {
      case '/': {
        const content = await Bun.file('./public/cats.txt').text()
        const catNames = content.split('\n')
        const index = Math.floor(Math.random() * catNames.length)
        const catName = catNames[index]
        const json = { catName }
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
              <link rel="stylesheet" href="/style.css">
          </head>
          <body>
              <button id="btn">Click</button>

              <script>
                async function onClick() {
                  const { catName } = ${JSON.stringify(json)}

                  document.body.innerText = catName
                }

                btn.addEventListener('click', onClick)

              </script>
          </body>
          </html>
      `

        return new Response(html, {
          headers: {
            'Content-Type': 'text/html',
          },
        })
      }
      case '/api/cat-names': {
        const content = await Bun.file('./public/cats.txt').text()
        const catNames = content.split('\n')
        const json = { catNames }

        return Response.json(json)
      }

      default: {
        return handleStaticFiles(req)
      }
    }
  },
})

function handleStaticFiles(req: Request) {
  const url = new URL(req.url)
  const filePath = join(import.meta.dir, 'public', url.pathname)

  try {
    const file = Bun.file(filePath)

    return new Response(file, {
      headers: {
        'Content-Type': getContentType(url.pathname),
      },
    })
  } catch (error) {
    return new Response('File not found', { status: 404 })
  }
}

function getContentType(pathname: string) {
  if (pathname.endsWith('.js')) {
    return 'application/javascript'
  }
  if (pathname.endsWith('.css')) {
    return 'text/css'
  }
  if (pathname.endsWith('.html')) {
    return 'text/html'
  }
  return 'text/plain'
}

console.log(`Listening on http://localhost:3000`)
