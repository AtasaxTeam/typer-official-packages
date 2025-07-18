async (data, input, exit) => {
  let words = command_data["wordle_words"]
  if(!words) {
    log('Fetching the words')
    fetch("https://sabera.ovh/cdn/wordle.txt")
    .then(async (r) => {
      let res = await res.text()
      if(r.status != 200) {
        log('<span class="red">Something went wrong when getting the words</span>')
        exit()
        return
      }
      words = res.split('\n')
      command_data['wordle_words'] = words

      log("Got the words")
    })
  } else log("Got the words from cache")
  log(words.join(', '))
  exit()
}