# assignmintz

This is the backend specification for the Assignmintz application.

### Create a User [POST] /api/v1/user/

+ Request (application/json)

        {
            "user_name": "ronnie1",
            "name": "testname",
            "email": "testemail@test.com",
            "passwd": "passhash",
            "role": "student"
        }

+ Response 201 (application/json)

+ Response 400 (application/json)

        {
            "Bad request format or missing parameters."
        }

### Login a User [POST] /api/v1/user/login

+ Request (application/json)

        {
            "user_name": "ronnie1",
            "passwd": "passhash"
        }

+ Response 201 (application/json)

        {
            "session_id": session_id,
            "user_name": user_name
        }

+ Response 404 (application/json)

        {
            "User does not exist."
        }

+ Response 400 (application/json)

        {
            "Bad request format, check JSON"
        }

### Logout a User [POST] /api/v1/user/logout

+ Request (application/json)

        {
            "user_id":user_id,
            "session_id":session_id
        }

+ Response 201 (application/json)

+ Response 404 (application/json)
        {
            "User does not exist or session is expired."
        }

+ Response 400 (application/json)
    {
        "logout": {
            "invalid_user_and_key": "Invalid username or session key"
        }
    }


### Add a course [POST] /api/v1/course/

+ Request (application/json)

    {   
        "session_key": "231c5279b2804736aa32255462449c2a",
        "user_name": "dumbledore",
        "course_id": "601.461",
        "course_title": "Stuff 101",
        "visible": "True",
        "description": "Stuff is cool.",
        "professor": "/backend/v1/user/dumbledore/",
        "students": []
    }

+ Response 201 (application/json)

+ Response 400 (application/json)
        "course": {
                "dup_course_id": "Course id already exists"
        }

        "course": {
            "invalid_user_or_session": "Invalid username or session key"
        }

        {
            "error": "The 'professor' field has no data and doesn't allow a default or null value."
        }

        {
            "error": "The 'students' field has no data and doesn't allow a null value."
        }


### Remove a class [DELETE] /api/v1/class/course_id/

+ Response 204 (application/json)

+ Response 404 (application/json)

        { "Could not find a course with the given course ID" }


## Add Assignment [POST] /api/v1/professor/assignment

+ Request (application/json)

        {
            "assignment_id": "2",
            "session_key": "67743fdae6c44735a12aa9fdc8f22c66",
            "user_name": "prof_name"
            "assignment_name": "Assignment 1",
            "assignment_type": "hw",
            "course":  "/backend/v1/course/601.452/",
            "due_date": "2013-01-29T12:34:56.000000Z",
            "expected_difficulty": "3",
            "actual_difficulty": "4",
            "expected_time": "3.4",
            "actual_time": "5.4",
            "priority": "5",
            "percent_complete": "33.3",
            "visible": "True",
            "description": "Typing"
        }

+ Response 201 (application/json)

+ Response 404 (application/json)

        { "Could not find a professor with the given ID." }

+ Response 400 (application/json)

        {
            "professor/assignment":
            {
                "invalid_user_and_key": "Invalid username or session key"
            }
        }

        {
            "error": "Datetime provided to 'due_date' field doesn't appear to be a valid datetime string: '2013-01-29T12:34:56000000Z'"
        }


## Remove Assignment [DELETE] /api/v1/professor/assignment/assignment_id/

+ Response 204 (application/json)

        { "Assignment deleted." }

+ Response 400 (application/json)

        Errors will be the usual bas requests documented previously.

## Below not yet implemented.

## Update Assignment Due Date / Exam Time [POST] /api/v1/professor/assignment/{assignment_id}/

+ Request (application/json)

        {
            "professor_id": prof_id,
            "updated_date": "newDateTime"
        }

+ Response 200 (application/json)

        { "assignment_id": id }

+ Response 404 (application/json)

        { "Could not find a professor or assignment with the given ID." }

+ Response 400 (application/json)

        { "Missing or incorrect request parameters." }

## Create Office Hours [POST] /api/v1/professor/assignment/{assignment_id}/

+ Request (application/json)

        {
            "professor_id": prof_id,
            "class_id": class_id,
            "ta_name": "name",
            "times": map_of_office_hours
        }

+ Response 201 (application/json)

+ Response 404 (application/json)

        { "Could not find a professor or assignment with the given ID." }

+ Response 400 (application/json)

        { "Missing or incorrect request parameters." }


## Update Office Hour Times [POST] /api/v1/professor/assignment/{assignment_id}/

+ Request (application/json)

        {
            "professor_id": prof_id,
            "class_id": class_id,
            "ta_name": "name",
            "old_time": dateTime,
            "new_time": dateTime
        }

+ Response 200 (application/json)

        { "current_office_hours": map_of_office_hours }

+ Response 404 (application/json)

        { "Could not find a professor or assignment with the given ID." }

+ Response 400 (application/json)

        { "Missing or incorrect request parameters." }


## Add/Edit assignment properties for assignment  [POST] /api/v1/student/assignment/{assignment_id}/

+ Request (application/json)

        {
            "student_id": student_id,
            "priority": priority_value,
            "difficulty": difficultyValue
        }

+ Response 201 (application/json)

+ Response 404 (application/json)

        { "Could not find a student with the given ID." }

+ Response 404 (application/json)

        { "Could not find an assignment for the given student with the requested assignment id." }

+ Response 400 (application/json)

        { "Missing or incorrect request parameters." }


## Add subtask for assignment [POST] /api/v1/student/subtask/{assignment_id}

+ Request (application/json)

        {
            "student_id": student_id
        }

+ Response 200 (application/json)

        { "subtasks": updated_subtasks }

+ Response 404 (application/json)

        { "Could not find a student with the given ID." }

+ Response 404 (application/json)

        { "Could not find an assignment for the given student with the requested assignment id." }

+ Response 400 (application/json)

        { "Missing or incorrect request parameters." }


## Edit subtask for assignment [POST] /api/v1/student/subtask/{assignment_id}/{subtask_id}

+ Request (application/json)

        {
            "student_id": student_id,
            "new_title": "new_title",
            "new_description": "new_description"
        }

+ Response 200 (application/json)

        { "subtasks": updated_subtasks }

+ Response 404 (application/json)

        { "Could not find a student with the given ID." }

+ Response 404 (application/json)

        { "Could not find an assignment for the given student with the requested assignment id." }

+ Response 404 (application/json)

        { "Could not find a subtask for the given student with the requested assignment id." }

+ Response 400 (application/json)

        { "Missing or incorrect request parameters." }
