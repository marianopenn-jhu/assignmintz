# assignmintz

This is the backend specification for the Assignmintz application.

### Create a User [POST] /api/v1/user/

+ Request (application/json)

        {
            "user_name": "ronnie1",
            "name": "testname",
            "email": "testemail@test.com",
            "passwd_hash": "passhash",
            "role": "student"
        }

+ Response 201 (application/json)

+ Response 400 (application/json)

        { 
            "Bad request format or missing parameters."
        }

+ Response 409 (application/json)
    
        { 
            "User already exists." 
        }

### Login a User [POST] /api/v1/user/login

+ Request (application/json)

        {
            "user_name": "ronnie1",
            "passwd_hash": "passhash"
        }

+ Response 200 (application/json)
    
        { 
            "session_id": session_id 
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

+ Response 200 (application/json)
    
        { 
            "session_id": session_id
        }

+ Response 404 (application/json)
        { 
            "User does not exist or session is expired." 
        }

+ Response 400 (application/json)
        { 
            "Bad request format, check JSON." 
        }

### Get user email [GET] /api/v1/user/email

+ Request (application/json)

        { "user_name": "ronnie" }

+ Response 200 (application/json)

        { "email": "testemail@test.com" }

+ Response 400 (application/json)

+ Response 404 (application/json)

        { "Could not find email for given user name" }


### Add a class [POST] /api/v1/class/

+ Request (application/json)

        {
            "user_name":"ronnie",
            "class_id": "xxx-xxx-xxx"
        }

+ Response 200 (application/json)

        { "Class class_id added for user user_name" }

+ Response 400 (application/json)

        { "Invalid request Parameters, make sure the class ID is correct" }

+ Response 404 (application/json)

        { "Could not find a user with the given user name" }


### Remove a class [DELETE] /api/v1/class/

+ Request (application/json)

        {
            "user_name":"ronnie",
            "class_id": "xxx-xxx-xxx"
        }

+ Response 200 (application/json)

        { "Class class_id removed for user user_name" }

+ Response 400 (application/json)

        { "Invalid request Parameters, make sure the class ID is correct" }

+ Response 404 (application/json)

        { "Could not find a user with the given user name" }


## Add Assignment [POST] /api/v1/professor/assignment

+ Request (application/json)

        {
            "professor_id": prof_id,
            "assignment_name": "hw1",
            "type": "assignmentType",
            "description":"desc",
            "expectedDifficulty": difficultyScore,
            "expectedTime": expTime,
            "dueDate": "dateTime"
        }

+ Response 200 (application/json)

        { "assignment_id": id }

+ Response 404 (application/json)

        { "Could not find a professor with the given ID." }

+ Response 400 (application/json)

        { "Missing or incorrect request parameters." }

## Remove Assignment [DELETE] /api/v1/professor/assignment/

+ Request (application/json)

        {
            "professor_id": prof_id,
            "assignment_id":assignment_id
        }

+ Response 200 (application/json)

        { "Assignment deleted." }

+ Response 404 (application/json)

        { "Could not find a professor with the given ID." }

+ Response 404 (application/json)

        { "Could not find an assignment with the given ID." }

+ Response 400 (application/json)

        { "Missing or incorrect request parameters." }


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
