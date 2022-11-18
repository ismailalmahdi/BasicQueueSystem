self.addEventListener('message',({data,source:{id}})=> {
    clients.matchAll().then(clients => {
      clients.forEach(client => {
        if(client.id !== id){
          console.log("Hello There")
          client.postMessage(data)
        }
      })
    })
  });