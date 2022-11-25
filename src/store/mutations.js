import httpAxiosApiTags from "@/plugins/axiosApiTags";

export default {
    addTask(state, task) {
        addTaks(state, task);
    },
    removeTask(state, id) {
        state.tasks = state.tasks.filter(task => task.id !== id)
    },
    listTasks(state) {
        getListTaks(state);
    },
}

function addTaks(state, task) {
    if (task.title && task.description) {
        state.tasks.push({
            id: new Date().getTime(),
            order: 0,
            title: task.title,
            description: task.description,
            completed: false
        });
    }
}

function getListTaks(state) {
    setTimeout(() => {
        httpAxiosApiTags.get(`/tag/my-tags`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(response => {
            var list = response.data.data.data;
            var tagsTaks = list.filter(tag => tag.title === 'Tags Shieldforce Tags');
            state.tasks = JSON.parse(tagsTaks[0].description);
        });
    }, 500)
}