
document.addEventListener("DOMContentLoaded", function () {
    updateUser();
    updateTable();
});

async function updateTable() {
    let updateTableUrl = '/data/users/';
    let updateTableResponse = await fetch(updateTableUrl);
    let updateTableUsers = await updateTableResponse.json();
    let allUsersTableBody = document.getElementById('all_users_table_body');

    while (allUsersTableBody.hasChildNodes()) {
        allUsersTableBody.removeChild(allUsersTableBody.lastChild);
    }

    for (let i = 0; i < updateTableUsers.length; i++) {
        allUsersTableBody.appendChild(userRow(updateTableUsers[i]));
    }
}

function userRowSimple(user) {

    let row = document.createElement('tr');
    let colId = document.createElement('td');
    colId.innerHTML = user.id;
    let colFirstName = document.createElement('td');
    colFirstName.innerHTML = user.firstname;
    let colLastName = document.createElement('td');
    colLastName.innerHTML = user.lastname;
    let colAge = document.createElement('td');
    colAge.innerHTML = user.age;
    let colEmail = document.createElement('td');
    colEmail.innerHTML = user.email;
    let colRoles = document.createElement('td');
    let allUsersTableUserRoles = "";
    for (let j = 0; j < user.roles.length; j++) {
        allUsersTableUserRoles += user.roles[j] + " ";
    }
    colRoles.innerHTML = allUsersTableUserRoles;

    row.appendChild(colId);
    row.appendChild(colFirstName);
    row.appendChild(colLastName);
    row.appendChild(colAge);
    row.appendChild(colEmail);
    row.appendChild(colRoles);

    return row;
}



async function updateUser() {
    let updateUserUrl = '/userdata';
    let updateUserResponse = await fetch(updateUserUrl);
    let updatableUser = await updateUserResponse.json();
    let headerUsername = document.getElementById('header_username');
    let headerRoles = document.getElementById('header_roles');

    headerUsername.innerHTML = updatableUser.username;
    let rolesStr = "";
    for (let i = 0; i < updatableUser.roles.length; i++) {
        rolesStr += updatableUser.roles[i];
        if (i >= updatableUser.roles.length - 1) break;
        rolesStr += ", ";
    }
    headerRoles.innerHTML = rolesStr;

    let userTableBody = document.getElementById('user_table_body');

    userTableBody.appendChild(userRowSimple(updatableUser));
}

function contains(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}

async function editModal(id) {
    let openEditModalUrl = '/data/users/' + id;
    let openEditModalResponse = await fetch(openEditModalUrl);
    let editableUser = await openEditModalResponse.json();
    let editForm = document.getElementById('edit_form');
    editForm.reset();
    let openEditModalIdField = document.getElementById('id_ed');
    let openEditModalFirstNameField = document.getElementById('firstname_ed');
    let openEditModalLastNameField = document.getElementById('lastName_ed');
    let openEditModalAgeField = document.getElementById('age_ed');
    let openEditModalEmailField = document.getElementById('email_ed');
    let openEditModalPassField = document.getElementById('pass_ed');
    let openEditModalUserOption = document.getElementById('user_option_ed');
    contains(editableUser.roles, 'USER') ? openEditModalUserOption.setAttribute('selected', '') : openEditModalUserOption.removeAttribute('selected');
    let openEditModalAdminOption = document.getElementById('admin_option_ed');
    contains(editableUser.roles, 'ADMIN') ? openEditModalAdminOption.setAttribute('selected', '') : openEditModalAdminOption.removeAttribute('selected');
    openEditModalIdField.setAttribute('value', editableUser.id);
    openEditModalFirstNameField.setAttribute('value', editableUser.firstname);
    openEditModalLastNameField.setAttribute('value', editableUser.lastname);
    openEditModalAgeField.setAttribute('value', editableUser.age);
    openEditModalEmailField.setAttribute('value', editableUser.email);
    openEditModalPassField.setAttribute('value', editableUser.password);
}

async function deleteModal(id) {
    let openDeleteModalUrl = '/data/users/' + id;
    let openDeleteModalResponse = await fetch(openDeleteModalUrl);
    let deletableUser = await openDeleteModalResponse.json();
    let deleteForm = document.getElementById('delete_form');
    deleteForm.reset();
    let openDeleteModalIdField = document.getElementById('id_del');
    let openDeleteModalFirstNameField = document.getElementById('firstname_del');
    let openDeleteModalLastNameField = document.getElementById('lastName_del');
    let openDeleteModalAgeField = document.getElementById('age_del');
    let openDeleteModalEmailField = document.getElementById('email_del');
    let openDeleteModalPassField = document.getElementById('pass_del');
    openDeleteModalIdField.setAttribute('value', deletableUser.id);
    openDeleteModalFirstNameField.setAttribute('value', deletableUser.firstname);
    openDeleteModalLastNameField.setAttribute('value', deletableUser.lastname);
    openDeleteModalAgeField.setAttribute('value', deletableUser.age);
    openDeleteModalEmailField.setAttribute('value', deletableUser.email);
    openDeleteModalPassField.setAttribute('value', deletableUser.password);
}

async function submitEditForm() {
    let editFormId = document.querySelector('#id_ed');
    let editFormFirstName = document.querySelector('#firstname_ed');
    let editFormLastName = document.querySelector('#lastName_ed');
    let editFormAge = document.querySelector('#age_ed');
    let editFormEmail = document.querySelector('#email_ed');
    let editFormPassword = document.querySelector('#pass_ed');
    let editFormRoles = document.querySelector('#role_ed');
    let editFormRolesArray = [];

    if (editFormRoles.multiple) {
        for (let i = 0; i < editFormRoles.options.length; i++) {
            if (editFormRoles.options[i].selected) editFormRolesArray.push(editFormRoles.options[i].value);
        }
    } else editFormRolesArray.push(editFormRoles.value);

    let editFormResponse = await fetch('/data/edit', {
        method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(
            {
                id: editFormId.value,
                firstname: editFormFirstName.value,
                lastname: editFormLastName.value,
                age: editFormAge.value,
                email: editFormEmail.value,
                password: editFormPassword.value,
                roles: editFormRolesArray
            }
        )
    });
    let editedUser = await editFormResponse.json();
    let editedFirstName = document.getElementById('all_users_firstname_' + editedUser.id);
    let editedLastName = document.getElementById('all_users_lastname_' + editedUser.id);
    let editedAge = document.getElementById('all_users_age_' + editedUser.id);
    let editedEmail = document.getElementById('all_users_email_' + editedUser.id);
    let editedRoles = document.getElementById('all_users_roles_' + editedUser.id);
    editedFirstName.innerHTML = editedUser.firstname;
    editedLastName.innerHTML = editedUser.lastname;
    editedAge.innerHTML = editedUser.age;
    editedEmail.innerHTML = editedUser.email;
    editedRoles.innerHTML = editedUser.roles;

    let editModalCloseButton = document.getElementById('edit_modal_close_button');
    let event = new Event("click");
    editModalCloseButton.dispatchEvent(event);
    return false;
}

async function submitDeleteForm() {
    let deleteFormId = document.querySelector('#id_del');
    let deleteFormResponse = await fetch('/data/delete', {
        method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(
            {
                id: deleteFormId.value,
                firstname: null,
                lastname: null,
                age: null,
                email: null,
                password: null,
                roles: null
            }
        )
    });
    let deletedUser = await deleteFormResponse.json();
    let deletedRow = document.getElementById('all_users_row_' + deletedUser.id);
    deletedRow.remove();
    let deleteModalCloseButton = document.getElementById('delete_modal_close_button');
    let event = new Event("click");
    deleteModalCloseButton.dispatchEvent(event);
    return false;
}

function userRow(user) {
    let row = document.createElement('tr');
    row.setAttribute('id', 'all_users_row_' + user.id);
    let colId = document.createElement('td');
    colId.setAttribute('id', 'all_users_id_' + user.id);
    colId.innerHTML = user.id;
    let colFirstName = document.createElement('td');
    colFirstName.setAttribute('id', 'all_users_firstname_' + user.id);
    colFirstName.innerHTML = user.firstname;
    let colLastName = document.createElement('td');
    colLastName.setAttribute('id', 'all_users_lastname_' + user.id);
    colLastName.innerHTML = user.lastname;
    let colAge = document.createElement('td');
    colAge.setAttribute('id', 'all_users_age_' + user.id);
    colAge.innerHTML = user.age;
    let colEmail = document.createElement('td');
    colEmail.setAttribute('id', 'all_users_email_' + user.id);
    colEmail.innerHTML = user.email;
    let colRoles = document.createElement('td');
    let allUsersTableUserRoles = "";
    for (let j = 0; j < user.roles.length; j++) {
        allUsersTableUserRoles += user.roles[j] + " ";
    }
    colRoles.setAttribute('id', 'all_users_roles_' + user.id);
    colRoles.innerHTML = allUsersTableUserRoles;
    let colEdit = document.createElement('td');
    let editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    editBtn.setAttribute('onclick', 'editModal(' + user.id + ')');
    editBtn.setAttribute('class', 'btn btn-info');
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editModal');
    colEdit.appendChild(editBtn);

    let colDelete = document.createElement('td');
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.setAttribute('onclick', 'deleteModal(' + user.id + ')');
    deleteBtn.setAttribute('class', 'btn btn-danger');
    deleteBtn.setAttribute('data-bs-toggle', 'modal');
    deleteBtn.setAttribute('data-bs-target', '#deleteModal');
    colDelete.appendChild(deleteBtn);

    row.appendChild(colId);
    row.appendChild(colFirstName);
    row.appendChild(colLastName);
    row.appendChild(colAge);
    row.appendChild(colEmail);
    row.appendChild(colRoles);
    row.appendChild(colEdit);
    row.appendChild(colDelete);
    return row;
}

async function newUserPost(newUserForm) {

    let firstName = newUserForm.querySelector('[name="new_user_name"]');
    let lastName = newUserForm.querySelector('[name="new_user_lastname"]');
    let age = newUserForm.querySelector('[name="new_user_age"]');
    let email = newUserForm.querySelector('[name="new_user_email"]');
    let password = newUserForm.querySelector('[name="new_user_pass"]')
    let roles = newUserForm.querySelector('[name="new_user_roles"]');

    let role = [];

    if (roles.multiple) {
        for (let i = 0; i < roles.options.length; i++) {
            if (roles.options[i].selected) role.push(roles.options[i].value);
        }
    } else role.push(roles.value);

    let response = await fetch('/data/add', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(
            {
                firstname: firstName.value,
                lastname: lastName.value,
                age: age.value,
                email: email.value,
                password: password.value,
                roles: role
            }
        )
    });

    let newUser = await response.json();
    let tbody = document.getElementById('all_users_table_body');
    tbody.appendChild(userRow(newUser));
    newUserForm.reset();
    let usersTab = document.getElementById('users_table-tab');
    let event = new Event("click");
    usersTab.dispatchEvent(event);
    return false;
}