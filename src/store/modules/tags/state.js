export default {
    tags : [],
    paginationTags: [],
    credentials: {
        url: process.env.VUE_APP_URL_API_TAGS,
        user: process.env.VUE_APP_USER_API_TAGS,
        pass: process.env.VUE_APP_PASS_API_TAGS,
        token : null,
        expired : null,
    },
}