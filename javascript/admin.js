const BASE_URL = "http://localhost:5000/api";

let currentProject = "";

/*
=========================
Show Project Form
=========================
*/

function showProjectForm() {

    document.getElementById(
        "projectForm"
    ).style.display = "block";

}

function hideProjectForm() {

    document.getElementById(
        "projectForm"
    ).style.display = "none";

}

/*
=========================
Create Project
=========================
*/

async function createProject() {

    const title =
        document.getElementById(
            "projectTitle"
        ).value;

    const description =
        document.getElementById(
            "projectDescription"
        ).value;

    const assignedManager =
        document.getElementById(
            "assignedManager"
        ).value;

    const assignedDeveloper =
        document.getElementById(
            "assignedDeveloper"
        ).value;

    const response = await fetch(

        `${BASE_URL}/projects/create`,

        {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                title,
                description,
                assignedManager,
                assignedDeveloper,
                role: sessionStorage.getItem("role")

            })

        }

    );

    const data = await response.json();

    alert(data.message);

    getProjects();

    loadDashboardStats();

}

/*
=========================
Get Projects
=========================
*/

async function getProjects() {

    const response = await fetch(
        `${BASE_URL}/projects/all`
    );

    const data = await response.json();

    const projectsDiv =
        document.getElementById(
            "projects"
        );

    projectsDiv.innerHTML = "";

    data.projects.forEach(project => {

        projectsDiv.innerHTML += `

            <div
                class="project-item"
                onclick="
                    getProjectTasks(
                        '${project.title}'
                    )
                "
            >

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <p>
                    <strong>Manager:</strong>
                    ${project.assignedManager}
                </p>

                <p>
                    <strong>Developer:</strong>
                    ${project.assignedDeveloper}
                </p>

            </div>

        `;

    });

}

/*
=========================
Dashboard Stats
=========================
*/

async function loadDashboardStats() {

    const projectResponse =
        await fetch(
            `${BASE_URL}/projects/all`
        );

    const projectData =
        await projectResponse.json();

    document.getElementById(
        "projectsCount"
    ).innerText =
        projectData.projects.length;

    const taskResponse =
        await fetch(
            `${BASE_URL}/tasks/all`
        );

    const taskData =
        await taskResponse.json();

    let inProgress = 0;
    let completed = 0;

    taskData.tasks.forEach(task => {

        if (
            task.status ===
            "In Progress"
        ) {

            inProgress++;

        }

        if (
            task.status ===
            "Completed"
        ) {

            completed++;

        }

    });

    document.getElementById(
        "inProgressCount"
    ).innerText = inProgress;

    document.getElementById(
        "completedCount"
    ).innerText = completed;

}

/*
=========================
Get Project Tasks
=========================
*/

async function getProjectTasks(projectName) {

    currentProject = projectName;

    document.getElementById(
        "selectedProject"
    ).innerText = projectName;

    document.getElementById(
        "taskForm"
    ).style.display = "block";

    const response = await fetch(
        `${BASE_URL}/tasks/all`
    );

    const data = await response.json();

    const projectTasks =
        data.tasks.filter(task =>

            task.project === projectName

        );

    document.getElementById(
        "openTasks"
    ).innerHTML = "";

    document.getElementById(
        "progressTasks"
    ).innerHTML = "";

    document.getElementById(
        "reviewTasks"
    ).innerHTML = "";

    document.getElementById(
        "reopenTasks"
    ).innerHTML = "";

    document.getElementById(
        "doneTasks"
    ).innerHTML = "";

    projectTasks.forEach(task => {

        const taskHTML = `

            <div class="task-card">

                <h4>${task.title}</h4>

                <p>
                    <strong>Developer:</strong>
                    ${task.assignedDeveloper}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${task.status}
                </p>

                <p>
                    <strong>Deadline:</strong>
                    ${task.deadline}
                </p>

                <div class="actions">

                    <button
                        class="progress-btn"
                        onclick="
                            updateTask(
                                '${task._id}',
                                'In Progress'
                            )
                        "
                    >
                        Progress
                    </button>

                    <button
                        class="review-btn"
                        onclick="
                            updateTask(
                                '${task._id}',
                                'In Review'
                            )
                        "
                    >
                        Review
                    </button>

                    <button
                        class="done-btn"
                        onclick="
                            updateTask(
                                '${task._id}',
                                'Completed'
                            )
                        "
                    >
                        Done
                    </button>

                    <button
                        class="reopen-btn"
                        onclick="
                            updateTask(
                                '${task._id}',
                                'Reopened'
                            )
                        "
                    >
                        Reopen
                    </button>

                    <button
                        class="delete-btn"
                        onclick="
                            deleteTask(
                                '${task._id}'
                            )
                        "
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;

        if (task.status === "Pending") {

            document.getElementById(
                "openTasks"
            ).innerHTML += taskHTML;

        }

        else if (
            task.status ===
            "In Progress"
        ) {

            document.getElementById(
                "progressTasks"
            ).innerHTML += taskHTML;

        }

        else if (
            task.status ===
            "In Review"
        ) {

            document.getElementById(
                "reviewTasks"
            ).innerHTML += taskHTML;

        }

        else if (
            task.status ===
            "Reopened"
        ) {

            document.getElementById(
                "reopenTasks"
            ).innerHTML += taskHTML;

        }

        else if (
            task.status ===
            "Completed"
        ) {

            document.getElementById(
                "doneTasks"
            ).innerHTML += taskHTML;

        }

    });

}

/*
=========================
Create Task
=========================
*/

async function createTask() {

    const title =
        document.getElementById(
            "taskTitle"
        ).value;

    const description =
        document.getElementById(
            "taskDescription"
        ).value;

    const assignedDeveloper =
        document.getElementById(
            "taskDeveloper"
        ).value;

    const deadline =
        document.getElementById(
            "taskDeadline"
        ).value;

    const response = await fetch(

        `${BASE_URL}/tasks/create`,

        {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                title,
                description,
                project:
                    currentProject,
                assignedDeveloper,
                deadline,
                role: sessionStorage.getItem("role")

            })

        }

    );

    const data = await response.json();

    alert(data.message);

    getProjectTasks(currentProject);

}

/*
=========================
Update Task
=========================
*/

async function updateTask(
    taskId,
    status
) {

    const response = await fetch(

        `${BASE_URL}/tasks/update/${taskId}`,

        {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                status,
                role: sessionStorage.getItem("role")

            })

        }

    );

    const data = await response.json();

    alert(data.message);

    getProjectTasks(currentProject);

    loadDashboardStats();

}

/*
=========================
Delete Task
=========================
*/

async function deleteTask(taskId) {

    const response = await fetch(

        `${BASE_URL}/tasks/delete/${taskId}`,

        {

            method: "DELETE",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                role: sessionStorage.getItem("role")

            })

        }

    );

    const data = await response.json();

    alert(data.message);

    getProjectTasks(currentProject);

    loadDashboardStats();

}

/*
=========================
Initial Load
=========================
*/

getProjects();

loadDashboardStats();