import httpAxiosApiTags from "@/plugins/axiosApiTags";

export default {
    createTasks(state, objTask) {
        if (objTask.title && objTask.description) {
            state.tasks.push(objTask);
           var data = state.tasks;
            httpAxiosApiTags.post(`/tag/edit-my-tags/${objTask.tagId}`, { description: data }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                }
            ).catch(response => {
                state.tasks.splice(objTask, 1);
                return response;
            });
        }
    },
    destroyTask(state, objDestroy) {
        httpAxiosApiTags.post(`/tag/edit-my-tags/${objDestroy.tagId}`, { description: state.tasks }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
            }
        ).then(response => {
            const index = state.tasks.findIndex(obj => obj.id === objDestroy.task.id);
            state.tasks.splice(index, 1);
            return response;
        }).catch(response => {
            return response;
        });
    },
    updateTask() {

    },
    getTasks(state, idFirstTag) {
        setTimeout(() => {
            httpAxiosApiTags.get(`/tag/my-tags`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(response => {
                var list = response.data.data.data;
                var tagsTasks = list.filter(tag => tag.id === idFirstTag);
                state.tasks = tagsTasks[0] ? JSON.parse(tagsTasks[0].description) : [];
            });
        }, 500)
    },
    completedTask(state, objCompleted) {
        httpAxiosApiTags.post(`/tag/edit-my-tags/${objCompleted.tagId}`, {
                description: state.tasks,
                completed: objCompleted.task.completed
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
            }
        ).catch(response => {
            return response;
        });
    }
}