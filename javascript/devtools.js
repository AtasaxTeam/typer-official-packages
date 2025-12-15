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
        /*return `<b style="display: block;"><span class="purple">devtools</span> by <span class="blue">grosik</span></b><div style="display: inline-block; margin-right: 3vw;">help - displays this menu           
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
          [aliases: ws]</div>`*/
        return `<b style="display: block; font-size: 1.1em; margin: .1em 0;"><span class="purple">devtools</span> by <span class="blue">grosik</span></b>${typerDesign.help.menu('devtools',{
            'fetch': { text: 'gets data from a url', aliases: ['f'] },
            'lines': { text: 'counts lines from a url', aliases: ['ln'] },
            'color': { text: 'displays a color from hex', aliases: ['c'] },
            'allcolors': { text: 'displays the whole Typer color palette', aliases: ['colors', 'palette', 'ac'] },
            'website': { text: 'goes to another url', aliases: ['ws','cw'] }
        })}`
      case 'c':
      case 'color':
        return `<div style="background: ${d1}; width: 5em; height: 5em; border-radius: 2em;"></div>`
      case 'ac':
      case 'colors':
      case 'palette':
      case 'allcolors':
        return `<div style="background: ${placeholders['{black}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{gray}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{red}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{green}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{yellow}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{blue}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{pink}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{purple}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{aqua}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block; margin-right: 0.5em;"></div><div style="background: ${placeholders['{white}']}; width: 1em; height: 1em; border-radius: 2em; display: inline-block;"></div>`
      case 'ws':
      case 'cw':
      case 'website':
        location.replace(d1);
        return '<span class=\"green\">Going to </span><span class="purple">${d1}</span>' 
      default:
        indicator_change('blue')
        return 'unknown command<br>Use <span class="purple">devtools help</span> for a list of commands.'
    }
}
