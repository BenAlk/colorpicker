const mode = document.getElementById("mode")
const colorPickerEl = document.getElementById("color-picker")
const colorSchemeEl = document.getElementById("color-scheme")

function copyToClipboard(e) {
    const clipboardEl = document.getElementById("copied-to-clipboard")
    clipboardEl.classList.add("hidden")

    Array.from(document.getElementsByClassName("hex-column")).map(column => {
        column.style.border = "none"
    })
    
    Array.from(document.getElementsByClassName("color-name")).map(hex => {
        hex.style.border = "none"
    })
    
    navigator.clipboard.writeText(e.target.dataset.color)
    list = document.querySelectorAll(`[data-color="${e.target.dataset.color}"]`)
    Array.from(list).map(elem => {
        elem.style.border = "2px solid #808080"
    })
    setTimeout(() => {
        clipboardEl.classList.remove("hidden")
    }, 300);
    

}

function modeToggle() {
    const getColorSchemeEl = document.getElementById("get-color-scheme")
        if (mode.classList.contains("fa-solid")) {
            const list = document.querySelectorAll('[id^="hex-"]')
            Array.from(list).map(elem => {
                elem.classList.add("darkmode")
            })
            document.body.classList.add("darkmode")
            colorSchemeEl.classList.add("darkmode")
            getColorSchemeEl.classList.add("darkmode")
            mode.classList.remove("fa-solid")
            mode.classList.add("fa-regular")
            colorPickerEl.style.border = "1px solid lightgray"
            
        }
        else if (mode.classList.contains("fa-regular")) {
            const list = document.querySelectorAll('[id^="hex-"]')
            Array.from(list).map(elem => {
                elem.classList.remove("darkmode")
            })
            document.body.classList.remove("darkmode")
            colorSchemeEl.classList.remove("darkmode")
            getColorSchemeEl.classList.remove("darkmode")
            mode.classList.add("fa-solid")
            mode.classList.remove("fa-regular")
            colorPickerEl.style.border = "none"
        }
}


function getColorScheme(hex, mode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}`)
        .then(res => res.json())
        .then(data => {
            const paletteContainer = document.getElementById('palette-container')
            let paletteHtml = ""

            data.colors.forEach(color => {
                let hexValue = color.hex.value
                paletteHtml += `<div class="color-container">
                    <div class="hex-column" style="background-color:${hexValue}" onclick="copyToClipboard(event)" data-color="${hexValue}"></div>
                    <div class="hex-name" id="hex-${hexValue}">
                        <p class="color-name" onclick="copyToClipboard(event)" data-color="${hexValue}">${hexValue}</p>
                    </div>
                </div>`
            });
            paletteContainer.innerHTML = paletteHtml
        })  
}


function renderPalette() {
    getColorScheme(colorPickerEl.value.replace('#', ''), colorSchemeEl.value)
}

mode.addEventListener('click', modeToggle)
document.getElementById("get-color-scheme").addEventListener('click', renderPalette)

