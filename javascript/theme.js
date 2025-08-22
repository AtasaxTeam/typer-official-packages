async (data) => {

    if(!data.split(' ')[0]) return 'Usage:\n - colors [url to file]\n - colors [url to folder] [file name]\n - colors [file name] (gets the theme from my theme selection)\n - colors --defaults (prints all themes from my selection)'
    if(data.split(' ')[0] == '--defaults') {
        let string = '';
        let list = await (await fetch('https://grosik.dev/cdn/themes/list.json')).json()
        let dark = 'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>'
        let light = 'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>'
        let color = window.getComputedStyle(document.body, null).color;
        let fontsize = window.getComputedStyle(document.body, null)['font-size'];
        list.forEach(e => {
            if(e.id) {
                string += `${e.url ? `<a href="${e.url}">` : ''}<b${command_data.currenttheme && command_data.currenttheme == e.id ? ' class="green"' : ''}>${e.id}</b>${e.url ? '</a>' : ''} <svg style="height: ${fontsize}; display: inline; margin: 0; transform: translate(-15%, 15%); fill: ${command_data.currenttheme && command_data.currenttheme == e.id ? placeholders['{green}'] : color}" ${e.dark ? dark : light}\n`
            } else {
                string += `${e.url ? `<a href="${e.url}">` : ''}<b${command_data.currenttheme && command_data.currenttheme.split('/')[0] == e.name ? ' class="green"' : ''}>${e.name}/</b>${e.url ? '</a>' : ''}\n`
                e.list.forEach(f => {
                    let q = command_data.currenttheme && command_data.currenttheme.split('/')[0] == e.name && command_data.currenttheme.split('/').length > 1 && command_data.currenttheme.split('/')[1] == f.id;
                    string += `${q ? '<span class="green">' : ''} - ${f.id}${q ? '</span>' : ''} <svg style="height: ${fontsize}; display: inline; margin: 0; transform: translate(-15%, 15%); fill: ${q ? placeholders['{green}'] : color}" ${f.dark ? dark : light}\n`     
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
    if(!urlregex.test(url)) {
        command_data['currenttheme'] = url
        url = `https://grosik.dev/cdn/themes/${url}`
    }
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
                    h.innerHTML += `html { background: ${color}; }\n.background { background: ${color}; }`
                    placeholders[`{${name}}`] = color;
                    break;
                case 'foreground':
                    h.innerHTML += `html { color: ${color} } a { text-decoration: underline; color: ${color}; }\n.foreground { background: ${color} }`
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
                case 'font':
                    const tmp = color.split('/')
                    h.innerHTML += `@font-face { font-family: ${tmp[tmp.length-1]}; src: url(${color}); } html { font-family: ${tmp[tmp.length-1]}; }`
                    break;
            }
        } else if (name.length > 1) {
            h.innerHTML += `.${name} { color: ${color}; } .bg-${name} { background-color: ${color}; }`
            placeholders[`{${name}}`] = color;
        }
    })
    return `Done.`

}
