function apicall(endpoint, data, method) {
    let x = $.ajax(endpoint, {
        type: method
        , data: data
        , success: function (res) {
            return res;
        }
        , error: function (err) {
            return err;
        }
    });
    return x;
}

async function uploaderapicall(endpoint, formdata, method) {
    let x = await $.ajax({
        url: endpoint
        , type: 'POST'
        , data: formdata
        , async: false
        , cache: false
        , contentType: false
        , enctype: 'multipart/form-data'
        , processData: false
        , success: function (res) {
            return res;
        }
    });
    return x;
}

function generaterandomstring(size) {
    var stream_ = "ABcdefghijkl7890_CDELMNOPmnopqrt123654QRSTUVWFGHIJKXYZac";
    var namestring = "";
    for (var i = 0; i < size; i++) {
        var rand = Math.floor(Math.random() * 55);
        namestring += stream_[rand];
    }
    return namestring;
}

// add module
function showAddModule(event) {
    var dialog = document.getElementById('add_module');

    var leftPosition = 280;

    var topPosition = 60;

    dialog.style.left = `${leftPosition}px`;
    dialog.style.top = `${topPosition}px`;

    dialog.style.display = "block";
}

function closeAddModule() {
    document.getElementById('add_module').style.display = "none";
}

// add sub module
function showAddSubModule(event, moduleId) {
    var dialog = document.getElementById('add_sub_module');
    var moduleInput = document.getElementById('module_id');

    // Set the module ID in the hidden input field
    moduleInput.value = moduleId;

    var leftPosition = 280;
    var topPosition = 250;

    dialog.style.left = `${leftPosition}px`;
    dialog.style.top = `${topPosition}px`;

    dialog.style.display = "block";
}


function closeAddSubModule() {
    document.getElementById('add_sub_module').style.display = "none";
}

// add page
function showAddSubPage(event, subModuleId) {
    event.preventDefault();

    let createPageDialog = document.getElementById('create_page');
    if (!createPageDialog) {
        createPageDialog = document.createElement('dialog');
        createPageDialog.id = 'create_page';
        createPageDialog.classList.add('module_div');
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        createPageDialog.innerHTML = `
            <div class="modal-header">
                <div class="card-header">
                    <div class="main-icon">
                        <span class="material-symbols-outlined">
                            view_module
                        </span>
                    </div>
                    <h4>Create Page</h4>
                </div>
                <button type="button" class="close" onclick="closeAddPage()">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </button>
            </div>
            <div class="modal-body">
                <form action="/create-page" method="POST">
                    <input type="hidden" name="_token" value="${csrfToken}">
                    <input type="hidden" name="submodule_id" value="${subModuleId}">
                    <div class="text-field">
                        <label for="">*Page Name</label>
                        <input id="page_name" type="text" name="page_name" style="text-transform: capitalize;" required>
                    </div>
                    <div class="text-field">
                        <div style="display: grid;">
                            <label for="">*Icon</label>
                            <span style="color: red;font-size: 12px;margin-top: -5px;">*Note: Use the
                                <a href="https://fonts.google.com/icons" target="_blank">google icon</a>
                                name
                            </span>
                        </div>
                        <input id="page_icon" type="text" name="page_icon" required>
                    </div>
                    <div class="text-field">
                        <div style="display: grid;">
                            <label for="">*Path</label>
                        </div>
                        <input id="ppage_ath" type="text" name="page_path" required>
                    </div>
                    <div>
                        <label for="">Description</label><br>
                        <textarea name="description" id="description" style="width: 100%;"></textarea>
                    </div>
                    <button type="submit" class="create-user-btn" style="background-color: #595959;">Create Page</button>
                </form>
            </div>`;
        document.body.appendChild(createPageDialog);
    }

    createPageDialog.style.display = "block";

    var offset = event.target.getBoundingClientRect();
    createPageDialog.style.left = `${offset.right}px`;
    createPageDialog.style.top = `${offset.top}px`;

    createPageDialog.showModal();
}



function closeAddPage() {
    location.reload();
    const createPageDialog = document.getElementById('create_page');
    if (createPageDialog) {
        createPageDialog.close();
        createPageDialog.style.display = "none";
    }

    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.style.pointerEvents = 'auto';
        modalContainer.style.opacity = '1';
    }
}