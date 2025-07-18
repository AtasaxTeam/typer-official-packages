async (data, input, exit) => {
  cmd = ""
  let words = command_data["wordle_words"]
  if(!words) {
    log('Fetching the words')
    await new Promise((rev, rex) => {
      fetch("https://sabera.ovh/cdn/wordle.txt")
    .then(async (r) => {
      let res = await res.text()
      if(r.status != 200) {
        log('<span class="red">Something went wrong when getting the words</span>')
        exit()
        return
      }
      words = res.split(' \n')
      command_data['wordle_words'] = words

      log("Got the words")
      rev()
    })})
  } else log("Got the words from cache")
  log(words.join(', '))
  let word = words[Math.floor(Math.random()*words.length)]
  async function guess(resv) {
    let g = await input()
    resv()
    return true
  }
  for(let i = 0; i<96; i++) {
    await new Promise((rev, rex) => {
      if(guess(rev)) break
    })
  }
  log(`Answer:\n<h2>${word}</h2>`)
  exit()
}