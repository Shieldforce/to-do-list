import httpAxiosApiTags from "@/plugins/axiosApiTags";

export default {
    loginApiTagsTags(state) {
        httpAxiosApiTags.post(`/access/login`, {
            email: this.state.tags.credentials.user,
            password: this.state.tags.credentials.pass,
        }).then(response => {
            state.credentials.token = response.data.data.access_token;
            state.credentials.expired = new Date();
        });
        return state;
    },
    requiredTokenTags(state) {
        var getToken = this.state.tags.credentials.token;
        var expired = this.state.tags.credentials.expired;
        var start = new Date(expired);
        var end = new Date();
        var diff = new Date( end - start );

        if(!getToken || getToken && diff.getUTCMinutes() > 20) {
            this.commit("loginApiTagsTags", {});
        }
        return state;
    },
    createTag(state, objTag) {
        state.tags.push(objTag);
        httpAxiosApiTags.post(`/tag/add-my-tags/`, objTag, {
                headers: {
                    'Authorization': `Bearer ${this.state.tags.credentials.token}`
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
                    'Authorization': `Bearer ${this.state.tags.credentials.token}`
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
                    'Authorization': `Bearer ${this.state.tags.credentials.token}`
                }
            }).then(response => {
                state.tags = response.data.data.data;
                state.paginationTags = response.data.data;
            });
        }, 500)
    }
}