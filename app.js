$(function () {
    let delet = false; // * Variable To Delete Homeworks
    let edit = false; // * Variable To Edit Homeworks
    $('#homeworkResult').hide(); // * Hiding Search Box Until Something Is Searched
    fetchHomework(); // * Execution Of The Function To Bring The Tasks

    /*=====================================================
    <|-We Send The Form                                 -|>
    =====================================================*/
    $('#choresForm').submit(function(e) {
        /*===========================
        <|-We Get The Form Data   -|>
        ===========================*/
        const postDate = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#homeworkId').val()
        }  
        
        let url = edit === false ? './controllers/homework.php' : './controllers/edit.php';

        /*===========================
        <|-We Send The Data       -|>
        ===========================*/
        $.post(url, postDate, function (response) {
            fetchHomework();
            $('#choresForm').trigger('reset');

            if (edit == true) {
                $('#submitButton').show();
                $('#editButton').hide();
                edit = false;
            }

        });

        e.preventDefault();
    });

    /*=====================================================
    <|-Function To Request The Homework List            -|>
    =====================================================*/
    function fetchHomework () {
        $.ajax({
            url: './controllers/list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response);
                let template = '';

                /*=====================================================
                <|-Creating A Row For Each Homework                 -|>
                =====================================================*/
                tasks.forEach(task => {
                    template += `
                        <tr homeworkId="${task.id}">
                            <td>${task.id}</td>
                            <td>${task.name}</td>
                            <td>${task.description}</td>
                            <td>
                                <center>
                                    <button class="btn btn-info editHomework">Edit</button>
                                </center>
                            </td>
                            <td>
                                <center>
                                    <button class="btn btn-danger deleteHomework">Delete</button>
                                </center>
                            </td>
                        </tr>
                    `
                });

                /*===========================
                <|-Inserting The Data     -|>
                ===========================*/
                $('#chores').html(template);
            }
        });
    }

    /*=====================================================
    <|-Getting The Value Of Delete Homework            -|>
    =====================================================*/
    $(document).on('click', '.deleteHomework', function () {
        /*=====================================================
        <|-Confirming That You Want To Delete The Homework  -|>
        =====================================================*/
        Swal.fire({
            title: '<span class="alertSendForm">Are you sure you want to delete the homework?</span>',
            icon: 'info',
            confirmButtonText: 'Confirm',
            grow: 'column',
            backdrop: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,

            showConfirmButton: true,
            showCancelButton: true,
            showCloseButton: true,
            cancelButtonColor: '#D9534F',
            confirmButtonColor: '#4BBF73',
            confirmButtonAriaLabel: 'Confirm',
            cancelButtonAriaLabel: 'Cancel',

        }).then((result) =>{
            delet = true;
            if (result.isConfirmed) {
                /*=====================================================
                <|-Getting The Attribute Of The tr Tag              -|>
                =====================================================*/
                let element = $(this)[0].parentElement.parentElement.parentElement;
                // * Remember that parentElement helps us to level up since when we click the button the container is the central label and then the td label then when we write three parentElements we go up to the level of the tr label and obtain its value 0 and in this case the value 0 is the td tag containing the id.
                let id = $(element).attr('homeworkId');

                /*=====================================================
                <|-Submitting The Request To Delete The Homework    -|>
                =====================================================*/
                $.post('./controllers/delete.php', {id}, function (response) {
                    fetchHomework();
                    $('#choresForm').trigger('reset');

                    if (delet == true) {
                        $('#submitButton').show();
                        $('#editButton').hide();
                        delet = false;
                    }
                });
            } 
            
        });
        
    });

    /*=====================================================
    <|-We Check If You Want To Edit Any Homework        -|>
    =====================================================*/
    $(document).on('click', '.editHomework', function () {
        let element = $(this)[0].parentElement.parentElement.parentElement;
        let id = $(element).attr('homeworkId');
        
        $.post('./controllers/single.php', {id}, function (response) {
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#homeworkId').val(task.id);
            $('#submitButton').hide();
            $('#editButton').show();
            edit = true;

        });

    });

});