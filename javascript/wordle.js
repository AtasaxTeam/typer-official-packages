async (data, input, exit) {
  let words = command_data["wordle_words"]
  if(!words) {
    fetch("https://sabera.ovh/cdn/wordle.txt")
    .then(r => {
      let res = await res.text()
      if(r.status != 200) {
        log('<span class="red">Something went wrong when getting the words</span>')
        exit()
        return
      }
      words = res.split('\n')
      command_data['wordle_words'] = words

      log('Got the words.')
    })
  }
  log(words.join(','))
}