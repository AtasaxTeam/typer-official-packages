async (data, input, exit) => {
  cmd = ""
  let words = command_data["wordle_words"]
  if(!words) {
    log('Fetching the words')
    await new Promise((rev, rex) => {
      fetch("https://sabera.ovh/cdn/wordle.txt")
    .then(async (r) => {
      let res = await r.text()
      if(r.status != 200) {
        log('<span class="red">Something went wrong when getting the words</span>')
        exit()
        return
      }
      words = res.split('\r\n')
      command_data['wordle_words'] = words

      log("Got the words")
      rev()
    })})
  } else log("Got the words from cache")
  log('Guess the word!')
  let word = words[Math.floor(Math.random()*words.length)]
  log(word)
  async function guess(resv) {
    let g = await input()
    if(g.length != 5) {
      log("The word has to be 5 letters long.")
      return guess(resv)
    } else if(!words.includes(g.toUpperCase())) {
      log("The word is not in the list.")
      return guess(resv)
    } else {
      let string = ""
      for(let i = 0; i < 5; i++) {
        let color = "gray"
        if(g[i] == word[i]) color = "green"
        else if(word.includes(g[i])) color = "yellow"
        string += `<span class="${color}">${g[i]}</span>`
      }
      log(string)
      resv()
      return g.toUpperCase() == word
    }
  }
  for(let i = 0; i<6; i++) {
    let stop = false
    log(`Guess ${i}:`)
    await new Promise((rev, rex) => {
      if(guess(rev)) stop = true
    })
    if(stop) break
  }
  log(`Answer:\n<h2>${word}</h2>`)
  exit()
}