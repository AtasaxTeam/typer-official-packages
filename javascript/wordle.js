async (data, input, exit) => {
  cmd = ""
  let words = command_data["wordle_answers"]
  let proper = command_data["wordle_proper"]
  if(!words) {
    log('Fetching the answers')
    await new Promise((rev, rex) => {
      fetch("https://sabera.ovh/cdn/wordle.txt")
    .then(async (r) => {
      let res = await r.text()
      if(r.status != 200) {
        log('<span class="red">Something went wrong when getting the answers</span>')
        exit()
        return
      }
      words = res.split('\r\n')
      command_data['wordle_answers'] = words

      log("Got the answers")
      rev()
    })})
  } else log('Got the answers from cache')
  if(!proper) {
    log('Fetching the words')
    await new Promise((rev, rex) => {
      fetch("https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/6bfa15d263d6d5b63840a8e5b64e04b382fdb079/valid-wordle-words.txt")
    .then(async (r) => {
      let res = await r.text()
      if(r.status != 200) {
        log('<span class="red">Something went wrong when getting the words</span>')
        exit()
        return
      }
      proper = res.split('\n')
      log(proper.length)
      command_data['wordle_proper'] = proper

      log("Got the words")
      rev()
    })})
  } else log("Got the words from cache")
  log('Guess the word!')
  let word = words[Math.floor(Math.random()*words.length)]
  async function guess(resv) {
    let g = (await input()).toLowerCase()
    if(g.length != 5) {
      log("The word has to be 5 letters long.")
      return guess(resv)
    } else if(!proper.includes(g)) {
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
      log(`<h2 style="margin:0.1em">${string}</h2>`)
      resv(g == word)
    }
  }
  for(let i = 0; i<6; i++) {
    log(`Guess ${i+1}:`)
    let stop = await new Promise((rev, rex) => guess(rev))
    log(stop ? 'y' : 'n')
    if(stop) break
  }
  log(`Answer:\n<h2>${word}</h2>`)
  exit()
}