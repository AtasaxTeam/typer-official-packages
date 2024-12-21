async (data) => {

    if(!data.split(' ')[0]) return 'Usage:\n - colors [url to file]\n - colors [url to folder] [file name]\n - colors [file name] (gets the theme from my theme selection)\n - colors --defaults (prints all themes from my selection)'
    if(data.split(' ')[0] == '--defaults') {
        let string = '';
        let list = await (await fetch('https://grosik.ovh/cdn/themes/list.json')).json()
        list.forEach(e => {
            if(e.id) {
                string += `<b>${e.url ? `<a href="${e.url}">` : ''}${e.id}${e.url ? '</a>' : ''}</b>\n`
            } else {
                string += `<b>${e.url ? `<a href="${e.url}">` : ''}${e.name}/${e.url ? '</a>' : ''}</b>\n`
                e.list.forEach(f => {
                    string += ` - ${f}\n`
                })
            }
        })
        return string
    }

    if(!document.getElementById('colors')) {
        const h = document.createElement('style');
        h.id = 'colors'
        document.head.append(h);
    }
    let url = data.split(' ')[0]
    if(!urlregex.test(url)) url = `https://grosik.ovh/cdn/themes/${url}`
    else if(data.split(' ')[1]) url += data.split(' ')[1]
    let f = (await fetch(url))
    if(f.status !== 200) return `${t('warn')}Code ${f.status}${t('end')}`

    let d = (await f.text()).split('\n')

    let others = ['background', 'foreground', 'cursorcolor', 'cursorchar', 'disablecursorblink', 'link']

    d.forEach(l => {
        let name = l.split(' ')[0]
        let color = l.split(' ')[1]
        const h = document.getElementById('colors')
        if(others.includes(name)) {
            switch(name) {
                case 'background':
                    h.innerHTML += `html { background: ${color}; }`
                    placeholders[`{${name}}`] = color;
                    break;
                case 'foreground':
                    h.innerHTML += `html { color: ${color} } a { text-decoration: underline; color: ${color}; }`
                    break;
                case 'cursorcolor':
                    h.innerHTML += `.cursor { text-decoration-color: ${color}; color: ${color}; } #cursor { color: ${color}; }`
                    break;
                case 'cursorchar':
                    cursor_character = color
                    break;
                case 'disablecursorblink':
                    cursor_stop();
                    setTimeout(() => { cursor = true; update() }, 150);
                    break;
                case 'link':
                    h.innerHTML += `a:hover { text-decoration-color: ${color}; }`
                    break;
            }
        } else {
            h.innerHTML += `.${name} { color: ${color}; }`
            placeholders[`{${name}}`] = color;
        }
    })
    return `Done.`
}
