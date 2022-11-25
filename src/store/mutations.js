import axios from "axios";

export default {
    listTasks(state) {
        getListTaks(state);
    },
    addTask(state, task) {
        addTaks(state, task);
    },
    removeTask(state, id) {
        state.tasks = state.tasks.filter(task => task.id !== id)
    },
    requireTokenApiTags(state) {
        requiredTokenApiTags(state);
    },
}

function loginApiTags(state) {
    const urlApi = state.credentials.api_tags.url;
    axios.post(`${urlApi}/access/login`, {
        email: state.credentials.api_tags.user,
        password: state.credentials.api_tags.pass,
    }).then(response => {
        localStorage.setItem("api_tags_access_token", response.data.data.access_token);
    });
}

function getListTaks(state)
{
    setTimeout(() => {
        var getTokenApiTags = localStorage.getItem("api_tags_access_token");
        if(getTokenApiTags) {
            const urlApi = state.credentials.api_tags.url;
            axios.get(`${urlApi}/tag/my-tags`, {
                headers: {
                    'Authorization' : `Bearer ${getTokenApiTags}`
                }
            }).then(response => {
                var list = response.data.data.data;
                var tagsTaks = list.filter(tag => tag.title === 'Tags Shieldforce Tags');
                state.tasks = JSON.parse(tagsTaks[0].description);
            });
        }
    }, 500)
}

function addTaks(state, task)
{
    if(task.title && task.description) {
        state.tasks.push({
            id: new Date().getTime(),
            order: 0,
            title: task.title,
            description: task.description,
            completed: false
        });
    }
}

function requiredTokenApiTags(state)
{
    var getTokenApiTags = localStorage.getItem("api_tags_access_token");

    if(getTokenApiTags) {
        const urlApi = state.credentials.api_tags.url;
        axios.get(`${urlApi}/access/me`, {
            headers: {
                'Authorization' : `Bearer ${getTokenApiTags}`
            }
        }).then(response => {
            var expired = parseInt(response.data.data.microtime);
            localStorage.setItem("api_tags_expired", expired);
            if(expired >= 60) {
                loginApiTags(state);
            }
        });
    }

    if(!getTokenApiTags) {
        loginApiTags(state);
    }
}