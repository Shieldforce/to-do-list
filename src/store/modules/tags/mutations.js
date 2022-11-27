import httpAxiosApiTags from "@/plugins/axiosApiTags";

export default {
    createTag(state, objTag) {
        state.tags.push(objTag);
        httpAxiosApiTags.post(`/tag/add-my-tags/`, objTag, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
            }
        ).catch(response => {
            state.tags.splice(objTag, 1);
            return response;
        });
    },
    destroyTag(state, tag) {
        httpAxiosApiTags.delete(`/tag/delete-my-tags/${tag.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
            }
        ).then(response => {
            const index = state.tags.findIndex(obj => obj.id === tag.id);
            state.tags.splice(index, 1);
            return response;
        }).catch(response => {
            return response;
        });
        return tag;
    },
    updateTag() {

    },
    getTags(state, { paginate:paginate, pageCurrent:pageCurrent= 1 }) {
        setTimeout(() => {
            httpAxiosApiTags.get(`/tag/my-tags/${paginate}?page=${pageCurrent}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(response => {
                state.tags = response.data.data.data;
                state.paginationTags = response.data.data;
            });
        }, 500)
    }
}