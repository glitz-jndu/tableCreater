// Toggle classes for menu
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');
let topbar = document.querySelector('.topbar');
let sub = document.querySelector('.feat-show');
let powerd = document.querySelector('.gpit-p');
let arrows = document.querySelectorAll('.first');
let modnames = document.querySelector('.navigation ul li a.title');

toggle.onclick = function () {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
    topbar.classList.toggle('active');
    arrows.forEach(arrow => {
        arrow.classList.toggle('remove');
    });
    sub.classList.toggle('remove');
    powerd.classList.toggle('remove');
    modnames.forEach(modname => {
        modname.classList.toggle('remove');
    });
}

async function moduleviewtoggle(modid, mainModuleName) {
    await closeOtherItems(`.feat-show${modid}`);
    $(`.feat-show${modid}`).toggleClass('show');
    event.preventDefault();

    if ($(`.feat-show${modid}`).hasClass('show')) {
        localStorage.setItem('openedSubmodule', modid);
    } else {
        localStorage.removeItem('openedSubmodule');
    }

    updateBreadcrumb(mainModuleName);
    updateBreadcrumbVisibility();
}

window.addEventListener('load', function () {
    loadBreadcrumb();

    const openedSubmodule = localStorage.getItem('openedSubmodule');
    if (openedSubmodule) {
        $(`.feat-show${openedSubmodule}`).addClass('show');
    }
});

function closeOtherItems(excludeClass) {
    var eles = document.getElementsByClassName('nsubs');
    console.log(eles.length);
    for (let el in eles) {
        console.log(eles[el].classList);
        if (eles[el].classList && eles[el].classList[2] == 'show') {
            eles[el].classList.remove('show');
        }
    }
}

$(document).ready(function () {
    // Toggle classes for feat-show
    $('.feat-btn').click(function (event) {
        $('.feat-show').toggleClass('show');
        closeOtherItems('.feat-show');
        event.preventDefault();
        localStorage.setItem('openedItem', '0');
    });

});

// display user modal
function displayUserModal(event) {

    event.preventDefault();
}

// display system setting modal
async function displaySystemModal(event) {
    var systemDialog = document.getElementById("system_setting_dialog");
    if (systemDialog.style.display === "none" || systemDialog.style.display === "") {
        systemDialog.style.display = "block";
    } else {
        systemDialog.style.display = "none";
    }
    event.preventDefault();
}

async function displayModal(event, mainModuleName, subModuleName) {
    await deletemodal();
    console.log('displayModal called with event:', event);
    const containerDiv = document.createElement("div");
    containerDiv.classList.add('modal-container');

    const tempDiv = document.createElement("dialog");
    tempDiv.classList.add('system_setting_dialog');

    const arrowDiv = document.createElement("div");
    arrowDiv.classList.add('arrow');

    containerDiv.appendChild(tempDiv);
    containerDiv.appendChild(arrowDiv);

    var navele = document.getElementById('nav' + event);
    var offset = navele.getBoundingClientRect();

    tempDiv.style.left = `${offset.right}px`;

    let res = await apicall(`/getsubmodules?id=${event}`, [], 'GET');
    let modules = res['modules'];

    let ht = `<ul>`;
    for (let x in modules) {
        ht += `<li class="page_module">
                    <a href='${modules[x].path}?module=${modules[x].id}' onclick="updateBreadcrumb('${mainModuleName}', '${subModuleName}', '${modules[x].name}')">
                        <span class="material-symbols-outlined">${modules[x]['icon']}</span><span>${modules[x].name}</span>
                    </a>
                </li>`;
    }
    ht += `</ul>`;

    // Adding a hard-coded list item with the relevant submodule ID
    ht += `<li class="page_module">
        <a href='#' onClick="showAddSubPage(event, ${event})">
            <span class="icon1" style="width: 30%;text-align:left;">
                <img src="/src/img/GPIT Create Module Button.png" title="Click here to add Page" style="width: 60px;margin-top: -3px;">
            </span>
            <span>Create Page</span>
        </a>
    </li>`;
    
    tempDiv.innerHTML = ht;

    navele.insertAdjacentElement("afterend", containerDiv);

    tempDiv.showModal();

    let contentHeight = tempDiv.scrollHeight + 2;
    if (contentHeight > window.innerHeight * 0.8) {
        contentHeight = window.innerHeight * 0.8;
    }
    tempDiv.style.height = `${contentHeight}px`;

    let dialogTop = offset.top - (contentHeight / 2) + (navele.clientHeight / 2);
    tempDiv.style.top = `${Math.max(0, dialogTop)}px`;

    setTimeout(() => {
        deletemodal();
    }, 10000);

    updateBreadcrumb(mainModuleName, subModuleName);
    updateBreadcrumbVisibility();
}

document.addEventListener('DOMContentLoaded', function () {
    const highlightedBeadId = localStorage.getItem('highlightedId');
    const highlightedModuleId = localStorage.getItem('highlightedModuleId');

    if (highlightedBeadId) {
        const beadElement = document.querySelector(`.sub_menu[data-id='${highlightedBeadId}']`);
        if (beadElement) {
            beadElement.style.backgroundColor = '#222';
        }
    }

    if (highlightedModuleId) {
        const moduleElement = document.querySelector(`.mainmod${highlightedModuleId}`);
        if (moduleElement) {
            moduleElement.style.backgroundColor = '#222';
        }
    }
});

function showBead(mainModuleName, subModuleName, element, subModuleId) {
    updateBreadcrumb(mainModuleName, subModuleName);
    updateBreadcrumbVisibility();

    document.querySelectorAll('.sub_menu').forEach(function (link) {
        link.style.backgroundColor = ''; 
    });

    if (element) {
        element.style.backgroundColor = '#222';
        localStorage.setItem('highlightedId', subModuleId);
        localStorage.removeItem('highlightedModuleId');
    }
}

function showModule(mainModuleName, moduleId) {
    updateBreadcrumb(mainModuleName);
    updateBreadcrumbVisibility();

    document.querySelectorAll('a[id^="feat-btn"]').forEach(function (link) {
        link.style.backgroundColor = ''; 
    });

    const element = document.querySelector(`.mainmod${moduleId}`);
    if (element) {
        element.style.backgroundColor = '#222';
        localStorage.setItem('highlightedModuleId', moduleId);
        localStorage.removeItem('highlightedId');
    }
}

function deletemodal() {
    var containers = document.getElementsByClassName('modal-container');
    if (containers.length > 0) {
        for (const container of containers) {
            try {
                container.remove();
            } catch (e) {
                console.log(e);
            }
        }
    }
}

function updateBreadcrumb(mainModule, subModule = '', subSubModule = '') {
    if (document.getElementById('main-module')) {
        document.getElementById('main-module').innerText = mainModule;
    }
    if (document.getElementById('sub-module')) {
        document.getElementById('sub-module').innerText = subModule;
    }
    if (document.getElementById('sub-sub-module')) {
        document.getElementById('sub-sub-module').innerText = subSubModule;
    }

    localStorage.setItem('breadcrumb', JSON.stringify({
        mainModule: mainModule,
        subModule: subModule,
        subSubModule: subSubModule
    }));
}

function loadBreadcrumb() {
    const breadcrumb = JSON.parse(localStorage.getItem('breadcrumb'));
    if (breadcrumb) {
        if (document.getElementById('main-module')) {
            document.getElementById('main-module').innerText = breadcrumb.mainModule;
        }
        if (document.getElementById('sub-module')) {
            document.getElementById('sub-module').innerText = breadcrumb.subModule;
        }
        if (document.getElementById('sub-sub-module')) {
            document.getElementById('sub-sub-module').innerText = breadcrumb.subSubModule;
        }
        updateBreadcrumbVisibility();
    }
}

function updateBreadcrumbVisibility() {
    const mainModuleElement = document.getElementById('main-module');
    const subModuleElement = document.getElementById('sub-module');
    const subSubModuleElement = document.getElementById('sub-sub-module');

    if (mainModuleElement && mainModuleElement.innerText) {
        mainModuleElement.style.display = 'inline';
    } else {
        mainModuleElement.style.display = 'none';
    }

    if (subModuleElement && subModuleElement.innerText) {
        subModuleElement.style.display = 'inline';
    } else {
        subModuleElement.style.display = 'none';
    }

    if (subSubModuleElement && subSubModuleElement.innerText) {
        subSubModuleElement.style.display = 'inline';
    } else {
        subSubModuleElement.style.display = 'none';
    }

    const separatorSpans = document.querySelectorAll('.page-path span.separator');
    separatorSpans.forEach((span, index) => {
        span.style.display = 'none';
    });

    if (mainModuleElement && mainModuleElement.innerText && subModuleElement && subModuleElement.innerText) {
        separatorSpans[0].style.display = 'inline';
    }

    if (subModuleElement && subModuleElement.innerText && subSubModuleElement && subSubModuleElement.innerText) {
        separatorSpans[1].style.display = 'inline';
    }
}

window.addEventListener('load', loadBreadcrumb);