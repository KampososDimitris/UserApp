$(document).ready(function() {
    const pathname = window.location.pathname;

    if (pathname.endsWith('register.html')) {
        initRegisterPage();
    } else if (pathname.endsWith('users.html')) {
        initUsersPage();
    }
});

// Register Page
function initRegisterPage() {
    $('#birthdate').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:2025",
        maxDate: 0
    });

    // Submit register user form
    $('#userForm').submit(function(event) {
        event.preventDefault(); //?

        const userData = {
            name: $('#name').val(),
            surname: $('#surname').val(),
            gender: $('#gender').val(),
            birthdate: $('#birthdate').val(),
            homeAddress: {
                fullAddress: $('#homeAddress').val()
            },
            workAddress: {
                fullAddress: $('#workAddress').val()
            }
        };

        $.ajax({
            url: '/api/users',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData), //?
            success: function() {
                alert('User created successfully!');
                window.location.href = '/users.html';
            },
            error: function(xhr) {
                alert('Error creating user: ' + xhr.responseText);
            }
        });
    });
}

// Users Page
function initUsersPage() {
    loadUsers();

    // Submit edit user form
    $('#editUserForm').submit(function(event) {
        event.preventDefault();

        const userId = $('#editUserId').val();

        const updatedUser = {
            name: $('#editName').val(),
            surname: $('#editSurname').val(),
            gender: $('#editGender').val(),
            birthdate: $('#editBirthdate').val(),
            homeAddress: {
                id: $('#editHomeAddressId').val(),
                fullAddress: $('#editHomeAddress').val()
            },
            workAddress: {
                id: $('#editWorkAddressId').val(),
                fullAddress: $('#editWorkAddress').val()
            }
        };

        $.ajax({
            url: `/api/users/${userId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedUser),
            success: function () {
                alert('User updated successfully!');
                $.modal.close();
                loadUsers();
            },
            error: function (xhr) {
                alert('Error updating user: ' + xhr.responseText);
            }
        });
    });
}

// Load users on page
function loadUsers() {
    $.ajax({
        url: '/api/users',
        type: 'GET',
        success: function(users) {
            const tbody = $('#usersTable tbody');
            tbody.empty();

            users.forEach(function(user) {
                const tr = $('<tr></tr>');
                tr.append('<td>' + user.name + '</td>');
                tr.append('<td>' + user.surname + '</td>');
                tr.append(`
                    <td>
                        <button class="view-btn" data-id="${user.id}">View</button>
                        <button class="edit-btn" data-id="${user.id}">Edit</button>
                        <button class="delete-btn" data-id="${user.id}">Delete</button>
                    </td>
                `);
                tbody.append(tr);
            });
        },
        error: function(xhr) {
            alert('Error loading users: ' + xhr.responseText);
        }
    });
}

// View user details
$(document).on('click', '.view-btn', function() {
    const userId = $(this).data('id');

    $('#userDetailsContent').hide();
    $('#userDetailsLoading').show();
    $('#userDetails').modal();

    $.ajax({
        url: '/api/users/' + userId,
        type: 'GET',
        success: function(user) {
            $('#detailName').text(user.name);
            $('#detailSurname').text(user.surname);
            $('#detailGender').text(user.gender);
            $('#detailBirthdate').text(user.birthdate);
            $('#detailHomeAddress').text(user.homeAddress?user.homeAddress.fullAddress : 'N/A');
            $('#detailWorkAddress').text(user.workAddress?user.workAddress.fullAddress : 'N/A');

            $('#userDetailsLoading').hide();
            $('#userDetailsContent').show();
        },
        error: function(xhr) {
            alert('Error loading user details: ' + xhr.responseText);
        }
    });
});


// Edit user modal details
$(document).on('click', '.edit-btn', function() {
    const userId = $(this).data('id');

    $('#editUserDetailsContent').hide();
    $('#editUserDetailsLoading').show();
    $('#editUser').modal();

    $.ajax({
        url: '/api/users/' + userId,
        type: 'GET',
        success: function(user) {
            $('#editUserId').val(user.id);
            $('#editName').val(user.name);
            $('#editSurname').val(user.surname);
            $('#editGender').val(user.gender);
            $('#editBirthdate').val(user.birthdate);
            $('#editHomeAddressId').val(user.homeAddress?.id || '');
            $('#editHomeAddress').val(user.homeAddress?.fullAddress || '');
            $('#editWorkAddressId').val(user.workAddress?.id || '');
            $('#editWorkAddress').val(user.workAddress?.fullAddress || '');

            $('#editUserDetailsLoading').hide();
            $('#editUserDetailsContent').show();
        },
        error: function(xhr) {
            alert('Error loading user details: ' + xhr.responseText);
        }
    })
});



// Delete user
$(document).on('click', '.delete-btn', function() {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    const userId = $(this).data('id');

    $.ajax({
        url: '/api/users/' + userId,
        type: 'DELETE',
        success: function() {
            alert('User deleted successfully!');
            loadUsers();
            $('#userDetails').hide();
        },
        error: function(xhr) {
            alert('Error deleting user: ' + xhr.responseText);
        }
    });
});
