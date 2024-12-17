// 1: <b style="margin-top: 0.5vh;display:inline-block;font-size:larger;" class="blue">grosik</b><b class="green" style="font-size:larger;">@</b><b style="font-size:larger;">typer</b>{nl}<div style="display:inline-block"><b class="blue">os</b>{nl}<b class="blue">pkgs</b>{nl}<b class="blue">browser</b></div><div style="display:inline-block;margin-left:1vh">[pcos]{nl}[packages]{nl}[browser]</div>
// 2: <h2 style="margin-top: 0; margin-bottom: 2px;"><span class="purple">grosik</span><span class="green">@</span>typer</h2><b>[browser]</b> is my browser.{nls}I use <b>[pcos]</b> btw. {nle}
async (d) => {
    let dt = d.split(' ')
    let d0 = dt[0];
    let d1 = dt[1]
    let d2 = dt[2];
    switch(d0) {
      case 'f':
      case 'fetch':
        let res = (await fetch(d1)); 
        let rtext = await res.text();
        let r = res.status != 200 ? `error ${res.status}` : (res.headers.get('content-type').startsWith('image/') ? `<img src="${d1}">` : (hasJsonStructure(rtext) ? jtotext(await JSON.parse(rtext)) : rmHtmlBrackets(rtext)));
        return r;
      case 'ln':
      case 'lines':
        let rs = await fetch(d1)
        let rt = await rs.text()
        let ln = rt.split('\n').length
        
        return rs.status != 200 ? `error ${rs.status}` : `<b class="purple">${ln}</b> ${ln == 1 ? 'line' : 'lines'}`
      case 'h':
      case 'help':
        return `<b style="display: block;"><span class="purple">devtools</span> by <span class="blue">grosik</span></b><div style="display: inline-block; margin-right: 3vw;">help - displays this menu           
          fetch - gets data from a url
          lines - counts lines from url
          color - displays a color from hex
          allcolors - displays all typer colors
          website - goes to another url</div><div style="display: inline-block;">
          [aliases: h]
          [aliases: f]
          [aliases: ln]
          [aliases: c]
          [aliases: ac]
          [aliases: ws]</div>`
      case 'c':
      case 'color':
        return `<div style="background: ${d1}; width: 5em; height: 5em; border-radius: 2em;"></div>`
      case 'ac':
      case 'allcolors':
        return `<div style="background: ${placeholders['{black}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{gray}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{red}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{green}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{yellow}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{blue}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{pink}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{purple}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{aqua}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{white}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block;"></div>`
      case 'ws':
      case 'website':
        location.replace(d1);
        return '<span class=\"green\">Going to </span><span class="purple">${d1}</span>' 
      default:
        indicator_change('blue')
        return 'unknown command<br>Use <span class="purple">devtools help</span> for a list of commands.'
    }
}
