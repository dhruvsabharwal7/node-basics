import { serve } from 'bun'

serve({
  fetch(request){
    const url = new URL(request.url)
    const { pathname } = url;
    if (pathname === '/') {
      return new Response('Hello from index file', {status: 200})
    } else if (pathname === '/login') {
      return new Response('Hello from login file', {status: 200})
    } else{
      return new Response('404: Error :(', {status: 404})
    }
  },
  port: 2002,
  hostname: '127.0.0.1'
})